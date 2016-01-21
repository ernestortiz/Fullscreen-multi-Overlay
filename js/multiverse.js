(function() {
	
	var triggerBttn, closeBttn, idx; 
	
	function toggleOverlay() {
		var layerID, overlay;	
		if (this.hasAttribute('data-overlay'))
			layerID = this.getAttribute('data-overlay');
		else
			layerID= this.parentNode.getAttribute('id');
		overlay= document.getElementById(layerID);
		if( classie.has( overlay, 'open' ) ) { 
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) 
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			else
				onEndTransitionFn();
		}
		else if( !classie.has( overlay, 'close' ) ) { 
			classie.add( overlay, 'open' );
		}
	}
	
	triggerBttn = document.querySelectorAll( '.trigger-overlay' );
	for (var idx = 0; idx < triggerBttn.length; idx++)
		triggerBttn[idx].addEventListener( 'click', toggleOverlay );
		
	closeBttn = document.querySelectorAll( '.overlay-close' );
	transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };
	for (var idx = 0; idx < closeBttn.length; idx++)
		closeBttn[idx].addEventListener( 'click', toggleOverlay );

})();

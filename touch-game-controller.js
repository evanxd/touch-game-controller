'use strict'

var TouchGameController = function(element) {		
  if(element === undefined) {
  	console.error('initial error!');
  	return;
  }

  const FREQUENCY = 300;
  const DISABLE_AREA = 1600;
  
  var setTimeoutId = 0;
  var previousTouch = {
  	touchX: 0, touchY: 0
  }
  var touchMoveUpEvent;
  var touchMoveDownEvent;
  var touchMoveLeftEvent;
  var touchMoveRightEvent;

  var touchStartHandler = function(evt) {
  	previousTouch.touchX = evt.touches[0].pageX;
  	previousTouch.touchY = evt.touches[0].pageY;
  };

  var touchMoveHandler = function(evt) {
  	this.touchX = evt.changedTouches[0].pageX;
  	this.touchY = evt.changedTouches[0].pageY;
    var that = this;

  	if(setTimeoutId === 0) {
  	  setTimeoutId = setTimeout(function() { 
  	  	setTimeoutId = 0;
  	  	var position = {
  	  	  x:0, y:0
  	  	};
  	  	position.x = that.touchX - previousTouch.touchX;
  	  	position.y = that.touchY - previousTouch.touchY;
  	  	
  	  	if(Math.pow(position.x, 2) + Math.pow(position.y, 2) < DISABLE_AREA) {
  	  	  return;
  	  	}	  	
  	  		  	
  	  	if(Math.abs(position.x) > Math.abs(position.y)) {
  	  	  if(position.x > 0) {
  	  	  	element.dispatchEvent(touchMoveRightEvent);
  	  	  } else {
  	  	  	element.dispatchEvent(touchMoveLeftEvent);
  	  	  }
  	  	} else {
  	  	  if(position.y > 0) {
  	  	  	element.dispatchEvent(touchMoveDownEvent);
  	  	  } else {
  	  	  	element.dispatchEvent(touchMoveUpEvent);
  	  	  }
  	  	}

  	  	previousTouch.touchX = that.touchX;
  	    previousTouch.touchY = that.touchY;
  	  }, FREQUENCY);
  	}
  }; 
 
  element.addEventListener("touchstart", touchStartHandler, false);
  element.addEventListener("touchmove", touchMoveHandler, false);
  
  touchMoveUpEvent = document.createEvent('Event');
  touchMoveUpEvent.initEvent('touchmoveup', true, true);
  touchMoveDownEvent = document.createEvent('Event');
  touchMoveDownEvent.initEvent('touchmovedown', true, true);
  touchMoveLeftEvent = document.createEvent('Event');
  touchMoveLeftEvent.initEvent('touchmoveleft', true, true);
  touchMoveRightEvent = document.createEvent('Event');
  touchMoveRightEvent.initEvent('touchmoveright', true, true);
}

var SwipeDetection = function(touchsurface, callback, minSwipeDistance, maxDeviation, allowedTimeInMS) {
    var direction, elapsedTime, startTime;
    var threshold = minSwipeDistance || 300;
    var deviation = maxDeviation || 150;
    var allowedTime = allowedTimeInMS || 300;
    var handleSwipe = callback || function(swipedir){};
    var startLocation = [];
    var distance = [];

    touchsurface.addEventListener('touchstart', function(e){
        var surface = e.changedTouches[0];
        startLocation[0] = surface.pageX;
        startLocation[1] = surface.pageY;
        startTime = new Date().getTime();
    }, {passive: true});

    touchsurface.addEventListener('touchmove', function(e){e.preventDefault();}, {passive: false});

    touchsurface.addEventListener('touchend', function(e){
        var surface = e.changedTouches[0];
        distance[0] = surface.pageX - startLocation[0];
        distance[1] = surface.pageY - startLocation[1];
        elapsedTime = new Date().getTime() - startTime;
        direction = 0;
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distance[0]) >= threshold && Math.abs(distance[1]) <= deviation) {
                direction = (distance[0] < 0) ? SwipeDetection.DIRECTION_LEFT : SwipeDetection.DIRECTION_RIGHT;
            }
            else if (Math.abs(distance[1]) >= threshold && Math.abs(distance[0]) <= deviation) {
                direction = (distance[1] < 0) ? SwipeDetection.DIRECTION_UP : SwipeDetection.DIRECTION_DOWN;
            }
        }
        if (direction) handleSwipe(direction);
        e.preventDefault();
    }, {passive: false});
}
SwipeDetection.DIRECTION_UP = 1;
SwipeDetection.DIRECTION_RIGHT = 2;
SwipeDetection.DIRECTION_DOWN = 3;
SwipeDetection.DIRECTION_LEFT = 4;

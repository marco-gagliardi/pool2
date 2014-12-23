/**
 * Created by Marco Gagliardi  on 22/12/14.
 * Email: marcogagliardi84@gmail.com
 * Web: https://github.com/marco-gagliardi/pool2
 *
 */

function pool2(list) {

    var self = this;
    //get the body
    var body = document.getElementsByTagName('body')[0];
    //return animation duration
    self.comeUpDuration= "0.3s";
    //pulled pixels threshold to trigger transition
    self.thrashold = 40;
    //intertial ratio value on pulling
    self.inertiaRatio = 3;
    //keep the state whether the touch event occurred on the object
    self.isTouched = false;
    //keep the state whether a PULL actually went out the threshold
    self.thresholdPassed = false;




    /***************************
     * init callback functions  *
     ***************************/

    self.onRelease = function() {
        console.warn("Touch end event not handled!");
    };
    self.onMove = function() {
        console.warn("Move  event not handled!");
    };


    /******************
     *  event handlers *
     *******************/

        //The Pullable Element
    self.setPullable = function (touchable) {
        if (!touchable) {
            console.error("Specify an element or an ID");
            return;
        }
        if (!self.list) {
            console.error("Cannot set pullable element: set list first by invoking 'setList()' function.");
            return;
        }
        //if a previous element was set remove event listeners
        if (self.touchstartHandler || self.mousedownHandler) {
            self.touchable.removeEventListener('touchstart', self.touchstartHandler, false);
            self.touchable.removeEventListener('mousedown', self.mousedownHandler, false);
        }

        //set new element
        if (typeof touchable === 'string') {
            touchable = document.getElementById(touchable);
        }
        self.touchable = touchable;

        //The original Top offset (relative to screen) position of the list
        self.prevY = parseInt(self.touchable.offsetTop);

        self.touchstartHandler = function(e){
            self.isTouched = true;
            //initialize the touched point
            self.prevY = e.changedTouches[0].clientY;
            // use css3 transitions when available for smooth sliding
            self.list.style.transition = "";
        };
        self.mousedownHandler = function(e){
            self.isTouched = true;
            self.prevY = e.clientY;
            self.list.style.transition = "";
        };

        //Touch Start handler
        self.touchable.addEventListener("touchstart", self.touchstartHandler ,false);
        //Click start handler  (for desktop browsers)
        self.touchable.addEventListener("mousedown", self.mousedownHandler,false);
    };

    //The list container
    self.setList = function (list) {
        if (!list) {
            console.error("Specify an element or an ID");
            return;
        }
        if (typeof list === 'string') {
            list = document.getElementById(list);
        }
        self.list = list;
        self.list.style.position = 'relative';
        self.list.style.top = '0';

        //The original Top CSS position of the list
        self.cssY = self.list.style.top;
        self.cssY = parseInt(self.cssY.substring(0,self.cssY.length - 2)); //remove unit

        //Touch End handler
        self.touchendHandler = function(e){
            //on touchup we cancel the touch event
            self.isTouched = false;
            //now if the list has moved downwards, it should come up but in a transition
            self.list.style.transition = "top "+ self.comeUpDuration;
            if (typeof self.onRelease === 'function')
                self.onRelease();

            self.list.style.top = self.cssY + 'px';
            self.thresholdPassed = false;
        };
        body.addEventListener("touchend",self.touchendHandler,false);

        //mouse up handler  (for desktop browsers)
        self.mouseupHandler = function(e){
            self.isTouched = false;
            self.list.style.transition = "top "+ self.comeUpDuration;
            if (typeof self.onRelease === 'function') self.onRelease();
            self.list.style.top = self.cssY + 'px';
            self.thresholdPassed = false;
        };
        body.addEventListener("mouseup",self.mouseupHandler,false);

        //handle touch-move event
        self.touchmoveHandler = function(e){
            if(self.isTouched){
                if(e.changedTouches[0].clientY > self.prevY){
                    //on touchmove, we add the exact amount fingers moved to the top of the list
                    var change = (e.changedTouches[0].clientY - self.prevY)/self.inertiaRatio;
                    self.list.style.top = self.cssY + change + 'px'; //and add it to the style
                    self.thresholdPassed = change > self.thrashold;
                    if (typeof self.onMove === 'function')
                        self.onMove();

                }
            }
        };
        self.list.addEventListener("touchmove",self.touchmoveHandler,false);

        //handle mousemove event (for desktop browsers)
        self.mousemoveHandler = function(e){
            if(self.isTouched){
                if(e.clientY > self.prevY){
                    var change = (e.clientY - self.prevY)/self.inertiaRatio;
                    self.list.style.top = self.cssY + change + 'px';
                    self.thresholdPassed = change > self.thrashold;
                    if (typeof self.onMove === 'function')
                        self.onMove();
                }
            }
        };

        self.list.addEventListener("mousemove",self.mousemoveHandler,false);

    };

    if (list) {
        self.setList(list);
        self.setPullable(list);
    } else {
        console.warn("Warning: no element specified. You can set it by invoking 'setList()' function.")
    }

}







/**
 * Created by marcogagliardi marcogagliardi84@gmail.com on 22/12/14.
 */
function pool2() {

    var self = this;
    //get the body
    var body = document.getElementsByTagName('body')[0];
    //return animation duration
    self.comeUpDuration= "0.3s";
    //pulled pixels threshold to trigger transition
    self.thrashold = 40;
    //intertial ratio value on pulling
    self.inertiaRatio = 3;
    //keep the state whether the fingers are touched
    self.isTouched = false;
    //keep the state whether a PULL actually went out
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
    self.setPullable = function (touchableID) {
        if (!touchableID) {
            console.error("Missing ID parameter!");
            return;
        }
        if (!self.list) {
            console.error("Set list first!");
            return;
        }
        self.touchable = document.getElementById(touchableID);

        //The original Top offset (relative to screen) position of the list
        self.prevY = parseInt(self.touchable.offsetTop);

        //Touch Start handler
        self.touchable.addEventListener("touchstart",function(e){
            self.isTouched = true;
            //initialize the touched point
            self.prevY = e.changedTouches[0].clientY;
            // use css3 transitions when available for smooth sliding
            self.list.style.transition = "";
        },false);
        //Click start handler  (for desktop browsers)
        self.touchable.addEventListener("mousedown",function(e){
            self.isTouched = true;
            self.prevY = e.clientY;
            self.list.style.transition = "";
        },false);
    };

    //The list container
    self.setList = function (listID) {
        if (!listID) {
            console.error("Missing ID parameter");
            return;
        }
        self.list = document.getElementById(listID);
        self.list.style.position = 'relative';
        self.list.style.top = '0';

        //The original Top CSS position of the list
        self.cssY = self.list.style.top;
        self.cssY = parseInt(self.cssY.substring(0,self.cssY.length - 2)); //remove unit

        //Touch End handler
        body.addEventListener("touchend",function(e){
            //on touchup we cancel the touch event
            self.isTouched = false;
            //now if the list has moved downwards, it should come up but in a transition
            self.list.style.transition = "top "+ self.comeUpDuration;
            if (typeof self.onRelease === 'function')
                self.onRelease();

            self.list.style.top = self.cssY + 'px';
            self.thresholdPassed = false;
        },false);
        //mouse up handler  (for desktop browsers)
        body.addEventListener("mouseup",function(e){
            self.isTouched = false;
            self.list.style.transition = "top "+ self.comeUpDuration;

            if (typeof self.onRelease === 'function')
                self.onRelease();
            self.list.style.top = self.cssY + 'px';
            self.thresholdPassed = false;
        },false);

        //handle touch-move event
        self.list.addEventListener("touchmove",function(e){
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
        },false);
        //handle mousemove event (for desktop browsers)
        self.list.addEventListener("mousemove",function(e){
            if(self.isTouched){
                if(e.clientY > self.prevY){
                    var change = (e.clientY - self.prevY)/self.inertiaRatio;
                    self.list.style.top = self.cssY + change + 'px';
                    self.thresholdPassed = change > self.thrashold;
                    if (typeof self.onMove === 'function')
                        self.onMove();
                }
            }
        },false);

    };

}







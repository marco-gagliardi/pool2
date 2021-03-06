# pool2

A simple, tiny, lightweight, pure javascript library to easily implement a pull-to-whatever mechanism in a web application. It works on  both desktop and mobile/touch devices. No extra libraries or frameworks needed! 

## Demo
Watch a simple demo <a href='http://marco-gagliardi.github.io/pool2'>here</a>

## Usage

Include pool2.js in your HTML page

```html
<script src="src/pool2.js"></script>
```

Instantiate a new pull to refresh element, passing the list container ID as a parameter
```javascript
var container = document.getElementById("list");
var p = new pool2(container);
```
(Optional) Tell the library to start the overall effect only when the user touches and pulls a specific container's sub-element (if not specified, the whole list/container will be considered as the pullable element). Tip: useful on mobile devices to allow long lists scrolling without triggering the refresh action each time!
```javascript
var element = document.getElementById("pullable");
p.setPullable(element); //element or element-id of the container's sub-element that must be pulled in order to start the effect
```
Override callback functions with your own 'onMove' and 'onTouchEnd' events handlers (Tip: take advantage of the 'thresholdPassed' flag to pilot different behaviours whether the minimum threshold offset in pixels has been passed or not)
```javascript
    p.onRelease = function() {
        //eg. hide  messages  
        if(p.thresholdPassed) {
            //eg. start the loading animation, download new data, stop the loading animation
        }
    };
    p.onMove = function() {
        if(p.thresholdPassed) {
            //eg. show the user a message to release the pulling now
        } else {
            //eg. show the user a message to pull a little bit more to reach the threshold
        }
    };
```

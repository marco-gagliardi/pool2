# pool2

A simple, lightwave, pure javascript library to easily implement a pull-to-refresh mechanism in a web application. It works on  both desktop ond mobile/touch devices. No extra libraries or frameworks needed! 


### Demo
Watch a simple <a href='http://marco-gagliardi.github.io/pool2'>demo here</a>

## Usage

Include pool2.js in your HTML page

```html
<script src="src/pool2.js"></script>
```

Instantiate a new pull to refresh element
```javascript
var p = new pool2();
```
Tell the library the id of the whole object (likely a list) be pulled down and the id of the element that must be touched to start the pulling effect (it can be the list itself if needed, or a descendant element)
```javascript
p.setList("list"); //id of the whole list
p.setPullable("pullable"); //id of the element to be pulled to start the effect
```
Override callback functions with your own 'onMove' and 'onTouchEnd' events handlers (tip: take advantage of the 'thresholdPassed' flag to pilot different behaviours whether the minimum threshold offset in pixels has been passed or not)
```javascript
    p.onTouchEnd = function() {
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

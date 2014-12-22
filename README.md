# pool2

A simple, lightwave, pure javascript library to easily implement a pull-to-refresh mechanism in a web application (for both desktop or touch devices). 


### Demo
Whatch a simple <a href='https://github.com/marco-gagliardi/pool2/blob/master/demo.html'>demo</a>

## Usage

1 - include pool2.js in your page

```html
<script src="src/pool2.js"></script>
```

2) instantiate a new pull to refresh element
```javascript
var p = new pool2();
```
3) Tell the library the id of the whole object (likely a list) be pulled down and the id of the element that must be touched to start the pulling effect 
```javascript
p.setList("list"); //id of the whole list
p.setPullable("pullable"); //id of the element to be pulled to start the effect
```
4) Override callback functions with your own 'onMove' and 'onTouchEnd' events handlers (take advantage of the 'thresholdPassed' flag to pilot a different behaviour whether the minimum threshold offset in pixels has been passed or not)
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

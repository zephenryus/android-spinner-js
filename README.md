# Android Loading Spinner

A jQuery plugin to add an Android Holo themed loading spinner for ajax requests. The image is canvas based and can scale to any size. 

![alt text](https://raw.githubusercontent.com/zephenryus/android-spinner-js/master/ajax-loader.png "Sample ajax loader")

**Note:** at larger sizes the loader starts to degrade visually.

## Usage

Using jQuery, select an element to attach the loader image to.

```javascript
$( "div" ).ajaxLoader();
```

The plugin _prepends_ a canvas element the same size as the selected element. If the element has a height or width of `0` the plugin will change the height and width of the selected element to match the loader's `size`.
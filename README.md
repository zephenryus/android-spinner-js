# Android Loading Spinner

A jQuery plugin to add an Android Holo themed loading spinner for ajax requests. The image is canvas based and can scale to any size. 

![alt text](https://raw.githubusercontent.com/zephenryus/android-spinner-js/master/ajax-loader.png "Sample ajax loader")

**Note:** at larger sizes the loader starts to degrade visually.

## Demo

[Ajax Loader](http://kevinleejensen.com/android-spinner.html)

## Description

```javascript
.ajaxLoader( options )
```

**options**
Type: Object
An object of values that will modify the look and function of the ajax loader

===

**size**
Type: Number
The diameter of the loader

**lineWidth**
Type: Number
The width of the line of the loader

**top**
Type: Object
An object of values that will describe the top circle

===

**color**
Type: String
A css string to describe the color (Examples: "#f00", "#4b98eb", "rgb(233, 233, 233)")

**direction**
Type: Number
The direction the circle should rotate; 1 = clockwise; -1 = counter-clockwise

**gradientRange**
Type: Array
A two value array giving the starting and stopping opacities of the gradient (Examples: [0, 1], [0.05, 0.8]). Currently this only supports grandient ranges from least to greatest.

**rotationRate**
Type: Number
The number of revolutions per second to rotate the circle

**steps**
Type: Number
The number of steps to use in the gradient (More steps gives a smoother gradient)

===

**bottom**
Type: Object
An object of values that will describe the top circle

===

**color**
Type: String
A css string to describe the color (Examples: "#f00", "#4b98eb", "rgb(233, 233, 233)")

**direction**
Type: Number
The direction the circle should rotate; 1 = clockwise; -1 = counter-clockwise

**gradientRange**
Type: Array
A two value array giving the starting and stopping opacities of the gradient (Examples: [0, 1], [0.05, 0.8]). Currently this only supports grandient ranges from least to greatest.

**rotationRate**
Type: Number
The number of revolutions per second to rotate the circle

**steps**
Type: Number
The number of steps to use in the gradient (More steps gives a smoother gradient)

===

## Usage

### Basic Usage

Using jQuery, select an element to attach the loader image to.

```javascript
$( "div" ).ajaxLoader();
```

The plugin _prepends_ a canvas element the same size as the selected element. If the element has a height or width of `0` the plugin will change the height and width of the selected element to match the loader's `size`.

### Adding Options

Options can be added to the plugin to customize the loader

```javascript
$( "div" ).ajaxLoader( {
	size: 100,
	lineWidth: 11,
	top: {
		color: "#4b98eb"
	},
	bottom: {
		color: "#377fcc"
	}
} );
```

## Examples

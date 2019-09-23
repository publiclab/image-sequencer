Documentation of various Modules
===

List of Module Documentations

1.  [Add QR](#Add-QR-module)
2.  [Average](#average-module)
3.  [Blend](#blend-module)
4.  [Blur](#blur-module)
5.  [Brightness](#brightness-module)
6.  [Channel](#channel-module)
7.  [Colorbar](#colorbar-module)
8.  [Colormap](#colormap-module)
9.  [ColorTemperature](#color-temperature)
10. [Contrast](#contrast-module)
11. [Convolution](#convolution-module)
12. [Crop](#crop-module)
13. [DecodeQr](#decodeQr-module)
14. [Dither](#dither-module)
15. [DrawRectangle](#draw-rectangle-module)
16. [Dynamic](#dynamic-module)
17. [Edge-Detect](#edge-detect-module)
18. [FisheyeGl](#fisheyeGl-module)
19. [FlipImage](#flipimage-module)
20. [Gamma-Correction](#gamma-correction-module)
21. [Gradient](#gradient-module)
22. [Grid-Overlay](#grid-overlay)
23. [Histogram](#histogram-module)
24. [Import-image](#import-image-module)
25. [Invert](#invert-module)
26. [MinifyImage](#minify-image)
27. [Ndvi](#ndvi-module)
28. [Ndvi-Colormap](#ndvi-colormap-module)
29. [NoiseReduction](#noise-reduction)
30. [Overlay](#overlay-module)
31. [PaintBucket](#paint-bucket-module)
32. [ReplaceColor](#replacecolor-module)
33. [Resize](#resize-module)
34. [Rotate](#rotate-module)
35. [Saturation](#saturation-module)
36. [Segmented-Colormap](#segmented-colormap-module)
37. [Text-Overlay](#text-overlay)
38. [Threshold](#threshold)
39. [Tint](#tint)


## add-qr-module

This module Adds QR corresponding to the given string.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('add-qr',options)
           .run()
```

where `options` is an object with the following properties:
* size : size of QR code in pixels (default 200)
* qrCodeString : input string to generate QR code


## average-module

This module is used for averaging all the pixels of the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('average',options)
           .run()
```


## blend-module

This module is used for blending two images .
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('blend',options)
           .run()
```

where `options` is an object with the following properties:
* offset: step of image with which current image is to be blended(Two steps back is -2, three                steps back is -3 etc; default -2) 
* func: function used to blend two images (default : function(r1, g1, b1, a1, r2, g2, b2, a2) {            return [ r1, g2, b2, a2 ] })

## Blob Analysis

This module uses Opencv.js for detecting and marking blob/region in microscopic images. It requires an opencv.js file to 
be loaded before using the functionalities which is currently being loaded to the webpage via script.It supports both environments, Node.js and browser for processing. 

As the size of opencv.js file is quite large, the future versions will focus on loading it asynchronously, on demand of the the module to optimise performance.

#### Usage
```js
  sequencer.loadImage('PATH')
           .addSteps('blob-analysis')
           .run()
```

## blur-module

This module is used for applying a Gaussian blur effect.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('blur',options)
           .run()
```

where `options` is an object with the following property:
* blur : Intensity of Gaussian blur (0 to 5; default 2)


## brightness-module

This module is used for changing the brightness of the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('brightness',options)
           .run()
```

where `options` is an object with the following property:
* brightness : brightness of the image in percentage (0 to 100; default 100)


## channel-module

This module is used for forming a grayscale image by applying one of the three primary colors.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('channel',options)
           .run()
```

where `options` is an object with the following property:
* channel : color of the channel (red, green, blue; default green)


## colorbar-module

This module is used for displaying an image with a colorbar.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('colorbar',options)
           .run()
```

where `options` is an object with the following properties:
* colormap : Name of the Colormap(default, greyscale, stretched, fastie, brntogrn, blutoredjet,                 colors16; default: default)
* x : X-position of the image on which the new image is overlayed (default 0)
* y : Y-position of the image on which the new image is overlayed (default 0)
* h : height of resulting cropped image (default : 50% of input image width )


## colormap-module

This module is used for mapping brightness values (average of red, green & blue) to a given color  lookup table, made up of a set of one more color gradients.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('colormap',options)
           .run()
```

where `options` is an object with the following property:
* colormap : Name of the Colormap ( greyscale, stretched, fastie, brntogrn, blutoredjet,                        colors16)


## Color Temperature

This changes the color temperature of the image.
## Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('color-temperature',options)
           .run()
```
where `options` is an object with the following property:
* temperature : temperature between 0 - 40,000 kelvin (default 6000)


## contrast-module

This module is used for changing the contrast of the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('contrast',options)
           .run()
```

where `options` is an object with the following property:
* contrast : contrast for the given image (-100 to 100; default : 70)


## convolution-module

This module is used for performing image-convolution.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('convolution',options)
           .run()
```

where `options` is an object with the following properties:
* constantFactor : a constant factor, multiplies all the kernel values by that factor (default :                     1/9)
* kernelValues : nine space separated numbers representing the kernel values in left to right and                   top to bottom format(default : 1 1 1 1 1 1 1 1 1)


## crop-module

This module is used to crop an image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('crop',options)
           .run();
```
Where `options` is an object having the properties `x`, `y`, `w`, `h`. This diagram defines these properties:

![Image](CropManual.png)

#### Defaults

* `options.x` : 0
* `options.y` : 0
* `options.w` : half of image width
* `options.h` : half of image height


## decodeQr-module

This module is used for decoding a QR in image (if present).
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('decode-qr',options)
           .run()
```

## dither-module

This module approximates a color from a mixture of other colors when the required color is not available, creating illusions of the color that is not present actually.

[more info on wikipedia](https://en.wikipedia.org/wiki/Dither)
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('dither',options)
           .run()
```
where `options` is an object with the following property:
* dither : Can select the name of the Dithering Algorithm(default none)
 

## draw-rectangle-module

This module helps to draw a rectangle on the image with a starting and ending corner with the specified thickness and color of the border.
## Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('draw-rectangle',options)
           .run()
```
where `options` is an object with the following properties:
* startingX : starting x position of the rectangle (default 0)
* startingY : starting y position of the rectangle (default 0)
* endX      : last x position of the rectangle (default "width")
* endY      : last y position of the rectangle (default "height")
* thickness : thickness of the border (default 1)
* color     : RGBA values separated by a space (default "0 0 0 255") 


## dynamic-module

This module is used for producing each color channel based on the original image's color.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('dynamic',options)
           .run()
```

where `options` is an object with the following properties:
* red : expression for red channel (R, G, B and A as inputs; default r)
* green : expression for green channel (R, G, B and A as inputs; default g)
* blue : expression for blue channel (R, G, B and A as inputs; default b)
* monochrome: fallback for other channels if none provided (default : r+g+b/3)


## edge-detect-module

This module is used for detecting images.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('edge-detect',options)
           .run()
```

where `options` is an object with the following properties:
* blur :  Intensity of Gaussian blur (0 to 5; default 2)
* highThresholdRatio : Upper Threshold Ratio ( default : 0.2)
* lowThresholdratio : Lower Threshold Ratio ( default : 0.2)


## fisheyeGl-module

This module is used for correcting Fisheye or Lens Distortion
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('fisheye-gl',options)
           .run()
```

where `options` is an object with the following properties:
* a : a correction (0 to 4; default 1)
* b : b correction (0 to 4; default 1)
* Fx : x correction (0 to 4; default 1)
* Fy : y correction (0 to 4; default 1)
* scale : The ratio to which the original image is to be scaled (0 to 20; default 1.5)
* x : Field of View x (0 to 2; default 1)
* y : Field of View y (0 to 2; default 1)


## flipimage-module 

This module is used for flipping the image on the selected axis.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('flip-image',options)
           .run()
```

where `options` is an object with the following properties:
* Axis : select the required axis (default : vertical)


## gamma-correction-module

This module is used for applying gamma correction.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('gamma-correction',options)
           .run()
```

where `options` is an object with the following property:
* adjustment : Inverse of actual gamma factor (default 0.2)


## gradient-module

This module is used for finding gradient of the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('gradient',options)
           .run()
```


## Grid Overlay

This adds the grid over an image.
## Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('grid-overlay',options)
           .run()
```
where `options` is an object with the following property:
* options.x : The value at which the grid line should start in x-axis.
* options.y : The value at which the grid line should start in y-axis.
* color : Color for the grid on the image.


## histogram-module

This module is used for calculating histogram of the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('histogram',options)
           .run()
```

where `options` is an object with the following property:
* gradient : boolean value used to toggle gradient along x-axis (true or false; default true)


## import-image-module

This module is used for importing a new image and replacing the original with it.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('import-image',options)
           .run()
```

where `options` is an object with the following property:
* url : url of the  new image (local image url or data url;default : "./images/monarch.png")


## invert-module

This module is used for inverting the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('invert',options)
           .run()
```


## Minify Image

This module minifies the image using lossy compression that is the image-dimensions are not lost but the size is reduced.

The module supports jpg/jpeg/webp images in browser; but the node version supports all of the types.
#### Usage

```js
sequencer.loadImage('PATH')
           .addSteps('minify-image')
           .run()
```


## ndvi-module  

This module is used for applying ndvi technique to the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('ndvi',options)
           .run()
```

where `options` is an object with the following property:
* filter : filter for NDVI (blue or red; default red)


## ndvi-colormap-module

This module is used for demonstrating ndvi and colormap properties consecutively.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('ndvi-colormap',options)
           .run()
```


## Noise-Reduction

Noise in an image are atypical pixels that are not representing the color or the exposure of the scene correctly. This Noise Reduction module reduces the noise in the image by using either median filtering or mean filtering techniques to change the RGB value of the pixels to create a smoother and fuller image.

#### Usage
```js
    sequencer.loadImage('PATH')
             .addSteps('noise-reduction',options)
             .run()
```
where `options` is an object with the property `method`. `options.method` can be:
* Median Filtering: Set the RGB value of the pixel to the median RGB pixel value of all adjacent pixels (maximum 8 adjacent pixels and itself)
* Mean Filtering: Set the RGB value of the pixel to the mean RGB pixel value of all adjacent pixels (maximum 8 adjacent pixels and itself)


## overlay-module

This module is used for overlaying an Image over another .
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('overlay',options)
           .run()
```

where `options` is an object with the following properties:
* x : X-position of the image on which the new image is overlayed (default 0)
* y : Y-position of the image on which the new image is overlayed (default 0)
* offset : offset to the step on which the output of the last step is overlayed (default -2)


## paint-bucket-module

This module fills any polygonal shape with the specified color in pixels.
## Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('paint-bucket',options)
           .run()
```

where `options` is an object with the following property:
* startingX : it is the value of the starting x-cordinate (default 10)
* startingY : it is the value of the starting y-cordinate (default 10)
* fillColor : they are four spaced seperated numbers representing the RGBA values of fill-color (default "100 100 100 255")
* tolerance : it is the % tolerance (default 10)


## replacecolor-module

This module is used in replacing the color with grey or any desired color.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('replace-color',options)
           .run()
```
where `options` is an object with the following properties:
* replaceMethod : replaces with the desired color (default greyscale)
* replaceColor : three space separated numbers representing the RGB values of color to be filled (default "0 0 255")
* color : three space separated numbers representing the RGB values of color to be replaced (default "228 86 81")
* tolerance : it is the % tolerance (default 50)


## resize-module

This module is used for resizing an image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('resize',options)
           .run()
```

where `options` is an object with the following property:
* resize : Percentage value of resize (default 125%)


## rotate-module

This module is used for rotating an image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('rotate',options)
           .run()
```

where `options` is an object with the following property:
* rotate : angular value for rotation in degrees (between 0 and 360; default 0)


## saturation-module

This module is used for changing the saturation of the image.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('saturation',options)
           .run()
```

where `options` is an object with the following property:
* saturation : saturation for the new image (between 0 and 2; default 0)


## segmented-colormap-module

This module is used to map the pixels of the image to a segmented colormap.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('segmented-colormap',options)
           .run()
```

where `options` is an object with the property `colormap`. `options.colormap` can be:

* "default" : [[0, [0, 0, 255], [38, 195, 195]], [0.5, [0, 150, 0], [255, 255, 0]], [0.75, [255, 255, 0], [255, 50, 50]]]

* "greyscale" : [[0, [0, 0, 0], [255, 255, 255]], [1, [255, 255, 255], [255, 255, 255]]]

* "stretched" : [[0, [0, 0, 255], [0, 0, 255]], [0.1, [0, 0, 255], [38, 195, 195]], [0.5, [0, 150, 0], [255, 255, 0]], [0.7, [255, 255, 0], [255, 50, 50]], [0.9, [255, 50, 50], [255, 50, 50]]]

* "fastie" : [[0, [255, 255, 255], [0, 0, 0]], [0.167, [0, 0, 0], [255, 255, 255]], [0.33, [255, 255, 255], [0, 0, 0]], [0.5, [0, 0, 0], [140, 140, 255]], [0.55, [140, 140, 255], [0, 255, 0]], [0.63, [0, 255, 0], [255, 255, 0]], [0.75, [255, 255, 0], [255, 0, 0]], [0.95, [255, 0, 0], [255, 0, 255]]]

* A custom array.


## Text Overlay

The modules allows to add text to image in both browser and node environment. We have the options to modify the font-size and also support few font-styles. The text color can also be modified.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('grid-overlay',options)
           .run()
```
The options can take various attributes like,
var options = { text : 'Hello World', size : '12'};


## Threshold 

Thresholding is used to create binary images.
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('threshold',options)
           .run()
```
where `options` is an object with the following property:
* threshold : it allows to select the types of thresholding (default "manual thresholding")
* input : it allows to select the range of thresholding value (default 120)


## Tint 

It adds color tint to an image
#### Usage

```js
  sequencer.loadImage('PATH')
           .addSteps('tint',options)
           .run()
```
where `options` is an object with the following property:
* color : RGB values seperated by a space (default "0 0 255")
* factor : amount of tint (default 0.5)

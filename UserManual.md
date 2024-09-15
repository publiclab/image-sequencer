**Image Sequencer** 
User Manual Version 0.3 
July 14, 2019
=========================


1. [Introduction](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#introduction)  
  1.1  [General Instructions](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#general-instructions) 
2. [Specifications](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#specifications)  
  2.1  [Input Format Options](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#input-format-options)  
  2.2  [Output Options](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#output-options)  
  2.3  [Color Scheme - RGBA](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#color-scheme--rgba)  
  2.4  [Image Coordinates](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#image-coordinates)  
  2.5  [Processing Environment](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#processing-environ)    
  2.6  [Contributions](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#contributions)
3. [Image Modules](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#image-modules)  
  3.1  [Add QR Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#add-qr-module)  
  3.2  [Average Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#average-module)  
  3.3  [Blend Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#blend-module)  
  3.4 [Blur Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#blur-module)  
  3.5 [Brightness Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#brightness-module)   
  3.6 [Channel Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#channel-module)  
  3.7 [Color Temperature](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#color-temperature)  
  3.8 [Color Bar Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#color-bar-module)  
  3.9 [Colormap Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#colormap-module)    
  3.10 [Contrast Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#contrast-module)  
  3.11 [Convolution Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#convolution-module)   
  3.12 [Crop Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#crop-module)  
  3.13 [Decode QR Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#decodeqr-module)  
  3.14 [Detect Edges](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#detect-edges)  
  3.15 [Dither Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#dither-module)  
  3.16 [Draw Rectangle Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#draw-rectangle-module)  
  3.17 [Dynamic Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#dynamic-module)  
  3.18 [Exposure](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#exposure)  
  3.19 [Fisheye Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#fisheyegl-module)  
  3.20 [Flip Image Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#flipimage-module)  
  3.21 [Gamma Correction Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#gamma-correction-module)    
  3.22 [Gradient Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#gradient-module)   
  3.23 [Grid Overlay](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#grid-overlay)    
  3.24 [Histrogram Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#histogram-module)  
  3.25 [Import Image Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#import-image-module)  
  3.26 [Invert Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#invert-module)  
  3.27 [NDVI Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#ndvi-module)  
  3.28 [NDVI Colormap Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#ndvi-colormap-module)  
  3.29 [Overlay Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#overlay-module)  
  3.30. [Paint Bucket Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#paint-bucket-module)  
  3.31 [Resize Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#resize-module)  
  3.32 [Replace Color Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#replacecolor-module)  
  3.33 [Rotate Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#rotate-module)  
  3.34 [Saturation Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#saturation-module)  
  3.35 [Text Overlay Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#text-overlay)    
  3.36 [Threshold Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#threshold)    
  3.37 [Tint Module Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#tint)  
  3.38 [WebGIDistort Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#webgi-distort)  
  3.39 [White Balance Module](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#white-balance)     
4. [Applications](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#applications)  
  4.1  [NDVI](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#ndvi)  
  4.2  [NDVI (NIR and Red) with Color Bar](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#ndvi-nir-and-red-with-color-bar)  
5. [References](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#references)  
5. [Sponsors](https://github.com/MargaretAN9/GSOC-2019/blob/master/ImageSequencerUserManual.md#sponsors)  

## Introduction:
Image sequencer is a sequential image processing system inspired by storyboards.   The storyboard process permits graphic editing by a series of modules tailored for different image processing applications.  

Image Sequencer is different from other image processing systems because it's non-destructive: instead of modifying the original image, it creates a new image at each step in a sequence. This is because it:

* produces a legible trail of operations, to "show your work" for evidential, educational, or reproducibility reasons
* makes the creation of new tools or "modules" simpler -- each must accept an input image, and produce an output image
* allows many images to run through the same sequence of steps
* works identically in the browser, on Node.js, and on the command line


This manual provides instruction for the web browser applications of Image Sequencer.  The user manual consists of specifications, a description of the modules and an applications section which describes how the modules, when combined, can be used for different types of image analysis. 


### General Instructions: 

General operating instructions are described below: 

1) Access Image Sequencer  at: https://sequencer.publiclab.org/examples/#steps=
2) Load new picture (or use default image)   
3) Select a module from the dropdown box  
3a)Adjust Module Parameters (as needed)   
4) Click green 'add step' button   
5) Add or delete  modules (delete via small garbage can icon in upper right of displayed modules)    
6) Store to file by clicking image or use "Save" blue button.    


![enter image description here](https://lh3.googleusercontent.com/TSZGcZjnFakspSPQz7Sl5eRffznuJb413_ifzyr6l5VYdQ-uSXzp9CRXgRVTTYBQuMLquMXxb0rO)
![enter image description here](https://lh3.googleusercontent.com/im15hyEGwHwY1iy6FkKEyAzbMoPOiCOQ3xCJnccEVnzntsvg-ZV7_5ZugkDMDy5nttM1RHmt9c6x)


## Specifications:
### Input Format Options:
Image sequencer supports the following options as input images:
  * jpeg
  * jpg
  * png
  * GIF
  * canvas
  
 Maximumn Image Size:
  * lesss than 10MB is recommended
  
  Color and black/white images are supported
  
  8 bit depth
 
### Output Options:
Image sequencer supports the following options as output images:
  * PNG
  * GIF (provides images thru each sequence)   

 
### Color Scheme – RGBA:
Color is represented as as ‘tuple’ in (R,G,B,A) format. Each color channel (R-Red, B-Blue, G-Green)  has a value between 0 and 255.
*‘A’ represents transparency with values 0 to 255.*

For example: 
black is: (0,0,0),
white is (255,255,255),
red is (255,0,0), 
blue is (0,0,255). 

### Image coordinates:
Coordinates in (X,Y), which is (0,0) is located at the top left of the image. 


![graph](https://lh3.googleusercontent.com/_86j-laf9fp4rVNTVKmdOprVAeAeAVzRryWJO2R3X3B7apoKg409NKx1VwDfl9Y5tWNH0IcqzJKR "grpah")


Figure 1 Public Lab Image Sequencer coordinate matrix

## Processing Environment:
Image Sequencer modules are designed to be run either in the browser or in a Node.js environment. 

*(What is the processing environment ???)*
*(processing time vs file size)*

## Contributions:
Image Sequencer is an open source tool and is happily accepting contributions for improvement.   
* See https://github.com/publiclab/image-sequencer/blob/main/CONTRIBUTING.md for more information. 
* If you find a bug, please list it at https://github.com/publiclab/image-sequencer/issues/new, and help  develop Image Sequencer by opening an issue!

## Image Modules:

Image Sequencer uses modules that perform a variety of step-by-step image processing tasks.  Figure 2 describes the general workflow.

This section describes each module and a general implementation example.  Most examples used Figure 3 as the input reference image.  Advanced image processing concepts include a wikipedia reference for mor information. 

![workflow](https://lh3.googleusercontent.com/XE_twkHy8uxZ6jycIddQlMxJF91AbU29pJPILcRcolwiiaNJAUPrJhU_PAJYmVGGoHcJ7aOSTNFR)


Figure 2 Image Sequencer workflow:


![Figure 4 Reference Image](https://lh3.googleusercontent.com/A98oLhF19A1li9ugUa9lvyOJXzKang6nwAn61E_Zwf6NZ3Tqw3OsuuHqUbbb2MnWD_eTL140rRJj )

Figure 3 Image Sequencer general reference image used as example input.

Additional information on the modules and other operating modes can be found at the Image Sequencer GitHub site. 

 - [https://github.com/publiclab/image-sequencer/tree/main/docs](https://github.com/publiclab/image-sequencer/tree/main/docs)
 - [https://github.com/publiclab/image-sequencer/blob/main/README.md](https://github.com/publiclab/image-sequencer/blob/main/README.md)
### Add-qr-module:
This module adds a QR code to the image that corresponding to an input string.

Where options is an object with the following properties:
 - size: size of QR code in pixels (default 200)
 - qrCodeString: input string to generate QR code
 
 
![qr](https://lh3.googleusercontent.com/o99UIUmc8jbs7sn7InSG0NfizUbm3UhOe5q96dPPEGo4ptqHs0lULdkEoFdEEMOLC17dqxFn89wy)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('add-qr',options)
    .run()
    
    
### Average-module:
This module is used for averaging all the pixels of the image.

    
![average](https://lh3.googleusercontent.com/RYHPXdfMDroNKSaKESqJxR30bhSp15fNtK1RozQZgZUfeo19ISwPwmUsM82CvmPTElJ9D60QTdm4)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('average',options)
    .run()
    
### Blend-module:
This module is used for blending two images . (Blend two chosen image steps with the given function. Defaults to using the red channel from image 1 and the green and blue and alpha channels of image 2.)

Where options is an object with the following properties:

-   offset: step of image with which current image is to be blended (Two steps back is -2, three steps back is -3 etc; default -2)
-   func: function used to blend two images (default: function(r1, g1, b1, a1, r2, g2, b2, a2) { return [ r1, g2, b2, a2 ]})

For this example it is necessary to import a second image.


![blend](https://lh3.googleusercontent.com/XNuFGACTSQ0yDthkG6KSopK4-zDSJITsgT4XwhTUFn1byaB7IuF5YqvwQXuzaTvpQwRuKNSbMa2V)


Usage:

    sequencer.loadImage('PATH')
    addSteps('blend',options)
    .run()
    
### Blur-module:

This module is used for applying a [Gaussian blur](https://en.wikipedia.org/wiki/Gaussian_blur) or smoothing effect.

Where options is an object with the following property:
-   blur : Intensity of Gaussian blur (0 to 5; default 2)


![blur](https://lh3.googleusercontent.com/0gqLTZyaTssk5H9qloxBs_9L53LZbikFr9DIWuu2CS_Z3Eg8byytJT-fJgrLaMoyq3N5-EAjwi6R)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('blur',options)
    .run()
    
### Brightness-module:

This module is used for changing the brightness of the image.

Where options is an object with the following property:
-   brightness : brightness of the image in percentage (0 to 100; default 100)

*note: sliders goes to 200? Not 100*


![brightness](https://lh3.googleusercontent.com/jWt1o-ReLUXhAgRKF0Kvwtj2-v5CmQKsx4EngN_jhEkkn07TQ0iT9IZEkCxE6sipntH0wGge0jov)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('brightness',options)
    .run()

### Channel-module:

This module is used for forming a grayscale image by applying one of the three primary colors.

Where options is an object with the following property:

-   channel : color of the channel (red, green, blue; default green)


![blue](https://lh3.googleusercontent.com/zZk1cCU0sgHMHBNmL_NMC-dZcmyykuDZUt_dde2bcfrX4ioA3xDh1u4pGHXjbTBLlBkULHjM7W74)


![green](https://lh3.googleusercontent.com/eipiq-dIw4_3x6S1s64DktO6gnAR91I-6T-K35SaTkM-9r1xk9ietLBJmFjeU4L4H32Y1n2QnU7L)


![red](https://lh3.googleusercontent.com/JADUlR2G21jfxWBXBZr1r4fHfxhvbdlDAsSBTVE2ncBjI5tswWk8ES3NyIsvxXV2qaauApZDlSJ8)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('channel',options)
    .run()
    
### Color Temperature:

This changes the color temperature of the image.

Where options is an object with the following property:

-   temperature : temperature between 0 - 40,000 kelvin (default 6000)

Color temperature AT 100, 1000, 10,000, and 30000:


![100](https://lh3.googleusercontent.com/B1GiDQ6iHvBM0nZ3eUxD_Mt8Om7kMKLyI-TSep-Mplchds7snjIbBhUEV2B0x6JgBmK-eUcGYKxi)


![1000](https://lh3.googleusercontent.com/KLkMrUB0Y3gtsGoDNkf5ZGdrLzMtBxhMh3ipcFn5m1ERxcrzwWTBZqf7ctXRwFJhNCDqQgJ55PaV)


![10000](https://lh3.googleusercontent.com/hdGOEDsm9y7emleDeJS7TW3OOMUSKLGRObhvJuZMXYK3Q8nC0way7AlOM_YpH_t3EI5daFlJhF-D)


![100000](https://lh3.googleusercontent.com/_67T5U1AMUUed9E1Z_aIVO4LIUU9wT8JEMfRZIb3MyUIuq9euMPsQ2gGpNbbPGM6d6fNjixN523v)



Usage:

    sequencer.loadImage('PATH')
    .addSteps('color-temperature',options)
    .run()
    
### Color-bar-module:

This module is used for displaying an image with a color bar.

Where options is an object with the following properties:

-   colormap: Name of the Colormap(default, greyscale, stretched, fastie, brntogrn, blutoredjet, colors16; default: default)
-   x: X-position of the image on which the new image is overlayed (default 0)
-   y: Y-position of the image on which the new image is overlayed (default 0)
-   h: height of resulting cropped image (default : 50% of input image width )

*Could not get color bar to work*


![colorbar](https://lh3.googleusercontent.com/eyctaS-TsE_8QC9cuDn8qjAcM1n11XiMFpbW6mO1nEkngaE50gAyCWv10Pq4SlDJ_8hXQKTAsiQc)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('colorbar',options)
    .run()
    
### Colormap-module:

This module is used for mapping brightness values (average of red, green & blue) to a given color lookup table, made up of a set of one more color gradients.


Where options is an object with the following property:

-   colormap: Name of the Colormap ( greyscale, stretched, fastie, brntogrn, blutoredjet, colors16)


![colormap](https://lh3.googleusercontent.com/8BSfWTEKOQPYlIzE419K4BL1qrDhLm8ZvM26vEKZbu5G0HSybzKELbvBAi5shqIb31mJ2D2sf8fY)


![fastie](https://lh3.googleusercontent.com/fD2kQMVTbdxZaMMe63tnND4PbBzp7BhQK2M5ygF1bwnUfMmdS-kSqWGzsAt5G8kxMXTPSUd_pD9q)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('colormap',options)
    .run()
    
### Contrast-module:
This module is used for changing the contrast of the image.

Where options is an object with the following property:
-   contrast : contrast for the given image (-100 to 100; default : 70)


![contrast](https://lh3.googleusercontent.com/-IsvrKxPphqMdx3pvyIprj9iVLt2B6UbuTe_9V2dXgi-JMCPNqbsj6cbRw0Y2sSkCjHk6vt22Xqx)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('contrast',options)
    .run()
    
### Convolution-module:

This module is used for performing image-convolution.  [Convolution](https://en.wikipedia.org/wiki/Kernel) is used for blurring, sharpening, embossing, edge detection, and more. This is accomplished by doing a convolution between a kernel (or matrix) and an image.

Where options is an object with the following properties:

-   constantFactor: a constant factor, multiplies all the kernel values by that factor (default : 1/9)
-   kernelValues: nine space separated numbers representing the kernel values in left to right and top to bottom format(default: 1 1 1 1 1 1 1 1 1)


![convulotion](https://lh3.googleusercontent.com/W57SJSUSgqigJ-tLBCUQ1VxcstoVFjIVyJluOY43_AmxsMFNFQ_BMY_V0pNCGSZTDfi3UVu7KAJH)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('convolution',options)
    .run()
    
### Crop-module:

This module is used to crop an image.

Where options is an object having the properties x, y, w, h. This diagram defines these properties:


![crop](https://lh3.googleusercontent.com/D6_RHxxBiQ7597CNOLaEksZOn5LE-vEthRfq4qNuAGX8VobXzpWAQUi8WFcBrNfq7mCeP2zhKLXh)


Defaults:
-   options.x: 0
-   options.y: 0
-   options.w: half of image width
-   options.h: half of image height


![crop2](https://lh3.googleusercontent.com/Ng1NG7QL3lIMyvIdwIW8TuEvwgNeZOZPZuBjVgDHVoAtwK69TLK7E_qMDfjhU2vin28mkZuyZONu)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('crop',options)
    .run()
    
### DecodeQr-module:

This module is used for decoding a QR in image (if present).

Usage:

    sequencer.loadImage('PATH')
    .addSteps('decode-qr',options)
    .run()
    
 ### Detect Edges:
This module detects edges using the [Canny](https://en.wikipedia.org/wiki/Canny_edge_detector) method, which first Gaussian blurs the image to reduce noise (amount of blur configurable in settings as `options.blur`), then applies a number of steps to highlight edges, resulting in a greyscale image where the brighter the pixel, the stronger the detected edge

This module is used for detecting images.


Where options is an object with the following properties:

-   blur: Intensity of Gaussian blur (0 to 5; default 2)
-   highThresholdRatio: Upper Threshold Ratio ( default: 0.2)
-   lowThresholdratio: Lower Threshold Ratio ( default: 0.2)


![edges](https://lh3.googleusercontent.com/5zrQL8KHtd76UCV7wcU6x-BZqp5Me6ZoDfS_QIHRkp6OUrnw3nNL_oUoFM0EaLYht7I8ZLnVzi_p)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('edge-detect',options)
    .run()
    
### Dither-module:
Dither typically converts an image to black and white, such that the density of black dots in the new image approximates the average grey level in the original. Options include different processing techniques: none, Atkinson, floydsteinberg, bayer.  

Where options is an object with the following property:  dither: Can select the name of the [Dithering Algorithm](https://en.wikipedia.org/wiki/Dither#Algorithms)(default: none)


![none](https://lh3.googleusercontent.com/jaxbqrEozB8uv6x497xTzUbtyaS47TeaNajoJ_kCsDe6svIkvLGILfGC0DnG-GTW0ySIBeYYOhjl)


![bayer](https://lh3.googleusercontent.com/jOd8BBujIN8O9iKqyXopHdDWE0zw7fqFZXLjr0ZfRFCo-z2zb2wYMzzEIfEc_lYyeTh3T1SYYlnh)


![alkison](https://lh3.googleusercontent.com/eQXezh6XXjdyvAdoeQVhJc1ABus4BTBNvAWh1J3Yxd6n0TgxwFeAba-tmjzBC8Vf_BfkgX7y3QnM)


![roy](https://lh3.googleusercontent.com/1_8zAfzV4_NkPinJjVRjeHHOpGFRhqLhvBEEMii_AoIv_QOM1tuwEf2le5Cj0iWn2Qu6QynRuR33)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('dither',options)
    .run()
    
### Draw-rectangle-module:

This module helps to draw a rectangle on the image with a starting and ending corner with the specified thickness and color of the border.

Where options is an object with the following properties:

-   startingX: starting x position of the rectangle (default 0)
-   startingY: starting y position of the rectangle (default 0)
-   endX: last x position of the rectangle (default "width")
-   endY: last y position of the rectangle (default "height")
-   thickness: thickness of the border (default 1)
-   color: RGBA values separated by a space (default "0 0 0 255")


![rect](https://lh3.googleusercontent.com/sXICJ0JatL8_V7TPQCCw6BGWHONxgNeH6q3Q4zdw2GRhMbGMR7hb4jm272FcEFssAbq36GJ9cAYq)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('draw-rectangle',options)
    .run()
    
### Dynamic-module:

This module is used for producing each color channel based on the original image's color.

Where options is an object with the following properties:
-   red: expression for red channel (R, G, B and A as inputs; default r)
-   green: expression for green channel (R, G, B and A as inputs; default g)
-   blue: expression for blue channel (R, G, B and A as inputs; default b)
-   monochrome: fallback for other channels if none provided (default: r+g+b/3)


![dynamic](https://lh3.googleusercontent.com/1HVPawYwO7F00L8xNkCvODddc4i4gbvprSaHoZGE1s2zU_zk48UwT4y0dgp802MZahY4BUmi806y)


*Is it r+g+b or r+g+b/3)?*


Usage:

    sequencer.loadImage('PATH')
    .addSteps('dynamic',options)
    .run()
    
### Exposure:
Exposure (re)adjusts light in which the image was taken.   Underexposed digital photos are too dark; overexposed photos are, too light.

![exposure](https://lh3.googleusercontent.com/wqsLEq_UWar3s-aCbnf238mxGPd2BJbxrDyvw5QFc6DxQgNoC_ib5DxB6spte2IcduUOpWjK2Nn5)


### FisheyeGl-module:

This module is used for correcting [Fisheye](https://publiclab.org/notes/warren/08-25-2017/remove-lens-distortion-from-photos-with-fisheyegl) or  Barrel Lens Distortion.  This module changes the field of view by curving inward what would normally be a straight line.  Barrel distortion is typical on most wide angle prime lenses and and is common on go-pro cameras. 


Where options is an object with the following properties:
-   a: a correction (0 to 4; default 1)
-   b: b correction (0 to 4; default 1)
-   Fx: x correction (0 to 4; default 1)
-   Fy: y correction (0 to 4; default 1)
-   scale: The ratio to which the original image is to be scaled (0 to 20; default 1.5)
-   x: Field of View x (0 to 2; default 1)
-   y: Field of View y (0 to 2; default 1)


![fisheye](https://lh3.googleusercontent.com/9Z8UTfkSJM-yy0cIe5dO_4bxjssf7pqbGGzIn_MSOzx4LB_SuDexD75N_n1h4nIYxZMkWYOs0r1K )


Usage:

    sequencer.loadImage('PATH')
    .addSteps('fisheye-gl',options)
    .run()
    
### Flipimage-module:

This module is used for flipping the image on the selected axis.

Where options is an object with the following properties:
 - Axis: select the required axis (default: vertical)
 
 
![flip](https://lh3.googleusercontent.com/ML3N9rOY4l4QuCFeiEzFGHD1L2J8P83o8DEj1Pdj8dJjGOvYz4FWGDCjzhG8l36i20vYqRk9dNac)


![flipped](https://lh3.googleusercontent.com/6ShR5rDrxxwQCrZkQcH4IOmSxm5mYbyKJkD_y9LGWj8f3nC-jUaRwIkmOogFQ4geeX5pyNAsYA5Z)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('flip-image',options)
    .run()
    
### Gamma-correction-module:

This module is used for applying gamma correction.

Where options is an object with the following property:

-   adjustment: Inverse of actual gamma factor (default 0.2)

*(slider does not work)*

Usage:

    sequencer.loadImage('PATH')
    .addSteps('gamma-correction',options)
    .run()
    
### Gradient-module:
This module is used to create a gredient image that transitions from black (left edge) to white (right edge).  One application of the gradient module is create colorbars/colormaps.   
  
    
![grid](https://lh3.googleusercontent.com/wtOsiWayqrq4W6GuvQv2beIPKEDrQy8sdVnTSKx-ulJmIDsfE_sYOpP0P_bfpaqf1l3Rt9SH3ToF)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('gradient',options)
    .run()
    
### Grid Overlay:
This adds a grid over an image.

Where options is an object with the following property:

-   options.x: The value at which the grid line should start in x-axis.
-   options.y: The value at which the grid line should start in y-axis.
-   color: Color for the grid on the image.

*(only works once)*


![grid](https://lh3.googleusercontent.com/YZp6Ja3U9-wJxlpDpxiVlAHr5gsGKXKaZ-ezDB5yRrQPfphpQnTl1SD5GmrJEiRgTwXPy79ARqDr)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('grid-overlay',options)
    .run()
    
### Histogram-module:
This module is used for calculating the [histogram](https://en.wikipedia.org/wiki/Image_histogram) of the image.  The histogram plots the number of pixels in the image (vertical axis) with a particular brightness value (horizontal axis).

Where options is an object with the following property:

-   gradient: Boolean value used to toggle gradient along x-axis. (true or false; default true)


![histo](https://lh3.googleusercontent.com/U7LWC53SqBCAAg2XtDeq3qH3QcUj1iZdfGukrpNdgNYwpg8TcI_So_JktKvczDO0VJAbKECkZajn)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('histogram',options)
    .run()
    
### Import-image-module:

This module is used for importing a new image and replacing the original with it.

Where options is an object with the following property:

-   url: url of the new image (local image url or data url;default: "./images/monarch.png")

Usage:

    sequencer.loadImage('PATH')
    .addSteps('import-image',options)
    .run()

### Invert-module:

This module is used for inverting the image.

    
![invert](https://lh3.googleusercontent.com/8XIECi58eAKN2xKMesaEtjCTaUdu_qfhO9dOx308Tu-XVmoHPexhcJkzur884i4xKq_zweESY6WZ)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('invert',options)
    .run()

### NDVI-module:

This module is used for applying [NDVI](https://publiclab.org/wiki/ndvi) technique to the image.

Where options is an object with the following property:

-   filter: filter for NDVI (blue or red; default red)

Usage:

    sequencer.loadImage('PATH')
    .addSteps('ndvi',options)
    .run()
    
### NDVI-colormap-module:

This module is used for demonstrating ndvi and colormap properties consecutively.
    
    
![ndvi1](https://lh3.googleusercontent.com/5SQpUQczZSXqxUnkkDIxu8nLWjMgxL3_f4zryxjxOsZVT9zYWHMeN3D5WXjfdugrrzsOj2u3WMeV)


![ndvi2](https://lh3.googleusercontent.com/4dyid6O69AeeMfw6CCLlmuElLHvvx_xU19AgiTEp4UXkCc02QkIGGsqvtcawJhBMIWwLDdEn6uEG)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('ndvi-colormap',options)
    .run()
    
### Overlay-module:
This module is used for overlaying an Image over another .

Where options is an object with the following properties:

-   x: X-position of the image on which the new image is overlayed (default 0)
-   y: Y-position of the image on which the new image is overlayed (default 0)
-   offset: offset to the step on which the output of the last step is overlayed (default -2)


![overlay](https://lh3.googleusercontent.com/vLfS8aIfwec-yyPfotBx05Bhsty1lM3_XmIDX8AEr-jLqnGMg0VJIGAWm1o-iBwg--OoOdNr58da)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('overlay',options)
    .run()
    
### Paint-bucket-module:
This module fills any polygonal shape with the specified color in pixels.

Where options is an object with the following property:

-   startingX: it is the value of the starting x-cordinate (default 10)
-   startingY: it is the value of the starting y-cordinate (default 10)
-   fillColor: they are four spaced seperated numbers representing the RGBA values of fill-color (default "100 100 100 255")
-   tolerance: it is the % tolerance (default 10)

*(does this work, all images seem the same)*

Usage:

    sequencer.loadImage('PATH')
    .addSteps('paint-bucket',options)
    .run()
    
### Resize-module:
This module is used for resizing an image.

Where options is an object with the following property:

-   resize: Percentage value of resize (default 125%)


![resize](https://lh3.googleusercontent.com/mP8-lKFTCuHRH0JA5wLdLP3jB3_nTNWqec5WlvJCpcq6-TaL6mGPLegzFr-mK0q7aIjMsG7HZZlA)


*(is this off by 100?)*
Resize-canvas:


![resize](https://lh3.googleusercontent.com/L0BHuRJlGFq30teGNx_alnSs-qHar56Sl13mcT5cHmSKCiuETMskklhqOjDRmlVLIorYozmZSNYy)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('resize',options)
    .run()
    
### ReplaceColor-module:
This module is used in replacing the color with grey or any desired color.

Where options is an object with the following properties:
-   replaceMethod: replaces with the desired color (default greyscale)
-   replaceColor: three space separated numbers representing the RGB values of color to be filled (default "0 0 255")
-   color: three space separated numbers representing the RGB values of color to be replaced (default "228 86 81")
-   tolerance: it is the % tolerance (default 50)


![replacec](https://lh3.googleusercontent.com/wGzhtzvP4mUgnh3P1NDNGW32gEyBEZDhikJRVViWtY7lgoDa7QNF3oBaLwPihNqSXb0wf_jVaytU)



Usage

    sequencer.loadImage('PATH')
    .addSteps('replace-color',options)
    .run()
    
### Rotate-module:
This module is used for rotating an image.

Where options is an object with the following property:
-   rotate: angular value for rotation in degrees (between 0 and 360; default 0)


![rotate](https://lh3.googleusercontent.com/cF2yIQzbKl5sQ-6hQXEPIqC2emjNIxJiGG2zWIbvQubz_jOzHtposT94miMC0gb_yLmgcbJnQhjY)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('rotate',options)
    .run()
    
### Saturation-module:
This module is used for changing the saturation of the image.  The saturation slider changes  the intensity of colors, ranging from black/white (no saturation) to grayish colors to bright, vivid colors (full saturation).

Where options is an object with the following property:

-   Saturation: Saturation for the new image (between 0 and 2; default 0).


![satur](https://lh3.googleusercontent.com/IDJa8F1hE9SlhNO9smcXAHzM9iq-2vTmxPhAfMNin2My28s9N4DKGf9nhVkHi4hZziWx3eOGeaeY)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('saturation',options)
    .run()
    
### Text-overlay:


![text](https://lh3.googleusercontent.com/3U2Qo9DP3a9-_57MBpYubxpwwy3jjCaK7EBITxB3FjoZwiovNKVfT8mDYPuwbQW6c8MJ4ED2jI58)


### Threshold:
[Thresholding](https://en.wikipedia.org/wiki/Thresholding) is used to create binary images based on the threshold value. 

Where options is an object with the following property:
-   threshold: it allows to select the types of thresholding (default "manual thresholding")
-   input: it allows to select the range of thresholding value (default 120)


![threash](https://lh3.googleusercontent.com/pG65GyAYLktF--riUv6PJoe7ogDGHx7WlxVXQWUCt3qFgQ2CJJ7908wbSG3YGSOBz943Sci_dPOS)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('threshold',options)
    .run()
    
### Tint:
Tint module adds/adjust image color. 

   Where options is an object with the following property:
-   color: RGB values separated by a space (default "0 0 255")
-   factor: amount of tint (default 0.5)


![tint](https://lh3.googleusercontent.com/UkjU82j-zFgCGdlp5I5mICHGvBvME3QLQPJIlBSPxlu0617gKPs-eSIzX2aOGNQXvJu4kmrObQvP)


Usage:

    sequencer.loadImage('PATH')
    .addSteps('tint',options)
    .run()

### WebGI Distort: 
Transform perspective of an image based on corner coordinates.


![enter image description here](https://lh3.googleusercontent.com/g78LcI4K__lbobXwZIh10mVTFsYUB1tGqNMdYISShJhO3Y95VGjIrLKKJ2bd5LXQTMXbE86o8_cj)


### White Balance:
White or [color balance](https://en.wikipedia.org/wiki/Color_balance) adjusts image color.  

![white](https://lh3.googleusercontent.com/1HqpzxNX3FdGzS52f3mbTodzA8HnKv6TuSdii-aHgdiQ-YUT677g9Q-Nr71OGYZVwNfs0KzeML6l)


## Applications:
This section demonstrates how Image Sequencer modules can be applied for different applications.


### NDVI: 
This [youtube tutorial](https://www.youtube.com/watch?v=RHaiVjPPvMc) shows how to use Image Sequencer (https://publiclab.org/image-sequencer) to take two DIY multispectral images (one infrared, one visible light) and composite them into an NDVI image (https://publiclab.org/ndvi)
### NDVI (NIR and Red) with Color Bar:
The Image Sequence processing steps used to process NDVI images are shown below. Steps include: 1) Choose file #1 (NIR image), 2)Choose file #2 (Red band image), 3)blend, 4) NDVI (red), 5) Colormap (greyscale). 


![ndviapp](https://lh3.googleusercontent.com/vSPttpkGXDBja4qcU5Y_mmZujhuItbTP_1hoqxbNuqXn5dG2cX7j4RiOrdQJSFDlcxFOswOgh3jI)



## References:
-Image sequencer Github Readme https://github.com/publiclab/image-sequencer/blob/main/README.md  
-Prior design concepts https://publiclab.org/notes/ccpandhare/03-18-2017/developing-image-sequencer-as-a-library

## Sponsors:
-[AREN project at NASA](https://science.nasa.gov/science-activation-team/resa)  
-Google Summer of Code

module.exports = function Sketch(pixels, options) {
    var thisSketcher = options;
    options.width = pixels.shape[0];
	options.height = pixels.shape[1];
	options.levelSteps = 2;
	options.textureCanvases = null;
    options.textureImageDatas = null;
    
    options.lineThickness = 1;
	options.maxTextures = NaN;
	options.lineLength = Math.sqrt(width*height)*0.2;
	options.darkeningFactor = 0.1;
	options.lineAlpha = 0.1;
    options.lineDensity = 0.5;
    
    options.lightness = 4;
		
	options.edgeBlurAmount = 4;
    options.edgeAmount = 0.5;
    
    options.preparationFunctions = [];
	var totalPrepFunctions = 1;
	var startedInit = false;
    options.requiredColours = null;
    var whenReadyFunctions = [];
    options.whenReady = function (callback) {
        if (!startedInit) {
            createTextures();
            totalPrepFunctions = options.preparationFunctions.length;
            startedInit = true;
            var intervalKey = window.setInterval(function () {
                if (thisSketcher.preparationFunctions.length == 0) {
                    window.clearInterval(intervalKey);
                    while (whenReadyFunctions.length > 0) {
                        whenReadyFunctions.shift()();
                    }
                    thisSketcher.whenReady = function (callback) {
                        callback();
                    };
                    thisSketcher.progressUpdate = function () {};
                    thisSketcher.progressUpdateFunctions = null;
                } else {
                    var message = thisSketcher.preparationFunctions.shift()();
                    var proportion = 1 - thisSketcher.preparationFunctions.length/totalPrepFunctions;
                    // thisSketcher.sendProgressUpdate(proportion, message);
                }
            }, 10);
        }
        whenReadyFunctions.push(callback);
        return options;
    };

    function transformCanvas(canvas, greyscale) {
        var width = pixels.shape[0];
        var height = pixels.shape[1];
        // var pixels = pixels
        var pixelCodes = {};
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var index = (x + y*width)*4;
                var pixelCode = pixels.get(x, y, 0) + ":" + pixels.get(x, y, 1) + ":" + pixels.get(x, y, 0);
                pixelCodes[pixelCode] = true;
            }
        }    
        while (true) {
            options.requiredColours = {};
            for (var key in pixelCodes) {
                var parts = key.split(":");
                var red = parseInt(parts[0]);
                var green = parseInt(parts[1]);
                var blue = parseInt(parts[2]);
                var redIndex = Math.round(red/255*(options.levelSteps - 1));
                var greenIndex = Math.round(green/255*(options.levelSteps - 1));
                var blueIndex = Math.round(blue/255*(options.levelSteps - 1));
                for (var ri = -1; ri <= 1; ri++) {
                    for (var gi = -1; gi <= 1; gi++) {
                        for (var bi = -1; bi <= 1; bi++) {
                            var key = (redIndex + ri) + ":" + (greenIndex + gi) + ":" + (blueIndex + bi);
                            options.requiredColours[key] = true;
                        }
                    }
                }
            }
            // console.log(Object.keys(this.requiredColours).length + " required colour levels");
            if (Object.keys(options.requiredColours).length > options.maxTextures && options.levelSteps > 2) {
                options.levelSteps--;
                // console.log("Reducing to " + this.levelSteps + " RGB steps");
                continue;
            }
            break;
        }


    function transformCanvasInner(canvas, greyscale) {
        var width = pixels.shape[0];
        var height = pixels.shape[1];
        var edges = [];
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var index = x + y*width;
                edges[index*3] = pixels.get(x, y, 0);
                edges[index*3 + 1] = pixels.get(x, y, 1);
                edges[index*3 + 2] = pixels.get(x, y, 2);
            }
        }
        var edges = calculateStandardDeviation(edges, options.edgeBlurAmount);
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var index = x + y*width;
                var red = pixels.get(x, y, 0);
                var green = pixels.get(x, y, 2);
                var blue = pixels.get(x, y, 2);
                var rgb = getPixel(index, red, green, blue);
                if (greyscale) {
                    var value = Math.round((rgb.red + rgb.green + rgb.blue)/3);
                    rgb.red = rgb.green = rgb.blue = value;
                }
                var edgeFactor = Math.max(0, (255 - edges[x + y*width]*options.edgeAmount)/255);
                var edgeFactor = Math.min(1, Math.max(0.5, edgeFactor*edgeFactor));
                pixels.set(x, y, 0, Math.round(rgb.red*edgeFactor));
                pixels.set(x, y, 1, Math.round(rgb.green*edgeFactor));
                pixels.set(x, y, 2, Math.round(rgb.blue*edgeFactor));
            }
        }
    }

    function calculateStandardDeviation(inputRgb, blurAmount) {
        var width = pixels.shape[0];
        var height = pixels.shape[1];
        var vsum = [];
        var vsum2 = [];
        for (var x = 0; x < width; x++) {
            var totals = [0, 0, 0];
            var totals2 = [0, 0, 0];
            for (var y = 0; y < height; y++) {
                var index = x + y*width;
                totals[0] += inputRgb[index*3 + 0];
                totals[1] += inputRgb[index*3 + 1];
                totals[2] += inputRgb[index*3 + 2];
                totals2[0] += inputRgb[index*3 + 0]*inputRgb[index*3 + 0];
                totals2[1] += inputRgb[index*3 + 1]*inputRgb[index*3 + 1];
                totals2[2] += inputRgb[index*3 + 2]*inputRgb[index*3 + 2];
                vsum[index] = totals.slice(0);
                vsum2[index] = totals2.slice(0);
            }
        }
        var hsum = [];
        var hsum2 = [];
        for (var y = 0; y < height; y++) {
            var totals = [0, 0, 0];
            var totals2 = [0, 0, 0];
            for (var x = 0; x < width; x++) {
                var index = x + y*width;
                var startIndex = x + Math.max(0, Math.round(y - blurAmount/2))*width;
                var endIndex = x + Math.min(height - 1, Math.round(y + blurAmount/2))*width;
                totals[0] += (vsum[endIndex][0] - vsum[startIndex][0])/(endIndex - startIndex)*width;
                totals[1] += (vsum[endIndex][1] - vsum[startIndex][1])/(endIndex - startIndex)*width;
                totals[2] += (vsum[endIndex][2] - vsum[startIndex][2])/(endIndex - startIndex)*width;
                totals2[0] += (vsum2[endIndex][0] - vsum2[startIndex][0])/(endIndex - startIndex)*width;
                totals2[1] += (vsum2[endIndex][1] - vsum2[startIndex][1])/(endIndex - startIndex)*width;
                totals2[2] += (vsum2[endIndex][2] - vsum2[startIndex][2])/(endIndex - startIndex)*width;
                hsum[index] = totals.slice(0);
                hsum2[index] = totals2.slice(0);
            }
        }
        var sd = [];
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                var index = x + y*width;
                var startIndex = Math.max(0, Math.round(x - blurAmount/2)) + y*width;
                var endIndex = Math.min(width - 1, Math.round(x + blurAmount/2)) + y*width;
                var avgR = (hsum[endIndex][0] - hsum[startIndex][0])/(endIndex - startIndex);
                var avgG = (hsum[endIndex][1] - hsum[startIndex][1])/(endIndex - startIndex);
                var avgB = (hsum[endIndex][2] - hsum[startIndex][2])/(endIndex - startIndex);
                var avgR2 = (hsum2[endIndex][0] - hsum2[startIndex][0])/(endIndex - startIndex);
                var avgG2 = (hsum2[endIndex][1] - hsum2[startIndex][1])/(endIndex - startIndex);
                var avgB2 = (hsum2[endIndex][2] - hsum2[startIndex][2])/(endIndex - startIndex);
                sd[index] = Math.sqrt((avgR2 + avgG2 + avgB2) - (avgR*avgR + avgG*avgG + avgB*avgB));
                if (isNaN(sd[index])) {
                    sd[index] = 0;
                }
            }
        }
        return sd;
    }

    function createTextures(){
        var width = pixels.shape[0];
        var height = pixels.shape[1];
        var steps = options.levelSteps;
        var canvases = options.textureCanvases = [];
        var imageDatas = options.textureImageDatas = [];

        var thickness = options.lineThickness;
        var length = options.lineLength;
        var darkeningFactor = 1 - options.darkeningFactor;
        var alpha = options.lineAlpha;
        var densityFactor = options.lineDensity*2;
        var lightness = options.lightness;
        for (var ri = -1; ri <= steps; ri++) {
            canvases[ri] = {};
            imageDatas[ri] = {};
            for (var gi = -1; gi <= steps; gi++) {
                canvases[ri][gi] = {};
                imageDatas[ri][gi] = {};
            }
        }
        for (var key in options.requiredColours) {
            var parts = key.split(":");
            var ri = parseInt(parts[0]);
            var gi = parseInt(parts[1]);
            var bi = parseInt(parts[2]);
            var red = 255*ri/(steps - 1);
            var green = 255*gi/(steps - 1);
            var blue = 255*bi/(steps - 1);
            var value = (red + green + blue)/3/255;
            red = Math.min(255, Math.max(0, red));
            green = Math.min(255, Math.max(0, green));
            blue = Math.min(255, Math.max(0, blue));
            
            var minimum = 1 - Math.min(red, green, blue)/255;
            if (minimum > 0) {
                var scaling = Math.pow(1/minimum, 1.0/lightness);
                var displayRed = Math.round((255 - (255 - red)*scaling)*darkeningFactor);
                var displayGreen = Math.round((255 - (255 - green)*scaling)*darkeningFactor);
                var displayBlue = Math.round((255 - (255 - blue)*scaling)*darkeningFactor);
                var colour = "rgb("+displayRed+","+displayGreen+","+displayBlue+")";
            } else {
                var displayRed = Math.round(red*darkeningFactor);
                var displayGreen = Math.round(green*darkeningFactor);
                var displayBlue = Math.round(blue*darkeningFactor);
                var colour = "rgb("+displayRed+","+displayGreen+","+displayBlue+")";
            }
            
            if (Math.abs(green - blue) > 0.1 || Math.abs(2*red - green - blue) > 0.1) {
                var hue = Math.atan2(Math.sqrt(3)*(green - blue) , 2*red - green - blue);
                var maxRgb = Math.max(255 - red, 255 - green, 255 - blue);
                var minRgb = Math.min(255 - red, 255 - green, 255 - blue)
                var saturation = (maxRgb - minRgb)/maxRgb;
                if (saturation == 0) {
                    hue = Math.random()*Math.PI*2;
                }
            } else {
                var hue = 0;
                var saturation = 0;
            }
            
            (function (ri, gi, bi, hue, saturation, thickness, length, minimum, colour, alpha, densityFactor) {
                thisSketcher.preparationFunctions.push(function () {
                    var angleVariation = Math.PI*(0.1 + 0.9*Math.pow(1 - saturation, 3));
                    var canvas = directionalStrokes(width, height, hue/2 + Math.PI*0.3, angleVariation, thickness, length, minimum*densityFactor, colour, alpha);
                    canvases[ri][gi][bi] = canvas;
                    imageDatas[ri][gi][bi] = canvas.getContext("2d").getImageData(0, 0, width, height);
                    return [ri, gi, bi].join(":");
                });
            })(ri, gi, bi, hue, saturation, thickness, length, minimum, colour, alpha, densityFactor);
        }
    }

    function getPixel(pixelIndex, r, g, b) {
        var imageDatas = options.textureImageDatas;
        pixelIndex *= 4;
        var redIndex = r/255*(options.levelSteps - 1);
        var greenIndex = g/255*(options.levelSteps - 1);
        var blueIndex = b/255*(options.levelSteps - 1);
        
        var redBlend = redIndex;
        var greenBlend = greenIndex;
        var blueBlend = blueIndex;
        redIndex = Math.round(redIndex);
        greenIndex = Math.round(greenIndex);
        blueIndex = Math.round(blueIndex);
        var blendTotal = 0;
        for (var ri = -1; ri <= 1; ri++) {
            for (var gi = -1; gi <= 1; gi++) {
                for (var bi = -1; bi <= 1; bi++) {
                    var blend = (0.75 - Math.abs(redIndex + ri - redBlend)/2)
                            *(0.75 - Math.abs(greenIndex + gi - greenBlend)/2)
                            *(0.75 - Math.abs(blueIndex + bi - blueBlend)/2);
                    if (blend < 0) {
                        throw new Error("debug");
                    }
                    blendTotal += blend;
                }
            }
        }
        var red = 0;
        var green = 0;
        var blue = 0;
        for (var ri = -1; ri <= 1; ri++) {
            for (var gi = -1; gi <= 1; gi++) {
                for (var bi = -1; bi <= 1; bi++) {
                    var blend = (0.75 - Math.abs(redIndex + ri - redBlend)/2)
                            *(0.75 - Math.abs(greenIndex + gi - greenBlend)/2)
                            *(0.75 - Math.abs(blueIndex + bi - blueBlend)/2);
                    blend /= blendTotal
                    
                    var imageData = imageDatas[redIndex + ri][greenIndex + gi][blueIndex + bi];
                    if (imageData == undefined) {
                        throw new Error("debug me!");
                    }
                    red += imageData.data[pixelIndex]*blend;
                    green += imageData.data[pixelIndex + 1]*blend;
                    blue += imageData.data[pixelIndex + 2]*blend;
                }
            }
        }
        var brighteningFactor = 1 - (1 - (options.levelSteps + 1)/options.levelSteps)*0.25;
        return {
            red: Math.min(255, Math.round(red*brighteningFactor)),
            green: Math.min(255, Math.round(green*brighteningFactor)),
            blue: Math.min(255, Math.round(blue*brighteningFactor))
        };
    }
    
Image Sequencer
====


[![Build Status](https://travis-ci.org/publiclab/image-sequencer.svg?branch=master)](https://travis-ci.org/publiclab/image-sequencer) [![Maintainability](https://api.codeclimate.com/v1/badges/5906996dd2e90aca6398/maintainability)](https://codeclimate.com/github/publiclab/image-sequencer/maintainability) [![Codecov](https://img.shields.io/codecov/c/github/publiclab/image-sequencer.svg?logo=codecov)](https://codecov.io/gh/publiclab/image-sequencer)

- **Latest Stable Demo**: https://sequencer.publiclab.org
- **Latest Beta Demo**: https://beta.sequencer.publiclab.org
- **Stable Branch**: https://github.com/publiclab/image-sequencer/tree/stable/

## Why

Image Sequencer is different from other image processing systems because it's _non-destructive_: instead of modifying the original image, it **creates a new image at each step in a sequence**. This is because it:

* produces a legible trail of operations, to "show your work" for evidential, educational, or reproducibility reasons
* makes the creation of new tools or "modules" simpler -- each must accept an input image, and produce an output image
* allows many images to run through the same sequence of steps
* works identically in the browser, on Node.js, and on the command line

The following diagrams attempt to explain how the applications various components interconnect:

![general diagram](https://publiclab.org/i/30547.png?s=o)

![workflow diagram](https://raw.githubusercontent.com/publiclab/image-sequencer/main/examples/images/diagram-workflows.png)

It also for prototypes other related ideas:

* filter-like image processing -- apply a transform to an image from a given source, like a proxy. I.e. [every image tile of a satellite imagery web map](https://publiclab.org/notes/warren/05-10-2018/prototype-filter-map-tiles-in-real-time-in-a-browser-with-imagesequencer-ndvi-landsat)
* test-based image processing -- the ability to create a sequence of steps that do the same task as other image processing tools, provable with example before/after images to compare with
* logging each step -- to produce an evidentiary record of modifications to an original image
* cascading changes -- change an earlier step's settings, and see those changes affect later steps
* "small modules" -- based extensibility: see [Contributing](https://github.com/publiclab/image-sequencer/blob/main/CONTRIBUTING.md)


## Examples

* [Simple Demo](https://sequencer.publiclab.org)
* [Latest Beta Demo](https://beta.sequencer.publiclab.org)

A diagram of this running 5 steps on a single sample image may help explain how it works:

![example workflow](https://raw.githubusercontent.com/publiclab/image-sequencer/main/examples/images/diagram-6-steps.png)

## Jump to:

* [Installation](#installation)
* [Quick Usage](#quick-usage)
* [CLI Usage](#cli-usage)
* [Classic Usage](#classic-usage)
* [Method Chaining](#method-chaining)
* [Multiple Images](#multiple-images)
* [Creating a User Interface](#creating-a-user-interface)
* [Contributing](https://github.com/publiclab/image-sequencer/blob/main/CONTRIBUTING.md)
* [Submit a Module](https://github.com/publiclab/image-sequencer/blob/main/CONTRIBUTING.md#contributing-modules)
* [Get Demo Bookmarklet](https://publiclab.org/w/imagesequencerbookmarklet)

## Installation

This library conveniently works in the browser, in Node, and on the command line (CLI).

### Unix based platforms
You can set up a local environment to test the UI with `sudo npm run setup` followed by `npm start`.

### Windows
Our npm scripts do not support windows shells, please run the following snippet in PowerShell.
```powershell
npm i ; npm i -g grunt grunt-cli ; grunt build; grunt serve
```
In case of a port conflict please run the following
```powershell
npm i -g http-server ; http-server -p 3000
```

### Browser

Just include [image-sequencer.min.js](https://github.com/publiclab/image-sequencer/blob/stable/dist/image-sequencer.min.js) in the Head section of your web page. See the [demo here](https://sequencer.publiclab.org)!

### Node (via NPM)

(You must have NPM for this)
Add `image-sequencer` to your list of dependencies and run `npm install`

### CLI

Globally install Image Sequencer:

```
$ npm install image-sequencer -g
```

(You should have Node.JS and NPM for this.)

### To run the debug script

```
$ npm run debug invert
```

## Quick Usage

### Initializing the Sequencer

The Image Sequencer Library exports a function ImageSequencer which initializes a sequencer.

```js
var sequencer = ImageSequencer();
```

Image Sequencer can be used to run modules on an HTML Image Element using the
`replaceImage` method, which accepts two parameters - `selector` and `steps`.
`selector` is a CSS selector. If it matches multiple images, all images will be
modified. `steps` may be the name of a module or array of names of modules.

Note: Browser CORS Restrictions apply. Some browsers may not allow local images
from other folders, and throw a Security Error instead.

```js
sequencer.replaceImage(selector,steps,optional_options);
```

`optional_options` allows passing additional arguments to the module itself.

For example:

```js
sequencer.replaceImage('#photo','invert');
sequencer.replaceImage('#photo',['invert','ndvi-red']);
```

### Data URL usage

Since Image Sequencer uses data-urls, you can initiate a new sequence by providing an image in the [data URL format](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs), which will import into the demo and run:

[Try this example link with a very small Data URL](http://sequencer.publiclab.org/examples/#src=data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABykX//Z&steps=invert{})

To produce a data URL from an HTML image, see [this nice blog post with example code](https://davidwalsh.name/convert-image-data-uri-javascript).

## CLI Usage

Image Sequencer also provides a CLI for applying operations to local files. The CLI takes the following arguments:

    -i  | --image [PATH/URL] | Input image URL. (required)
    -s  | --step [step-name] | Name of the step to be added. (required)
    -b  | --basic            | Basic mode only outputs the final image
    -o  | --output [PATH]    | Directory where output will be stored. (optional)
    -c  | --config {object} | Options for the step. (optional)
    --save-sequence [string] | Name space separated with Stringified sequence to save
    --install-module [string] | Module name space seaprated npm package name

The basic format for using the CLI is as follows:

```
$ ./index.js -i [PATH] -s step-name
```

*NOTE:* On Windows you'll have to use `node index.js` instead of `./index.js`.

The CLI also can take multiple steps at once, like so:

```
$ ./index.js -i [PATH] -s "step-name-1 step-name-2 ..."
```

But for this, double quotes must wrap the space-separated steps.

Options for the steps can be passed in one line as JSON in the details option like
```
$ ./index.js -i [PATH] -s "brightness" -c '{"brightness":50}'

```
Or the values can be given through the terminal prompt like

<img width="1436" alt="screen shot 2018-02-14 at 5 18 50 pm" src="https://user-images.githubusercontent.com/25617855/36202790-3c6e8204-11ab-11e8-9e17-7f3387ab0158.png">

`save-sequence` option can be used to save a sequence and the associated options for later usage. You should provide a string which contains a name of the sequence space separated from the sequence of steps which constitute it.
```shell
sequencer --save-sequence "invert-colormap invert(),colormap()"
```

`install-module` option can be used to install new modules from npm. You can register this module in your sequencer with a custom namespace separated with the npm package name. Below is an example of the `image-sequencer-invert` module.
```shell
sequencer --install-module "invert image-sequencer-invert"
```

The CLI is also chainable with other commands using `&&`

```
sequencer -i <Image Path> -s <steps> && mv <Output Image Path> <New path>
```

## Classic Usage

### Initializing the Sequencer

The Image Sequencer Library exports a function ImageSequencer which initializes a sequencer.

```js
var sequencer = ImageSequencer();
```

### Loading an Image into the Sequencer

The `loadImage` method is used to load an image into the sequencer. It accepts
an image `src`, either a URL or a data-url. The method also accepts an optional callback.

```js
sequencer.loadImage(image_src, optional_callback);
```

On `Node.js` the `image_src` may be a DataURI or a local path or a URL.

On browsers, it may be a DatURI, a local image or a URL (Unless this violates
CORS Restrictions). To sum up, these are accepted:

* Images in the same domain (or directory - for a local implementation)
* CORS-Proof images in another domain.
* DataURLs

return value: **none** (A callback should be used to ensure the image gets loaded)
The callback is called within the scope of a sequencer. For example:
(addSteps is defined later)

```js
sequencer.loadImage('SRC', function(){
  this.addSteps('module-name');
});
```

The `this` refers to all the images added in the parent `loadImages` function only.
In this case, only `'SRC'`.

### Adding steps to the image

The `addSteps` method is used to add steps to the image. One or more steps can
be added at a time. Each step is called a module.

```js
sequencer.addSteps(modules, optional_options);
```

If only one module is to be added, `modules` is simply the name of the module.
If multiple images are to be added, `modules` is an array, which holds the names of modules
to be added, in that particular order.

optional_otions is just an optional parameter, in object form, which you might
want to provide to the modules.

A variety of syntaxes are supported by Image Sequencer to add multiple steps and configurations quickly for module chaining. The project supports the string syntax, designed to be compact and URL friendly, and JSON, for handling more complex sequences. This can be achieved by passing strings to `sequencer.addStep()`:


```js
sequencer.addSteps('invert,channel');
sequencer.addSteps(['invert','channel']);
```

For passing default configurations ({} is optional):

```js
sequencer.addSteps('brightness{}');
```

For passing custom configurations:

```js
sequencer.addSteps('brightness{brightness:80}');
```

For passing multiple custom configurations:

```js
sequencer.addSteps('crop{x:120|y:90}')
```

For passing multiple custom configurable modules:

```js
sequencer.addSteps('crop{x:130|y:80},brightness{brightness:80}')
```

return value: **`sequencer`** (To allow method chaining)


### Running the Sequencer

Once all steps are added, This method is used to generate the output of all these
modules.

```js
sequencer.run();
```

Sequencer can be run with a custom config object

```js
// The config object enables custom progress bars in a node environment and
// ability to run the sequencer from a particular index(of the steps array)

sequencer.run(config);

```

The config object can have the following keys

```js
config: {
  progressObj: , //A custom object to handle progress bar
  index: //Index to run the sequencer from (defaults to 0)
}
```

Additionally, an optional callback function can be passed to this method.

```js
sequencer.run(function callback(out){
  // this gets called back.
  // "out" is the DataURL of the final image.
});
sequencer.run(config,function callback(out){
  // the callback is supported by all types of invocations
});
```

return value: **`sequencer`** (To allow method chaining)


### Removing a step from the sequencer

The `removeSteps` method is used to remove unwanted steps from the sequencer.
It accepts the index of the step as an input or an array of the unwanted indices,
if there are more than one.

For example, if the modules ['ndvi-red','crop','invert'] were added in this order,
and I wanted to remove 'crop' and 'invert', I can either do this:
```js
sequencer.removeSteps(2);
sequencer.removeSteps(3);
```
or:
```js
sequencer.removeSteps([2,3]);
```

return value: **`sequencer`** (To allow method chaining)


### Inserting a step in between the sequencer

The `insertSteps` method can be used to insert one or more steps at a given index
in the sequencer. It accepts the index where the module is to be inserted, the name of
the module, and an optional options parameter. `index` is the index of the inserted
step. Only one step can be inserted at a time. `optional_options` plays the same
role it played in `addSteps`.

Indexes can be negative. Negative sign with an index means that counting will be
done in reverse order. If the index is out of bounds, the counting will wrap in
the original direction of counting. So, an `index` of -1 means the module is
inserted at the end.

```js
sequencer.insertSteps(index,module_name,optional_options);
```

return value: **`sequencer`** (To allow method chaining)

### Importing an independent module

The `loadNewModule` method can be used to import a new module inside the sequencer. Modules can be downloaded via npm, yarn or CDN and are imported with a custom name. If you wish to load a new module at runtime, it will need to avoid using `require()` -- unless it is compiled with a system like browserify or webpack.

```js
const module = require('sequencer-moduleName')
sequencer.loadNewModule('moduleName',module);
```


## Method Chaining

Methods can be chained on the Image Sequencer:
* loadImage()/loadImages() can only terminate a chain.
* run() can not be in the middle of the chain.
* If the chain starts with loadImage() or loadImages(), the following methods are
applied only to the newly loaded images.


Valid Chains:
```js
sequencer.loadImage(function(){
  this.addSteps('invert').run(function(out){
    //do something with ouptut.
  });
})
sequencer.addSteps(['ndvi-red','invert']).run();
et cetra.
```

Invalid Chains:
```js
sequencer.addSteps('invert').run().addSteps('ndvi-red');
```



## Fetching current steps

The `getSteps` method can be used to get the array of current steps in `this` instance of sequencer.For example

```js
sequencer.getSteps()
```

returns an array of steps associated with the current sequencer.

## Saving Sequences

IMAGE SEQUENCER supports saving a sequence of modules and their associated settings in a simple string syntax. These sequences can be saved in the local storage of the browser and inside a JSON file in node.js. sequences can be saved in node context using the CLI option

```shell
--save-sequence "name stringified-sequence"
```

In Node and the browser the following function can be used
```js
sequencer.saveSequence(name,sequenceString)
```

The function `sequencer.loadModules()` reloads the modules and the saved sequences into `sequencer.modules` and `sequencer.sequences`


## String syntax

Image sequencer supports stringifying a sequence which is appended to the url and hence can then be shared. An example below shows the string syntax for `channel` and `invert` module
```
channel{channel:green},invert{}
```

The use of `()` in place of `{}` for backward compatibility with older links is now **deprecated**. (There is no longer support for the following syntax, and should be avoided)
```
channel(channel:green),invert()
```

Following are the core API functions that can be used to stringify and jsonify steps.
```js
sequencer.toString() //returns the stringified sequence of current steps
sequencer.toJSON(str) // returns the JSON for the current sequence
sequencer.stringToJSON(str) // returns the JSON for given stringified sequence
sequencer.importString(str) //Imports the sequence of steps into sequencer
sequencer.importJSON(obj) //Imports the given sequence of JSON steps into sequencer
```

Image Sequencer can also generate a string for usage in the CLI for the current sequence of steps:
```js
sequencer.toCliString()
```


## Importing steps using JSON array

Image sequencer provides the following core API function to import the given sequence of JSON steps into sequencer.

```js
sequencer.importJSON(obj)
```
It can be implemented the following way for example:

```js
sequencer.importJSON([
    { name: 'blur', options: {} }
  ]);
  ```
  where name is the name of step to be added, options object can be the one used to provide various params to the sequencer which can customise the default ones.

To see this in action, please refer to line # 51 of the following:

[test/core/modules/import-export.js](https://github.com/publiclab/image-sequencer/blob/main/test/core/modules/import-export.js)



## Creating a User Interface

Image Sequencer provides the following events which can be used to generate a UI:

* `onSetup` : this event is triggered when a new module is set up. This can be used,
for instance, to generate a DIV element to store the generated image for that step.
* `onDraw` : This event is triggered when Image Sequencer starts drawing the output
for a module. This can be used, for instance, to overlay a loading GIF over the DIV
generated above.
* `onComplete` : This event is triggered when Image Sequencer has drawn the output
for a module. This can be used, for instance, to update the DIV with the new image
and remove the loading GIF generated above.
* `onRemove` : This event is triggered when a module is removed. This can be used,
for instance, to remove the DIV generated above.
* `notify` : This event is triggered whenever we need to shoot a notification to the
user-interface.For example when the step is not available, we can shoot a notification,
by sending appropriate message.For HTML UI it adds a DOM node to the browser, for CLI
and node , it logs the notification output to the respective console.

How to define these functions:

```js
sequencer.setUI({
  onSetup: function(step) {},
  onDraw: function(step) {},
  onComplete: function(step) {},
  onRemove: function(step) {},
  notify: function(msg,id) {}
});
```

These methods can be defined and re-defined at any time, but it is advisable to
set them before any module is added and not change it thereafter. This is because
the `setUI` method will only affect the modules added after `setUI` is called.

The `onComplete` event is passed on the output of the module.

Image Sequencer provides a namespace `step` for the purpose of UI Creation in
the scope of these definable function. This namespace has the following
predefined properties:

* `step.name` : (String) Name of the step
* `step.ID` : (Number) An ID given to every step of the sequencer, unique throughout.
* `step.imageName` : (String) Name of the image the step is applied to.
* `step.output` : (DataURL String) Output of the step.
* `step.inBrowser` : (Boolean) Whether the client is a browser or not

In addition to these, one might define their own properties, which shall be
accessible across all the event scopes of that step.

For example :

```js
sequencer.setUI({
  onSetup: function(step){
    // Create new property "step.image"
    step.image = document.createElement('img');
    document.body.append(step.image);
  },
  onComplete: function(step){
    // Access predefined "step.output" and user-defined "step.image"
    step.image.src = step.output;
  },
  onRemove: function(step){
    // Access user-defined "step.image"
    step.image.remove();
  }
});
```

## Using multiple images on same sequencer:

Image Sequencer object supports one imageURL at a time.

Adding a seccond image to same sequencer will result to adding same set of steps added to prior image and flushing out the previous one.

```js
s1 = new ImageSequencer(...);
s1.loadImage(url1);
s1.addSteps('blur');
s1.run();
s1.addImage(url2);
s1.run();
```
However if we want to use more than one image, we can either initialize a sequencer for each image like:

```js
sequencer1 = new ImageSequencer(...);
sequencer1.loadImage(...);
sequencer1.addSteps(steps);
sequencer1.run();

sequencer2 = new ImageSequencer(...);
sequencer2.loadImage(...);
sequencer2.addSteps(steps);
sequencer2.run();
```



**Note**: Details of all modules can be sought using `sequencer.modulesInfo()`.
This method returns an object which defines the name and inputs of the modules. If a module name (hyphenated) is passed in the method, then only the details of that module are returned.

The `notify` function takes two parameters `msg` and `id`, former being the message to be displayed on console (in case of CLI and node ) and a HTML component(in browser). The id is optional and is useful for HTML interface to give appropriate IDs.

## Using WebAssembly for heavy pixel processing

Any module which uses the `changePixel` function gets WebAssembly acceleration (`wasm`). Both node and browser code use WebAssembly and the only code which falls back to non-`wasm` code is the [browserified unit tests](https://github.com/publiclab/image-sequencer/blob/main/test/core/sequencer/benchmark.js).

The main advantage we get using `wasm` is blazing fast speed attained in processing pixels for many modules that is very clear from [checking module benchmarks](https://travis-ci.org/publiclab/image-sequencer/jobs/544415673#L1931).


The only limitation is that browser and node code for `wasm` had to be written separately, and switched between. This is because in browser we use `fetch` to retrieve the compiled `wasm` program while in node we use the `fs` module, each of which cannot be used in the other's environment.


`wasm` mode is enabled by default. If you need to force this mode to be on or off, you can use the `useWasm` option when initializing ImageSequencer:

```js
let sequencer = ImageSequencer({useWasm:true}) // for wasm mode or simply

let sequencer = ImageSequencer() // also for wasm mode i.e. default mode

let sequencer = ImageSequencer({useWasm:false}) //for non-wasm mode 

```
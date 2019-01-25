Contributing to Image Sequencer
===

Happily accepting pull requests; to edit the core library, modify files in `./src/`. To build, run `npm install` followed by `grunt build`.

Most contribution (we imagine) would be in the form of API-compatible modules, which need not be directly included.

## Jump To

* [README.md](https://github.com/publiclab/image-sequencer)
* [Contributing Modules](#contributing-modules)
* [Info File](#info-file)
* [Ideas](#Contribution-ideas)

****

## Contribution-ideas

See [this issue](https://github.com/publiclab/image-sequencer/issues/118) for a range of ideas for new contributions and links to possibly helpful libraries, or you can solve an [existing issue](https://github.com/publiclab/image-sequencer/labels/module). Also see the [new features issues list](https://github.com/publiclab/image-sequencer/labels/new-feature).

### Bugs

If you find a bug please list it here, and help us develop Image Sequencer by [opening an issue](https://github.com/publiclab/image-sequencer/issues/new)!

****

## Contributing modules

Most contributions can happen in modules, rather than to core library code. Modules and their [corresponding info files](#info-file) are included into the library in this file: https://github.com/publiclab/image-sequencer/blob/master/src/Modules.js#L5-L7

Module names, descriptions, and parameters are set in the `info.json` file -- [see below](#info-file).

Any module must follow this basic format:

```js
module.exports = function ModuleName(options,UI) {

  var output;
  // Module requirements have been simplified in version 3, see https://github.com/publiclab/image-sequencer/blob/master/CONTRIBUTING.md#contributing-modules

  function draw(input,callback) {

    var output = function(input){
      /* do something with the input */
      return input;
    }

    this.output = output(input); // run the output and assign it to this.output
    callback();
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
```

Image Sequencer modules are designed to be run either in the browser or in a Node.js environment. For dynamically loaded modules, that means that any uses of `require()` to include an external library must be compiled using a system like `browserify` or `webpack` to ensure browser compatibility. An example of this can be found here:

https://github.com/tech4gt/image-sequencer

If you wish to offer a module without browser-compatibility, please indicate this in the returned `info` object as:

module.exports = [
  ModuleName,
  { only: ['node'] }
];

If you believe that full cross-compatibility is possible, but need help, please open an issue on your module's issue tracker requesting assistance (and potentially link to it from an inline comment or the module description).

Any Independent Module Must follow this basic format
```js
function ModuleName(options,UI) {

  var output;

  function draw(input,callback) {

    var output = function(input){
      /* do something with the input */
      return input;
    }

    this.output = output(input); // run the output and assign it to this.output
    callback();
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  };
}

  module.exports = [ModuleName,{
      "name": "ModuleName",
      "description": "",
      "inputs": {
        // inputs here
      }
      /* Info can be defined here or imported from a json file */
      // require('./info.json') This only works in node
      // In a module compiled with browserify or webpack, a require() can be used to
      // load a standard info.json file.
      ];
```


### options

The object `options` stores some important information. This is how you can accept
input from users. If you require a variable "x" from the user and the user passes
it in, you will be able to access it as `options.x`.

Options also has some in-built properties. The `options.inBrowser` boolean denotes
whether your module is being run on a browser.

### draw()

To add a module to Image Sequencer, it must have a `draw` method; you can wrap an existing module to add them:

* `module.draw(input, callback)`

The `draw` method should accept an `input` parameter, which will be an object of the form:

```js
input = {
  src: "datauri of an image here",
  format: "jpeg/png/etc",
  // utility functions
  getPixels: "function to get Image pixels. Wrapper around https://npmjs.com/get-pixels",
  savePixels: "function to save Image pixels. Wrapper around https://npmjs.com/save-pixels",
  lodash: "wrapper around lodash library, https://github.com/lodash",
  dataUriToBuffer: "wrapper around https://www.npmjs.com/package/data-uri-to-buffer",
  pixelManipulation: "general purpose pixel manipulation API, see https://github.com/publiclab/image-sequencer/blob/master/src/modules/_nomodule/PixelManipulation.js"
}
```
For example usage for pixelManipulation see https://github.com/publiclab/image-sequencer/blob/master/src/modules/Invert/Module.js

**The module is included in the browser inside a script tag and since the code runs directly in the browser if any other module is required apart from the apis available on the input object, it should be either bundled with the module code and imported in es6 format or the module code must be browserified before distribution for browser**

The draw method is run every time the step is `run` using `sequencer.run()`.
So any calculations must go **into** the `draw()` method's definition.

What is not in the draw method, but is in the `module.exports` is executed only
when the step is added. So whatever external npm modules are to be loaded, or
constant definitions must be done **outside** the `draw()` method's definition.

`draw()` receives two arguments - `input` and  `callback` :
* `input` is an object which is essentially the output of the previous step.
    ```js
    input = {
      src: "<$DataURL>",
      format: "<png|jpeg|gif>"
    }
    ```
* `callback` is a function which is responsible to tell the sequencer that the step has been "drawn".

When you have done your calculations and produced an image output, you are required to set `this.output` to an object similar to what the input object was, call `callback()`, and set `options.step.output` equal to the output DataURL

* `progressObj` is an optional additional Object that can be passed in the format `draw(input, callback, progressObj)`, which handles the progress output; see [Progress reporting](#progress-reporting) below.

### UI Methods

The module is responsible for emitting various events for the UI to capture.

There are four events in all:

* `UI.onSetup(options.step)` must be emitted when the module is added. So it must be emitted outside the draw method's definition as shown above.
* `UI.onDraw(options.step)` must be emitted whenever the `draw()` method is called. So it should ideally be the first line of the definition of the `draw` method.
* `UI.onComplete(options.step)` must be emitted whenever the output of a draw call
is ready. An argument, that is the DataURL of the output image must be passed in.
* `UI.onRemove(options.step)` is emitted automatically and the module should not emit it.
* `UI.notify(msg,id)` must be emmited when a notification has to be produced.

### Name and description

For display in the web-based demo UI, set the `name` and `description` fields in the `info.json` file for the module.

## Info file

All module folders must have an `info.json` file which looks like the following:

```json
{
  "name": "Name of Module to be displayed",
  "description": "Optional longer text explanation of the module's function",
  "url": "Optional link to module's source code or documentation",
  "inputs": {
    "var1": {
      "type": "text",
      "default": "default value"
    }
  },
  "outputs": {
    "out1": {
      "type": "text"
    }
  }
}
```

Types may be one of "text", "integer", "float", "select".
Integer and Float types should also specify minimum and maximum values like this:

```json
"var1": {
  "type": "integer",
  "min": 0,
  "max": 4,
  "default": 1
}
```

Similarly, "Select" type inputs should have a `values` array.

Also, A module may have output values. These must be defined as shown above.

### Progress reporting

The default "loading spinner" can be optionally overriden with a custom progress object to draw progress on the CLI, following is a basic module format for the same:

```js
module.exports = function ModuleName(options,UI) {

  var output;

  function draw(input,callback,progressObj) {

    /* If you wish to supply your own progress bar you need to override progressObj */
    progressObj.stop() // Stop the current progress spinner

    progressObj.overrideFlag = true; // Tell image sequencer that you will supply your own progressBar

    /* Override the object and give your own progress Bar */
    progressObj = /* Your own progress Object */

    var output = function(input){
      /* do something with the input */
      return input;
    };

    this.output = output();
    callback();
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
```

The `progressObj` parameter of `draw()` is not consumed unless a custom progress bar needs to be drawn, for which this default spinner should be stopped with `progressObj.stop()` and image-sequencer is informed about the custom progress bar with `progressObj.overrideFlag = true;` following which this object can be overriden with custom progress object.

### Module example

See existing module `green-channel` for an example: https://github.com/publiclab/image-sequencer/tree/master/src/modules/GreenChannel/Module.js

The `green-channel` module is included into the core modules here: https://github.com/publiclab/image-sequencer/blob/master/src/Modules.js#L5-L7

For help integrating, please open an issue.

## Meta Module

IMAGE SEQUENCER supports "meta modules" -- modules made of other modules. The syntax and structure of these meta modules is very similar to standard modules. Sequencer can also genarate meta modules dynamically with the function `createMetaModule` which can be called in the following ways

```js
// stepsString is a stringified sequence
sequencer.createMetaModule(stepsString,info)

/* stepsArray is the array of objects in this format
* [
*   {name: "moduleName",options: {}},
*   {name: "moduleName",options: {}}
* ]
*/
sequencer.createMetaModule(stepsArray,info)
```

A Meta module can also be contributed like a normal module with an info and a Module.js. A basic Meta module shall follow the following format


```js
// Module.js
module.exports = function metaModuleFun(){
  this.expandSteps([
    { 'name': 'module-name', 'options': {} },
    { 'name': 'module-name', options: {} }
    ]);
}
```

```json
// Info
{
  "name": "meta-moduleName",
  "description": "",
  "length": //Integer representing number of steps in the metaModule
}
```

```js
//index.js
module.exports = [
  require('./Module.js'),
  require('./info.json')
]
```

All of the above can also be combined together to form a single file module.

```js
// MetaModule.js
module.export = [
  function (){
  this.expandSteps([
    { 'name': 'module-name', 'options': {} },
    { 'name': 'module-name', options: {} }
    ]);
  },
  {
  "name": "meta-moduleName",
  "description": "",
  "length": //Integer representing number of steps in the metaModule
  }
]
```
The length is absolutely required for a meta-module, since sequencer is optimized to re-run minimum number of steps when a step is added in the UI which is 1 in the case of normal modules, if the added step is a meta-module the length of the sequence governs the number of steps to re-run.
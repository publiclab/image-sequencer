Contributing to Image Sequencer
===

Happily accepting pull requests; to edit the core library, modify files in `./src/`. To build, run `npm install` followed by `grunt build`.

Most contribution (we imagine) would be in the form of API-compatible modules, which need not be directly included.

## Jump To

* [README.md](https://github.com/publiclab/image-sequencer)
* [Contributing Modules](#contributing-modules)
* [Info File](#info-file)
* [Ideas](#ideas)


## Contribution ideas

See [this issue](https://github.com/publiclab/image-sequencer/issues/118) for a range of ideas for new contributions, and links to possibly helpful libraries. Also see the [new features issues list](https://github.com/publiclab/image-sequencer/labels/new-feature).

### Bugs

If you find a bug please list it here, and help us develop Image Sequencer by [opening an issue](https://github.com/publiclab/image-sequencer/issues/new)!

****

## Contributing modules

Most contributions can happen in modules, rather than to core library code. Modules and their [corresponding info files](#info-file) are included into the library in this file: https://github.com/publiclab/image-sequencer/blob/master/src/Modules.js#L5-L7

Any module must follow this basic format:

```js
module.exports = function ModuleName(options,UI) {
  options = options || {};
  options.title = "Title of the Module";
  UI.onSetup(options.step);
  var output;

  function draw(input,callback) {
    UI.onDraw(options.step);

    var output = /*do something with the input*/ ;

    this.output = output;
    options.step.output = output.src;
    callback();
    UI.onComplete(options.step);
  }

  return {
    options: options,
    draw: draw,
    output: output,
    UI: UI
  }
}
```

### options

The object `options` stores some important information. This is how you can accept
input from users. If you require a variable "x" from the user and the user passes
it in, you will be able to access it as `options.x`.

Options also has some in-built properties. The `options.inBrowser` boolean denotes
whether your module is being run on a browser.

### draw()

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
* `callback` is a function which is responsible to tell the sequencer that the
step has been "drawn".

When you have done your calculations and produced an image output, you are required
to set `this.output` to an object similar to what the input object was, call
`callback()`, and set `options.step.output` equal to the output DataURL

### UI Methods

The module is responsible for emitting various events for the UI to capture. There are
four events in all:

* `UI.onSetup(options.step)` must be emitted when the module is added. So it must be emitted outside the draw method's definition as shown above.
* `UI.onDraw(options.step)` must be emitted whenever the `draw()` method is called. So it should ideally be the first line of the definition of the `draw` method.
* `UI.onComplete(options.step)` must be emitted whenever the output of a draw call
is ready. An argument, that is the DataURL of the output image must be passed in.
* `UI.onRemove(options.step)` is emitted automatically and the module should not emit it.

To add a module to Image Sequencer, it must have the following method; you can wrap an existing module to add them:

* `module.draw()`

The `draw(input,callback)` method should accept an `input` parameter, which will be an object of the form:

```js
input = {
  src: "datauri here",
  format: "jpeg/png/etc"
}
```

### options.title

For display in the web-based UI, each module may also have a title `options.title`.

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

### Module example

See existing module `green-channel` for an example: https://github.com/publiclab/image-sequencer/tree/master/src/modules/GreenChannel/Module.js

The `green-channel` module is included into the core modules here: https://github.com/publiclab/image-sequencer/blob/master/src/Modules.js#L5-L7

For help integrating, please open an issue.

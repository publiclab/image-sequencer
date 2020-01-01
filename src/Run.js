const getStepUtils = require('./util/getStep.js');

function Run(ref, json_q, callback, ind, progressObj) {
  if (!progressObj) progressObj = { stop: function() { } };

  function drawStep(drawarray, pos) {
    if (pos == drawarray.length && drawarray[pos - 1] !== undefined) {
      if (ref.objTypeOf(callback) == 'Function' && ref.steps.slice(-1)[0].output) {
        var steps = ref.steps;
        var out = steps[steps.length - 1].output.src;
        callback(out);
        return true;
      }
    }

    // so we don't run on the loadImage module:
    if (drawarray[pos] !== undefined) {
      var i = drawarray[pos].i;
      var input = ref.steps[i - 1].output;
      var step = ref.steps[i];

      step.getStep = function getStep(offset) {
        if (i + offset >= ref.steps.length) return { options: { name: undefined } };
        else return ref.steps.slice(i + offset)[0];
      };
      step.getIndex = function getIndex() {
        return i;
      };

      for (var util in getStepUtils) {
        if (getStepUtils.hasOwnProperty(util)) {
          step[util] = getStepUtils[util];
        }
      }

      // Tell UI that a step is being drawn.
      step.UI.onDraw(step.options.step);

      // provides a set of standard tools for each step
      var inputForNextStep = require('./RunToolkit')(ref.copy(input));

      step.draw(
        inputForNextStep,
        function onEachStep() {

          // This output is accessible by UI
          ref.steps[i].options.step.output = ref.steps[i].output.src;
          ref.steps[i].options.step.wasmSuccess = ref.steps[i].output.wasmSuccess || false;
          ref.steps[i].options.step.useWasm = ref.steps[i].output.useWasm || false;

          // Tell UI that step has been drawn.
          ref.steps[i].UI.onComplete(ref.steps[i].options.step);

          drawStep(drawarray, ++pos);
        },
        progressObj
      );
    }
  }

  function drawSteps(json_q) {
    var drawarray = [],
      no_steps = ref.steps.length,
      init = json_q[0];
    for (var i = 0; i < no_steps - init; i++) {
      drawarray.push({i: init + i });
    }
    drawStep(drawarray, ind);
  }

  function filter(json_q) {
 
    if (json_q[0] == 0 && ref.steps.length == 1)
      delete json_q[0];
    else if (json_q[0] == 0) json_q[0]++;
    var prevstep = ref.steps[json_q[0] - 1];
    while (
      typeof prevstep == 'undefined' ||
        typeof prevstep.output == 'undefined'
    ) {
      prevstep = ref.steps[--json_q[0] - 1];
    }
    
    return json_q;
  }
  
  var json_q = filter(json_q);
  
  return drawSteps(json_q);
}
module.exports = Run;

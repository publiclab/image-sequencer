function Run(ref, json_q, callback) {

  function drawStep(drawarray, pos) {
    if (pos == drawarray.length && drawarray[pos - 1] !== undefined) {
      var image = drawarray[pos-1].image;
      if(ref.objTypeOf(callback) == 'Function') {
        var steps = ref.images[image].steps;
        var out = steps[steps.length-1].output.src;
        callback(out);
        return true;
      }
    }
    // so we don't run on the loadImage module:
    if (drawarray[pos] !== undefined) {
      var image = drawarray[pos].image;
      var i = drawarray[pos].i;
      var input = ref.images[image].steps[i - 1].output;
      ref.images[image].steps[i].draw(ref.copy(input), function onEachStep() {
        drawStep(drawarray, ++pos);
      });
    }
  }

  function drawSteps(json_q) {
    var drawarray = [];
    for (var image in json_q) {
      var no_steps = ref.images[image].steps.length;
      var init = json_q[image];
      for(var i = 0; i < no_steps - init; i++) {
        drawarray.push({ image: image, i: init + i });
      }
    }
    drawStep(drawarray,0);
  }

  function filter(json_q){
    for (var image in json_q) {
      if (json_q[image] == 0 && ref.images[image].steps.length == 1)
        delete json_q[image];
      else if (json_q[image] == 0) json_q[image]++;
    }
    for (var image in json_q) {
      var prevstep = ref.images[image].steps[json_q[image] - 1];
      while (typeof(prevstep) == "undefined" || typeof(prevstep.output) == "undefined") {
        prevstep = ref.images[image].steps[(--json_q[image]) - 1];
      }
    }
    return json_q;
  }

  var json_q = filter(json_q);
  return drawSteps(json_q);

}
module.exports = Run;

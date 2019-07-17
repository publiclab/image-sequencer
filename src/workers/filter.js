const { expose } = require('threads/worker');
expose(function filter(json_q, steps) {
  if (json_q[0] == 0 && steps.length == 1){
    delete json_q[0];
  }
  else if (json_q[0] == 0) json_q[0]++;
  var prevstep = steps[json_q[0] - 1];
  while (
    typeof prevstep == 'undefined' ||
        typeof prevstep.output == 'undefined'
  ) {
    prevstep = steps[--json_q[0] - 1];
    console.log(typeof prevstep == 'undefined');
  }
  return json_q;
});


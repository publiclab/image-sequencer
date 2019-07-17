const { expose } = require('threads/worker');
expose(function filter(json_q, ref) {
 
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
});


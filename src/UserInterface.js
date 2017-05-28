/*
 * Default UI for each image-sequencer module
 */
module.exports = function UserInterface(options) {

  options = options || {};
  options.container = options.container || ".panels";
  options.id = options.id;
  options.instanceName = options.instanceName;
  options.random = options.random || parseInt(Math.random() * (new Date()).getTime() / 1000000);
  options.uniqueSelector = options.uniqueSelector || options.selector + '-' + options.random;
  $(options.container).append('<div class="panel ' + options.selector + ' ' + options.uniqueSelector + '" id="sequencer-'+options.id+'"><div class="image"></div></div>');
  options.el = options.el || $('.' + options.uniqueSelector);
  createLabel(options.el);

  // method to remove the UI for a given method, and remove the step
  function display(image) {
    options.el.find('.image').html(image);
  }

  // method to remove the UI for a given method, and remove the step
  function remove() {
    $('div#sequencer-'+options.id).remove();
  }

  // method to reorder steps, and update the UI
  //function move() {}

  function createLabel(el) {
    if (options.title) el.prepend('<h3 class="title">' + options.title + '</h3> <button class="btn btn-default" onclick="'+options.instanceName+'.removeStep('+options.id+')">Remove Step</button>');
  }

  return {
    el: options.el,
    uniqueSelector: options.uniqueSelector,
    selector: options.selector,
    display: display,
    remove: remove
  }

}

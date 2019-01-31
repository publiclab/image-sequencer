// initialize form selects
function initializeSelect(){
  M.FormSelect.init(document.querySelectorAll('select'), {})
  $('.dropdown-content>li>span, .select-dropdown').addClass('blue-grey-text');
}

// initialize modals
function initializeModal(){
  $('.modal').modal();
}

// initialize collapsibles
function initializeCollapsible(){
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });   
}

// initialize form ranges
function initializeRange(){
  var elems  = document.querySelectorAll("input[type=range]");
  M.Range.init(elems);
}

// initialize material box for step images
function initializeMaterialBoxImg(){
  $('.materialboxed').materialbox();
}

// initlialize text inputs
function initializeTextInputs(){
  M.updateTextFields();
}

// update textareas
function updateTextArea(){
  if ($('textarea').length > 0){
    M.textareaAutoResize($('textarea'));
  }
}

// initialize tooltips
function initializeTooltips(){
  var elems = document.querySelectorAll('.tooltipped');
  var instances = M.Tooltip.init(elems, {});
}

function initializeAll(){
  initializeCollapsible();
  initializeModal();
  initializeSelect();
  initializeRange();
  initializeMaterialBoxImg();
  initializeTextInputs();
  updateTextArea();
  initializeTooltips();
}

module.exports = {
  initializeSelect,
  initializeModal,
  initializeCollapsible,
  initializeMaterialBoxImg,
  initializeRange,
  initializeTextInputs,
  updateTextArea,
  initializeTooltips,
  initializeAll
}
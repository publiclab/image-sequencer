// initialize Form Selects
function initializeSelect(){
  M.FormSelect.init(document.querySelectorAll('select'), {classes: "target"})
  $(".dropdown-content>li>span").addClass('blue-grey-text');
}

// initialize Modals
function initializeModal(){
  $('.modal').modal();
}

// initialize Collapsibles
function initializeCollapsible(){
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });   
}

function initializeRange(){
  var elems  = document.querySelectorAll("input[type=range]");
  M.Range.init(elems);
}

function initializeMaterialBoxImg(){
  $('.materialboxed').materialbox();
}

function initializeTextInputs(){
  M.updateTextFields();
}

function updateTextArea(){
  if ($('textarea').length > 0){
    M.textareaAutoResize($('textarea'));
  }
}

function initializeAll(){
  initializeCollapsible();
  initializeModal();
  initializeSelect();
  initializeRange();
  initializeMaterialBoxImg();
  initializeTextInputs();
  updateTextArea();
}

module.exports = {
  initializeSelect,
  initializeModal,
  initializeCollapsible,
  initializeMaterialBoxImg,
  initializeRange,
  initializeTextInputs,
  updateTextArea,
  initializeAll
}
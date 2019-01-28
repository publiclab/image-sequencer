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

function inintializeMaterialBoxImg(){
  $('.materialboxed').materialbox();
}

function initializeAll(){
  initializeCollapsible();
  initializeModal();
  initializeSelect();
  inintializeMaterialBoxImg();
}

module.exports = {
  initializeSelect,
  initializeModal,
  initializeCollapsible,
  inintializeMaterialBoxImg,
  initializeAll
}
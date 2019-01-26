// initialize Form Selects
function initializeSelect(){
  $(document).ready(function(){
    M.FormSelect.init(document.querySelectorAll('select'), {classes: "target"})
    $(".dropdown-content>li>span").addClass('blue-grey-text');
  });
}

function initializeModal(){
  $(document).ready(function(){
    $('.modal').modal();
  });
}

function initializeCollapsible(){
  var elem = document.querySelector('.collapsible.expandable');
  var instance = M.Collapsible.init(elem, {
    accordion: false
  });   
}

module.exports = {
  initializeSelect,
  initializeModal,
  initializeCollapsible
}
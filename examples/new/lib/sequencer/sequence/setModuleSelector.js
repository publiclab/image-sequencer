function refreshOptions() {
  // Load information of all modules (Name, Inputs, Outputs)
  var modulesInfo = sequencer.modulesInfo();

  var addStepSelect = $("#selectStep");
  addStepSelect.html("");

  // Add modules to the addStep dropdown
  for (var m in modulesInfo) {
    if (modulesInfo[m] && modulesInfo[m].name)
      addStepSelect.append(
        '<option value="' + m + '">' + modulesInfo[m].name + "</option>"
      );
  }
  // Null option
  addStepSelect.append('<option value="none" disabled selected>More modules...</option>');
}

function quickButtons(ui){
  //Module button radio selection
  $('.radio-group .radio').on("click", function() {
    $(this).parent().find('.radio').removeClass('selected');
    $(this).addClass('selected');
    newStep = $(this).attr('data-value');
    $("#addStep select").val(newStep);
    ui.selectNewStepUi();
    ui.addStepUi();
    $(this).removeClass('selected');
  })
}

function setModuleSelector(ui){
  refreshOptions();
  quickButtons(ui);
  $("#addStep select").on("change", ui.selectNewStepUi);
  $("#addStep #add-step-btn").on("click", ui.addStepUi);
}

module.exports = {
  setModuleSelector,
  refreshOptions
};
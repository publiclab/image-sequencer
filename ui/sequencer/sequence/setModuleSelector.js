function refreshOptions(selectStepSel) {
  // Load information of all modules (Name, Inputs, Outputs)
  var modulesInfo = sequencer.modulesInfo();

  var addStepSelect = $(selectStepSel || '#selectStep');
  addStepSelect.html('');

  // Add modules to the addStep dropdown
  for (var m in modulesInfo) {
    if (modulesInfo[m] && modulesInfo[m].name)
      addStepSelect.append(
        '<option value="' + m + '">' + modulesInfo[m].name + '</option>'
      );
  }
  // Null option
  addStepSelect.append('<option value="none" disabled selected>More modules...</option>');
}

function quickButtons(ui){
  //Module button radio selection
  $(ui.options.quickBtnsSel).on('click', function() {
    $(ui.options.quickBtnsSel).removeClass('selected');
    $(this).addClass('selected');
    newStep = $(this).attr('data-value');
    $(ui.options.stepSelectSel).val(newStep);
    ui.selectNewStepUi();
    ui.addStepUi();
    $(this).removeClass('selected');
  })
}

function setModuleSelector(ui){
  refreshOptions(ui.options.stepSelectSel);
  quickButtons(ui);
  $(ui.options.stepSelectSel).on('change', ui.selectNewStepUi);
  $(ui.options.addStepBtnSel).on('click', ui.addStepUi);
}

module.exports = {
  setModuleSelector,
  refreshOptions
};
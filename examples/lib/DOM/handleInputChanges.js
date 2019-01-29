function handleInputValueChange(step, currentValue, initValue, hasChangedBefore) {
  var inputChanged = !(isNaN(initValue) || isNaN(currentValue) ? currentValue === initValue : currentValue - initValue === 0);
  step.changedInputs += hasChangedBefore ? inputChanged ? 0 : -1 : inputChanged ? 1 : 0;
  step.optionsChanged = step.changedInputs > 0;

  $(step.ui.querySelector('.btn-save')).prop('disabled', !step.optionsChanged);
  return inputChanged;
}

function updateInputs(inputs){
  $(inputs)
  .each((i, input) => {
    $(input)
      .data('initValue', $(input).val())
      .data('hasChangedBefore', false);
  })
}

function initializeInputs(input, step){
  $(input)
    .data('initValue', $(input).val())
    .data('hasChangedBefore', false)
    .on('input change', function() {
      $(input)
        .focus()
        .data('hasChangedBefore',
          handleInputValueChange(
            step,
            $(input).val(),
            $(input).data('initValue'),
            $(input).data('hasChangedBefore')
        )
      )
    })
}

module.exports = {
  handleInputValueChange,
  updateInputs,
  initializeInputs
}
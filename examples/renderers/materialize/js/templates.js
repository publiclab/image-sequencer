function capitalize(str){
  return str.charAt(0).toUpperCase() + str.substr(1);
}

var getStepTemplate = function(step){
  return '<li class="active step-wrapper">\
            <div class="collapsible-header"><b>'+capitalize(step.name)+'</b></div>\
            <div class="collapsible-body" style="display:block;">\
              <div class="container">\
                <div class="row step">\
                  <form class="input-form">\
                    <div class="col m4 details">\
                      <div>\
                        <p>\
                          <i>'+
                          (step.description || "") +
                          '</i>\
                        </p>\
                      </div>\
                    </div>\
                  </form>\
                  <div class="col m8">\
                    <div class="load" style="display:none;"><i class="material-icons spin toggleIcon">donut_large</i></div>\
                    <img style="max-width=100%" class="img-thumbnail step-thumbnail responsive-img materialboxed"/>\
                    </div>\
                  </div>\
                </div>\
              </div>\
            </div>\
          </li>'
}

var getStepInsertTemplate = function() {
  return `
  <div class="row center-align insertDiv flex-collapse" style="display:none;">\
    <div class="col s8 center-align" style="margin-top:5%;margin-left:0;">\
      <section class="insert-step card">\
        <div class="form-inline">\
          <div class="card-content center">\
            <span class="card-title">Select A Module</span>\
            <p class="info"></p>\
            <div class="row center-align radio-group">\
            <div>\
              <div class="radio" data-value="brightness">\
                <i class="material-icons i-over">brightness_high</i>\
              </div>\
              <p>Brightness</p>\
              </div>\
              <div>\
                <div class="radio" data-value="contrast">\
                  <i class="material-icons i-over">tonality</i>\
                </div>\
                <p>Contrast</p>\
              </div>\
              <div>\
                <div class="radio" data-value="saturation">\
                  <i class="material-icons i-over">colorize</i>\
                </div>\
                <p>Saturation</p>\
              </div>\
              <div>\
                <div class="radio" data-value="rotate">\
                  <i class="material-icons i-over">rotate_left</i>\
                </div>\
                <p>Rotate</p>\
              </div>\
              <div>\
                <div class="radio" data-value="crop">\
                  <i class="material-icons i-over">crop</i>\
                </div>\
                <p>Crop</p>\
              </div>\
            </div>\
            <div class="center input-field center-align">\
              <select>\
                <!-- The default null selection has been appended manually in demo.js\
                This is because the options in select are overritten when options are appended.-->\
              </select>\
            </div>\
            <button class="btn waves-effect green accent-4 add-step-btn" name="add">Add Step</button>\
          </div>\
        </div>\
      </section>\
    </div>\
  </div>
  `;
}

var getToolsTemplate = function() {
  return `
  <div class="tools">
    <div class="tools right">
      <button class="btn download-step-btn btn-floating waves-effect waves-light blue darken-3 z-depth-0">\
        <i class="material-icons">file_download</i>
      </button>
      <button class="remove btn-floating waves-effect waves-light red z-depth-0">\
        <i class="material-icons">delete</i>
      </button>
      <button class="btn insert-step-btn btn-floating waves-effect waves-light green z-depth-0">\
        <span class="insert-text">
          <i class="material-icons">add_circle</i>
        </span>
        <span class="no-insert-text" style="display:none;">
          <i class="material-icons">remove_circle</i>
        </span>
      </button>
    </div>
  </div>
  `;
}

var inputTemplates = {
  getRangeTemplate: function(paramName, inputDesc){
    return `
    <div class="input-field">
      <input class="validate target"
        type="${inputDesc.type}"
        name="${paramName}"
        id="${paramName}"
        value="${inputDesc.default}"
        placeholder ="${inputDesc.placeholder || ""}"
        min="${inputDesc.min}"
        max="${inputDesc.max}"
        step="${inputDesc.step ? inputDesc.step : '1'}"
      >
    </div>
    `;
  },

  getSelectInputTemplate: function(paramName, inputDesc){
    var options;
    for (var option in inputDesc.values) {
      options += `<option value="${inputDesc.values[option]}">${inputDesc.values[option]}</option>`;
    }

    return `
    <div name="${paramName} class="input-field"><select class="target" name="${paramName}">
    ${options}
    </select></div>
    `;
  },

  getTextTemplate: function(paramName, inputDesc){
    return `
    <div class="input-field">
      <textarea
        class="materialize-textarea target"\
        name="${paramName}"
        id="${paramName}"
        placeholder="${inputDesc.placeholder || ''}"
      >${inputDesc.default}</textarea>
      <label for="${paramName}">${capitalize(paramName)}</label></div>
    `;
  },

  getDefaultTemplate: function(paramName, inputDesc){
    return `
    <div class="input-field>
      <input class="validate target"
        type="${inputDesc.type}"
        name="${paramName}"
        id="${paramName}"
        value="${inputDesc.default}"
        placeholder ="${inputDesc.placeholder || ""}"
      >
    <label for="${paramName}">${capitalize(paramName)}</label></div>
    `;
  }
}

module.exports = {
  getStepTemplate,
  getToolsTemplate,
  getStepInsertTemplate,
  inputTemplates
}
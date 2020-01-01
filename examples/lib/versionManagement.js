// Get the current version number from package.json on GitHub.
function getLatestVersionNumber(callback) {
  var homepage = require('../../package.json').homepage;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(this.responseText);
      var latestVersionNumber = response.version;
      callback(latestVersionNumber);
    }
  }
  request.open("GET", homepage + "/package.json", true);
  request.send();
}

// Get the version number from the local package.json file.
function getLocalVersionNumber() {
  return require('../../package.json').version;
}

module.exports = {
  getLatestVersionNumber,
  getLocalVersionNumber
}

/**
 * Get the current version number from package.json on the homepage.
 * @param {function} callback The function that uses the version number.
 */
function getLatestVersionNumber(callback) {
  // Get the homepage reference from the local package.json.
  var homepage = require('../../package.json').homepage;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(this.responseText);
      var latestVersionNumber = response.version;

      // Do something with the version number using a callback function.
      callback(latestVersionNumber);
    }
  }

  // Get the package.json file from online using a GET request.
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
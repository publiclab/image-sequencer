/**
 * Functions for getting version information.
 * Note: these functions are not used by the service worker to check for updates;
 * the service worker updates whenever sw.js has changed.
 * sw.js is changed when grunt replace:version is run. This task is run during
 * grunt build, serve, and productions tasks.
 */

const package = require('../../package.json');

/**
 * Get the current version number from package.json on the homepage.
 * @param {function} callback The function that uses the version number.
 */
function getLatestVersionNumber(callback) {
  // Get the homepage reference from the local package.json.
  var homepage = package.homepage;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(this.responseText);
      var latestVersionNumber = response.version;

      // Do something with the version number using a callback function.
      if (callback)
        callback(latestVersionNumber);
    }
  }

  // Get the package.json file from online using a GET request.
  request.open("GET", homepage + "/package.json", true);
  request.send();
}

// Get the version number from the local package.json file.
function getLocalVersionNumber() {
  return package.version;
}

module.exports = {
  getLatestVersionNumber,
  getLocalVersionNumber
}

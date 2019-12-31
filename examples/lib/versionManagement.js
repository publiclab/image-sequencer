// Get the current version number from package.json on GitHub.
function getLatestVersionNumber(callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(this.responseText);
      var latestVersionNumber = JSON.parse(atob(response.content)).version;
      callback(latestVersionNumber);
    }
  }
  request.open("GET", "https://api.github.com/repos/publiclab/image-sequencer/contents/package.json", true);
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

// Get the current version number from package.json on GitHub.
function getLatestVersionNumber(callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if(request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(this.responseText);
      var latestVersionNumber = JSON.parse(atob(response.content)).version;
      console.log("The latest NPM version number from GitHub is: " + latestVersionNumber);
      callback(latestVersionNumber);
    }
  }
  request.open("GET", "https://api.github.com/repos/publiclab/image-sequencer/contents/package.json", true);
  request.send();
}

function versionCompare(v1, v2) {
  var v1parts = v1.split('.'),
      v2parts = v2.split('.');

  if (areInvalid(v1parts, v2parts)) {
      return NaN;
  }

  v1parts = v1parts.map(Number);
  v2parts = v2parts.map(Number);

  return compareVersionStrings(v1parts, v2parts);
}

function compareVersionStrings(v1parts, v2parts) {
  var compareDigit;
  for (var i = 0; i < v1parts.length; ++i) {
      if (v2parts.length == i) {
          return 1;
      }

      var compareDigit = compare(v1parts[i], v2parts[i]);
      if(compareDigit != 0) {
        break;
      }
  }

  if (v1parts.length != v2parts.length) {
      return -1;
  }

  return compareDigit;
}

function compare(part1, part2) {
  if (part1 == part2) {
      return 0;
  }
  else if (part1 > part2) {
      return 1;
  }
  else {
      return -1;
  }
}

function areInvalid(v1parts, v2parts) {
  return !v1parts.every(isValidPart) || !v2parts.every(isValidPart);
}

function isValidPart(x) {
    return (/^\d+$/).test(x);
}

function comparePart(v1Part, v2Part) {

}
function getLocalVersionNumber() {
  return require('../../package.json').version;
}

module.exports = {
  getLatestVersionNumber,
  getLocalVersionNumber,
  versionCompare
}

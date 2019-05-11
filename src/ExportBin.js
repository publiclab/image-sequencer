var fs = require('fs');
var getDirectories = function(rootDir, cb) {
  fs.readdir(rootDir, function(err, files) {
    var dirs = [];
    if (typeof (files) == 'undefined' || files.length == 0) {
      cb(dirs);
      return [];
    }
    for (var index = 0; index < files.length; ++index) {
      var file = files[index];
      if (file[0] !== '.') {
        var filePath = rootDir + '/' + file;
        fs.stat(filePath, function(err, stat) {
          if (stat.isDirectory()) {
            dirs.push(this.file);
          }
          if (files.length === (this.index + 1)) {
            return cb(dirs);
          }
        }.bind({ index: index, file: file }));
      }
    }
  });
};

module.exports = function ExportBin(dir = './output/', ref, basic, filename) {

  // If user did not give an output filename so we can continue without doing anything
  dir = (dir[dir.length - 1] == '/') ? dir : dir + '/';
  if (ref.options.inBrowser) return false;
  fs.access(dir, function(err) {
    if (err) console.error(err);
  });
  if (filename && basic) {
    var steps = ref.steps;
    var datauri = steps.slice(-1)[0].output.src;
    var ext = steps.slice(-1)[0].output.format;
    var buffer = require('data-uri-to-buffer')(datauri);
    fs.writeFile(dir + filename, buffer, function() { });
  }
  else {
    getDirectories(dir, function(dirs) {
      var num = 1;
      for (var d in dirs) {
        if (dirs[d].match(/^sequencer(.*)$/) == null) continue;
        var n = parseInt(dirs[d].match(/^sequencer(.*)$/)[1]);
        num = (n >= num) ? (n + 1) : num;
      }
      fs.mkdir(dir + 'sequencer' + num, function() {
        var root = dir + 'sequencer' + num + '/';
        var steps = ref.steps;
        if (basic) {
          var datauri = steps.slice(-1)[0].output.src;
          var ext = steps.slice(-1)[0].output.format;
          var buffer = require('data-uri-to-buffer')(datauri);
          fs.writeFile(root + 'image' + '_' + (steps.length - 1) + '.' + ext, buffer, function() { });
        }
        else {
          for (var i in steps) {
            var datauri = steps[i].output.src;
            var ext = steps[i].output.format;
            var buffer = require('data-uri-to-buffer')(datauri);
            fs.writeFile(root + 'image' + '_' + i + '.' + ext, buffer, function() { });
          }
        }
      });
    });
  }
};

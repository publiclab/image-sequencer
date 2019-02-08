const fs = require('fs')



/*
* This function checks if the directory exists, if not it creates one on the given path
* Callback is called with argument error if an error is encountered
*/
function makedir(path,callback){
    fs.access(path,function(err){
        if(err) fs.mkdir(path,function(err){
            if(err) callback(err);
            callback();
        });
        else callback()
    });
};

module.exports = exports = {
    makedir: makedir
}
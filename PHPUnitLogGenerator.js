var fs = require('fs')
  , path = require('path');

function formatToJSON(filename,callback){
  fs.readFile(filename, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/}{/g, '},{');
      result = '['+result+']';

  fs.writeFile(filename, result, 'utf8', function (err) {
      if (err) return console.log(err);
      callback();
  });
 });
  

}

function randomName()
{
     var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
     var result = '';
     for (var i = 32; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
     return result;
}

//getJSONFromFile();
exports.formatToJSON = formatToJSON;
exports.randomName = randomName;

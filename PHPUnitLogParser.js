var fs = require('fs')
  , path = require('path');


function PUnitParser(filename)
{
  this.filename = filename;
  this.filedata = JSON.parse(fs.readFileSync(filename,'utf-8'));
  this.testData = [];
  for(var i=1;i<this.filedata.length;i+=2)
  {
        this.testData.push(this.filedata[i+1]);
  }
  
}

PUnitParser.prototype.getNoOfTests = function(){
   return this.filedata[0].tests;
}

PUnitParser.prototype.getTestArray= function(){
   /*var logdata = this.filedata;
   logdata.splice(0, 1);
   var testData = [];
   for(var i=1;i<logdata.length;i+=2)
   {
        testData.push(logdata[i+1]);
   }
   return testData;*/
   return this.testData;
}

PUnitParser.prototype.getFailedTests = function(){
   var failedTests = [];
   for(var i=0;i<this.testData.length;i++){
      console.log(this.testData[i].status);
      if(this.testData[i].status=='fail')
      {
         failedTests.push(this.testData[i]);
      }
   }
   return failedTests;
} 


exports.PUnitParser = PUnitParser;

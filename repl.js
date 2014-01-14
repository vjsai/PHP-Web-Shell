;(function() {
  window.onload = function() {
    var socket = io.connect();
    var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/php")
        editor.getSession().setUseWorker(false);
        editor.getSession().setMode("ace/mode/javascript");
    
 
    socket.on('connect', function() {
      var term = new Terminal({
        cols: 97,
        rows: 12,
        useStyle: true,
        screenKeys: true
      });


       
       function tryRunning()
      {
         var codeArray = editor.getSession().getDocument().getAllLines();
         for(var i=0;i<codeArray.length;i++){
            var code = codeArray[i];
            console.log(code);
            socket.emit('data',code+'\n');
            //term.write(code);
         }
      }

      var pointer = 0;
      function getNext()
      {
          var codeArray = editor.getSession().getDocument().getAllLines();
          editor.clearSelection();
          var code = codeArray[pointer];
          if(pointer < codeArray.length){
            editor.moveCursorTo(pointer,0);
            console.log(pointer);
            console.log(code);
            socket.emit('data',code+'\n');
            pointer = pointer + 1;
          }
      }

      document.getElementById("run").addEventListener("click",tryRunning );      
      document.getElementById("next").addEventListener("click",getNext );  
      var toType = function(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
      }
      term.on('data', function(data) {
        console.log(toType(data));
        socket.emit('data', data);
      });

      term.on('title', function(title) {
        document.title = title;
      });

      term.open(document.getElementById("terminal"));

      term.write('\x1b[31mWelcome to PHP Web Shell!\x1b[m\r\n');
      

      socket.on('data', function(data) {
        console.log(toType(data));
        console.log(data);
        data = data.replace('] boris>','] phpshell>');
        term.write(data);
      });

      socket.on('disconnect', function() {
        term.destroy();
      });
    });
  };
}).call(this);

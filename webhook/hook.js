// Listen on port 9001
// var gith = require('gith').create(   );
var express = require('express'),
// Import execFile, to run our bash script
var execFile = require('child_process').exec;

var port = 9001;
app.listen(port, function () {
    console.log('Server started on port : ' + port);
});

gith({
    repo: 'nimesha95/CV-APP-2017'
}).on( 'all', function( payload ) {
    if( payload.branch === 'master' )
    {
            // Exec a shell script
            execFile('hook.bat', function(error, stdout, stderr) {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
            });
    }
});
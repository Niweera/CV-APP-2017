// var cmd=require('node-cmd'); 
// cmd.run('npm start');

var execFile = require('child_process').exec;

// Exec a shell script
execFile('npm start', function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (error !== null) {
        console.log(`exec error: ${error}`);
    }
});
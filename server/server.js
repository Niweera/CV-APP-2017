var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    api = require('./routes/api2'),
    app = express(),
    port = 3000;

// // view engine setup
// app.set('views', path.join(__dirname, '../client'));
// app.set('view engine', 'ejs');
// app.engine('html',require('ejs').renderFile);

//Set Static Folder
// app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', index);
app.use('/api2', api);

app.listen(port, function() {
    console.log('Server started on port : ' + port);
});

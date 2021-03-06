var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var compression = require("compression");
var session  = require('express-session');
var path = require('path');
var methodOverride = require('method-override');
var api = require('./app/api');
var cookieParser = require('cookie-parser');
var flash = require('req-flash');
var port = 8888;

app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/public'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(compression());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

app.use(session({ secret: 'crud' }));
app.use(flash());
app.use(cors());

api(app); //passing the app instance;

app.listen(port, '0.0.0.0', function(){
    console.log("Server running at port: "+  port);
});
exports = module.exports = app;
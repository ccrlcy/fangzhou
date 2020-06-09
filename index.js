var express = require('express'); 
var path = require('path');
var bodyParser = require('body-parser'); 
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('./config/passport');

var http = require('http');

var app = express(); 

// DB setting
mongoose.set('useCreateIndex', true);
var MONGODB_URI = 'mongodb://ccrlcy:sh124078@ds113282.mlab.com:13282/fangzhou';
mongoose.connect(MONGODB_URI, {useNewUrlParser: true });
var db = mongoose.connection;
db.once('open', function(){
	console.log('DB connected');
});
db.on('error', function(err){
	console.log('DB error');
});

app.locals.jdata = require('./korea.json');
// other settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//ejs 템플릿 엔진  연동 
// app.use(express.static(__dirname + '/public'));
app.use(express.static('public')); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); 
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({secret:'MySecret', resave:true, saveUninitialized:true}));

// Passport - login
app.use(passport.initialize());
app.use(passport.session()); 

// Custom Middlewares
app.use(function(req, res, next){
 res.locals.isAuthenticated = req.isAuthenticated();
 res.locals.currentUser = req.user;
 next();
})

// route setting - 라우팅(routing) 
app.use('/', require('./routes/home'));
app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/members', require('./routes/members'));
app.use('/contracts', require('./routes/contracts'));


app.get('/rooms', function(req, res) {
    res.render('rooms.ejs');
});
app.get('/blog', function(req, res) {
    res.render('blog.ejs');
});
app.get('/blog-single', function(req, res) {
    res.render('blog-single.ejs');
});
app.get('/contact', function(req, res) {
    res.render('contact.ejs');
});
app.get('/about', function(req, res) {
    res.render('about.ejs');
});
app.get('/rooms-single', function(req, res) {
    res.render('rooms-single.ejs');
});
app.get('/restaurant', function(req, res) {
    res.render('restaurant.ejs');
});

// port setting
app.listen(process.env.PORT || 5000, function(){ 
     console.log('App Listening on port 5000'); 
});

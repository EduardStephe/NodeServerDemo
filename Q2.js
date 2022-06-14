/** Eduard Stephen Manuel 3098993
 * Assignment 2
 * Q2 */

 var express = require('express');
 var app = express();
 
 var handlebars = require('express-handlebars')
     .create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', function(req, res){
    res.render('index');
});

app.get('/lectures', function(req, res){
    res.render('lectures');
});

app.get('/marks', function(req, res){
    res.render('marks');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

//custom 404 page
app.use(function(req, res){
    res.status(404);
    res.render('404');
});


// custom 500 page
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C to terminate.');
});


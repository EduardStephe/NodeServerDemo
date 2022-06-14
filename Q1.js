/** Eduard Stephen Manuel 3098993
 * ACS 3909: Advanced Internet Programming
 * Assignment 2
 */

var express = require('express');
 var app = express();
 
 var handlebars = require('express-handlebars')
     .create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// Read data.
var data = require('./data');

// Set context for view.
var timeline = data['The-Birth'];
var imgCounter = 0;

//Routes
app.get('/', function(req, res){
    res.render('era',{ // Views
        title: timeline.title,
        year: timeline.year,
        imgPath: "./img/"+imgCounter+".jpg"
    });
    // Switch to the next era.
    if(timeline.next == "Birth") { // If .next is the last of the file, return to the beginning.
        timeline = data['The-Birth'];
        imgCounter = 0;
    }
    timeline = data[timeline.next]; 
    imgCounter++;
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


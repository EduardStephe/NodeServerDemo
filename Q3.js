/** Eduard Stephen Manuel 3098993
 * Assignment 3
 * Q3 */
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
    var bGColor = req.query['background-color'];
    if(bGColor == null || bGColor == ""){
        bGColor = "white"
    } else {
        // Randomize
        if(bGColor == 'random') {
            var r = Math.floor( Math.random() * 256 );
            var g = Math.floor( Math.random() * 256 );
            var b = Math.floor( Math.random() * 256 );
            bGColor = "rgb("+r+","+g+","+b+");";
        }
    }
    res.render('optics', {bGC: bGColor});
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
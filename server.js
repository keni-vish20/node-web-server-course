const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');
// add some middleware app.use
// provide path to various files
//register middleware 
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    // to maintain logs in a separate file
    fs.appendFile('./server.log', log + '\n',(err) => {
        if(err){
            console.log('unable to append to append to server log');
        }
    });  
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt',(text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    //res.send('Hello Express !');
    /*res.send({
        name: 'vishal',
        likes: [
            'Biking',
            'Travelling',
            'listening to music'
        ]
    });*/
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        message : 'Welcome User',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    //res.send('About page');
    // render will take you the view engine which you have set up
    //static page rendering
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage : 'page not found'
    });
});

app.listen(3000, () => {
    console.log('server is up on port 3000');
});
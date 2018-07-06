const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Logger middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    console.log('Unble to log to server.log');
  });
  next();
})

// maintenance mode
// app.use( (req,res,next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );
hbs.registerHelper('screamIt', (item) => {
  return item.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Yo this is the home page using handlebarJs',
  })    
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// /bad , a bad request
app.get('/bad', (req, res) => {
  res.status(403);
  res.send({error: 'bad request'})
})


app.listen(PORT, () => console.log(`server on port ${PORT}`));
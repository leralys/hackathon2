// Imports
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const env = require('dotenv');
const path = require('path');

// DB
const DB = require('./modules/db');

// run express
const app = express();

env.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Set templating engine
app.use(expressLayouts);
app.set('layout', './layouts/mainLayout');
// Set view engine
// app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Static files
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'public/css')))
// app.use('/js', express.static(path.join(__dirname, 'public/js')))

// API
app.get('/api/test', async (req, res) => {
    try {
        const data = await test.getProducts();
        res.json(data);
    } catch (e) {
        console.log(e);
    }

});


// Navigation

//root
app.get('/', (req, res) => {
    res.render('index');
});

//shop
app.get('/products', async (req, res) => {
    try {
        const products = await DB.getProducts();
        res.render('products', { products: products });
    } catch (e) {
        console.log(e);
    }
});

//contact form 
app.get('/contact', (req, res) => {
    res.render('index');
});

//about
app.get('/about', (req, res) => {
    res.render('index');
});


//register
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', layout: './layouts/backgroundColor' });
});
app.post('/register', (req, res) => {
    const saltRounds = 10;
    const { name, email } = req.body;
    // hash the password
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        // save the user in db
        DB.saveUser(name, email, hash);
    })
        .catch(e => console.log(e));
    res.redirect('/login');
});


//login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', layout: './layouts/backgroundColor' });
});
app.post('/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    // user[0].hashed_pass;
    // compare hased password with the user input
    bcrypt.compare(req.body.password, user[0].hashed_pass).then(function (result) {
        result ? res.redirect('/products') : res.send('email/password wrong')
    });
});




// Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})


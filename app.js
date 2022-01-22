// Imports
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const env = require('dotenv');
const path = require('path');
const session = require('express-session');

// DB
const DB = require('./modules/db');

// run express
const app = express();

env.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'notagoodsecret',
    resave: true,
    saveUninitialized: true
}));

// Set templating engine
app.use(expressLayouts);
app.set('layout', './layouts/mainLayout');
// Set view engine
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// API
// app.get('/api/test', async (req, res) => {
//     try {
//         const data = await test.getProducts();
//         res.json(data);
//     } catch (e) {
//         console.log(e);
//     }

// });


// ROUTS

//root
app.get('/', (req, res) => {
    if (!req.session.user_id) {
        res.render('index', { topButton: 'View account' });
    } else {
        res.render('index', { topButton: 'Login' });
    }
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
    // compare hased password with the user input
    bcrypt.compare(req.body.password, user[0].hashed_pass).then(function (result) {
        if (result) {
            req.session.user_id = user[0].customer_id;
            res.redirect('/products');
        } else {
            res.send('email/password wrong');
        }
    });
});

// logout
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/');
});

//cart
app.get('/cart', (req, res) => {
    res.send('cart');
});

//secret
app.get('/secret', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        res.render('secret', { layout: './layouts/backgroundColor' });
    }
});
app.post('/secret', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    }
    res.send('hey this is my account');
})



// Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
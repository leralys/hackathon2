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

// session
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
    let btnVal;
    req.session.user_id ? btnVal = 'View account' : btnVal = 'Login';
    res.render('index', { topButton: btnVal, id: req.session.user_id });
});

//shop
app.get('/products', async (req, res) => {
    try {
        const products = await DB.getProducts();
        let btnVal;
        req.session.user_id ? btnVal = 'View account' : btnVal = 'Login';
        res.render('products', { products: products, topButton: btnVal, id: req.session.user_id });
    } catch (e) {
        console.log(e);
    }
});

//contact form 
app.get('/contact', (req, res) => {
    res.redirect('/');
});

//about
app.get('/about', (req, res) => {
    res.redirect('/');
});


//register
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', layout: './layouts/backgroundColor', topButton: 'Login' });
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
    res.render('login', { title: 'Login', layout: './layouts/backgroundColor', topButton: 'Login' });
});
app.post('/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    let btnVal;
    // compare hased password with the user input
    bcrypt.compare(req.body.password, user[0].hashed_pass).then(function (result) {
        if (result) {
            req.session.user_id = user[0].customer_id;
            res.redirect(`/secret/${req.session.user_id}`);
        } else {
            res.send('email/password wrong');
        }
    });
});

// logout
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

//cart
app.get('/cart', (req, res) => {
    let btnVal;
    req.session.user_id ? btnVal = 'View account' : btnVal = 'Login';
    res.render('cart', { topButton: btnVal, id: req.session.user_id });
});

//secret
app.get('/secret/:user', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        if (req.params.user == req.session.user_id) {
            res.render('secret', { layout: './layouts/backgroundColor', topButton: 'Log out' });
        }
    }
});
app.post('/secret/:user', (req, res) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    }
    res.redirect('/secret/:user');
})
app.post('/secret/:user/checkout', (req, res) => {
    res.send('Thank you for your order', { id: req.session.user_id });
});

// Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
// Imports
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const env = require('dotenv');
const path = require('path');

const app = express();


// --- mocking user table in db ---
const users = [];
// --- end ---

env.config();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Set templating engine
app.use(expressLayouts);
app.set('layout', './layouts/nobackground');
// Set view engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Modules
const db = require('./modules/mockdb');

// Static files
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/css', express.static(path.join(__dirname, 'public/css')))
// app.use('/js', express.static(path.join(__dirname, 'public/js')))

// Bootstrap
// app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
// app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

// API
app.get('/api/products', (req, res) => {
    res.json(db.products);
});


// Navigation
//root
app.get('/', (req, res) => {
    res.render('index');
});
//shop
app.get('/products', (req, res) => {
    res.render('index');
    //contact form 
});
app.get('/contact', (req, res) => {
    res.render('index');
});
//about
app.get('/about', (req, res) => {
    res.render('index');
});
//register
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register', layout: './layouts/background' });
});
app.post('/register', (req, res) => { //async
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds).then(function (hash) {
        // Store hash in your password DB
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        console.log(users);
    })
        .catch(e => console.log(e));

    res.redirect('/register');
});
// try {
//     const hashedPass = await bcrypt.hash(req.body.password, saltRounds);
//     users.push({
//         id: Date.now().toString(),
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedPass
//     })
//     res.redirect('/login');
// } catch {
//     res.redirect('/register');
// }


//login
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login', layout: './layouts/background' });
});



// Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})


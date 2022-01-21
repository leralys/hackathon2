// Imports
const express = require('express');
const env = require('dotenv');
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const app = express();

env.config();
app.use(cors());

// Set templating engine
app.use(expressLayouts);
app.set('layout', './layouts/full')
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
app.get('/', (req, res) => {
    res.render('index');
})



// Server
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})


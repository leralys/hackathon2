const knex = require('knex');
const env = require('dotenv');

env.config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.HOST,
        port: process.env.DBPORT,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
});

// select all products
const getProducts = () => {
    return db('product')
        .select('*');
}

// insert a new user to a customer table
const saveUser = async (name, email, hashedP) => {
    try {
        await db('customer').insert({
            customer_name: name,
            email: email,
            hashed_pass: hashedP
        });
    }
    catch (e) {
        console.log(e);
    }
};

// get user by email
const getUser = (email) => {
    return db('customer')
        .where({ email: email })
        .select('customer_id', 'email', 'hashed_pass', 'customer_name');
}

module.exports = {
    getProducts,
    saveUser,
    getUser
};

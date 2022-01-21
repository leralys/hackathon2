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


const getProducts = () => {
    return db('product')
        .select('*');
}


module.exports = {
    getProducts
};

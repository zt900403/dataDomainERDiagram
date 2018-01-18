/**
 * Created by zhang on 18/01/11.
 */

const {Pool} = require('pg');
const pool = new Pool({
    user: 'hjpt',
    host: '127.0.0.1',
    database: 'hjpt_db',
    password: 'hjpt2015',
    port: 5432,
});

module.exports = pool;
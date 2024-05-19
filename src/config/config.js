require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    dbUrl: process.env.DB_URL,
    baseUrl: process.env.BASE_URL
};

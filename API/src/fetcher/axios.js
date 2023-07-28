require('dotenv').config()

const axios = require('axios');
// Set config defaults when creating the instance
const redmine = axios.create({
    baseURL: 'http://localhost'
});

redmine.defaults.headers.common['X-Redmine-API-Key'] = process.env.REDMINE_TOKEN;
redmine.defaults.headers.common['Content-Type'] = "application/json";


module.exports = { redmine }
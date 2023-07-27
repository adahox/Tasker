const axios = require('axios');
// Set config defaults when creating the instance
const redmine = axios.create({
    baseURL: 'http://localhost'
});

redmine.defaults.headers.common['X-Redmine-API-Key'] = "e4734bbe27ff91a653ed11c08c93ac2667c00c00";
redmine.defaults.headers.common['Content-Type'] = "application/json";


module.exports = { redmine }
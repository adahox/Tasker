// Set config defaults when creating the instance
const redmine = axios.create({
    baseURL: 'https://localhost'
});

redmine.defaults.headers.common['X-Redmine-API-Key'] = "";
redmine.defaults.headers.common['Content-Type'] = "application/json";


export { redmine }
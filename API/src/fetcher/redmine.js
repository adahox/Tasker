
const { redmine } = require('./axios');

async function updateRedmineEntryActivity(data) {
   const entryActivity = await redmine.post('/time_entries.json', data); //TODO: usar Try Catch e tratamento de error
   return entryActivity;
}



module.exports = { updateRedmineEntryActivity }
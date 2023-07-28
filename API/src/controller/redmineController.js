const { updateRedmineEntryActivity } =  require('../fetcher/redmine');

const updateEntryActivity = async (req, res) => {
    try {
        await updateRedmineEntryActivity(req.body);

        return res.status(402); 
    } catch (e) {
        res.status(400).send(e.message);
    }  
}


module.exports = {
    updateEntryActivity
}
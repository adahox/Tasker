const express = require('express');
const task = require('../controller/taskController');
const history = require('../controller/historyController');
const redmine = require('../controller/redmineController');
//TODO: Separar as rotas por arquivos.
const router = express.Router();
 
router.get('/task', function(req, res) {
    task.list(req, res);
});
 
router.post('/task', function(req, res) {
    task.create(req, res);
});

router.put('/task/:id', function(req, res) {
    task.update(req, res);
});

router.delete('/task/:id', function(req, res) {
    task._delete(req, res);
});
 
// history
router.get('/history', function(req, res) {
    history.list(req, res);
});

router.post('/history', function(req, res) {
    history.create(req, res);
});

router.put('/history/:id/start', function(req, res) {
    history.startTime(req, res);
});

router.put('/history/:id/end', function(req, res) {
    history.endTime(req, res);
});

// redmine

router.post('/redmine/entry_activity', function(req, res) {
    redmine.updateEntryActivity(req, res);
});


module.exports = router;
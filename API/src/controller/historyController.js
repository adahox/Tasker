const { createHistory, listHistory, updateHistory, deleteHistory, startHistory, pauseHistory } = require('../repository/history');

const create = async (req, res) => {
    try {
        const history = await createHistory(req.body);
        res.status(200).send({ history });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const startTime = async (req, res) => {
    try {
        const history = await startHistory(req.params.id);
        res.status(200).send({ history });
    } catch (e) {
        res.status(400).send(e.message);
    }  
}

const endTime = async (req, res) => {
    try {
        const history = await pauseHistory(req.params.id, req.body);
        res.status(200).send({ history });
    } catch (e) {
        res.status(400).send(e.message);
    }  
}

const list = async (req, res) => {
    try {
        const history = await listHistory();
        res.status(200).send({ history });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const update = async (req, res) => {
    try {
        const task = await updateHistory(req.body, req.params.id);
        res.status(200).send({ task });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const _delete = async (req, res) => {
    try {
        const task = await deleteHistory(req.params.id);
        res.status(200).send({ task });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports = {
    create,
    list,
    update,
    _delete,
    startTime,
    endTime,
}
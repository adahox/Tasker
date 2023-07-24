const { createTask, listTask, updateTask, deleteTask } = require('../repository/tasks');

const create = async (req, res) => {
    try {
        const task = await createTask(req.body);
        res.status(200).send({ task });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const list = async (req, res) => {
    try {
        const task = await listTask();
        res.status(200).send({ task });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const update = async (req, res) => {
    try {
        const task = await updateTask(req.body, req.params.id);
        res.status(200).send({ task });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

const _delete = async (req, res) => {
    try {
        const task = await deleteTask(req.params.id);
        res.status(200).send({ task });
    } catch (e) {
        res.status(400).send(e.message);
    }
}

module.exports = {
    create,
    list,
    update,
    _delete
}
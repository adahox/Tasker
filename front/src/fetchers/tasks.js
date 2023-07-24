import axios from 'axios';

const listTask = async () => {
    const tasks = await axios.get('http://localhost:3001/api/task');
    return tasks.data;
}

const registerTask = async (task) => {
    const _task = await axios.post('http://localhost:3001/api/task', task);
    return _task.data;
}

const updateTask = async (id, value) => {
    const _task = await axios.put(`http://localhost:3001/api/task/${id}`, value);
    return _task.data;
}

const deleteTask = async (id) => {
    const _task = await axios.delete(`http://localhost:3001/api/task/${id}`);
    return _task.data;
}

export {
    listTask,
    registerTask,
    updateTask,
    deleteTask
};
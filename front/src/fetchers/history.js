import axios from 'axios';

const listHistory = async () => {
    const tasks = await axios.get('http://localhost:3001/api/history');
    return tasks.data;
}

const registerHistory = async (history) => {
    const _task = await axios.post('http://localhost:3001/api/history', history);
    return _task.data;
}

const updateHistory = async (id, value) => {
    const _task = await axios.put(`http://localhost:3001/api/history/${id}`, value);
    return _task.data;
}

const deleteHistory = async (id) => {
    const _task = await axios.delete(`http://localhost:3001/api/history/${id}`);
    return _task.data;
}

const startHistoryTime = async (id) => {
    const history = await axios.put(`http://localhost:3001/api/history/${id}/start`);
    return history.data;
}

const stopHistoryTime = async (id, workedTime) => {
    const history = await axios.put(`http://localhost:3001/api/history/${id}/end`, {workedTime: workedTime});
    return history.data;
}

export {
    listHistory,
    registerHistory,
    updateHistory,
    deleteHistory,
    startHistoryTime,
    stopHistoryTime
};
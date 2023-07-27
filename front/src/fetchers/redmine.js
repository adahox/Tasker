import { redmine } from "./axios";

const buscaListaAtividades = async () => {
    const tasks = await redmine.get('http://localhost:3001/api/task');
    return tasks.data;
}

export {
    listTask,
    registerTask,
    updateTask,
    deleteTask
};
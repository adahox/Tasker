const prisma = require('../services/prisma');
const { createHistory } = require('./history');

const createTask = async (data) => {
    const task = await prisma.tasks.create({
        data: {
            title: data.title
        },include:{
            history: true
        }
    });

    if (task.id) {
        history = await createHistory({
            tasksId: task.id,
            description: data.description
        });
    }
    const updatedTask = await getTask(data.id);

    return updatedTask;
}

const getTask = async (id) => {
    return await prisma.tasks.findMany({where: {id: id}, include: {
        history: true
    }});
}

const listTask = async () => {
    const tasks = await prisma.tasks.findMany({
        include: {
            history: true
        }
    });

    return tasks;
}

const updateTask = async (data, id) => {
    const tasks = await prisma.tasks.update({where: {id: id}, data: data});

    return tasks;
}

const deleteTask = async(id) => {
    const task = await prisma.tasks.delete({where: {id: id}});
    return task;
}

module.exports = {
    createTask,
    listTask,
    updateTask,
    deleteTask
}


const prisma = require('../services/prisma');

const createHistory = async (data) => {
    const history = await prisma.history.create({
        data
    });

    return history;
}

const listHistory = async () => {
    const histories = await prisma.history.findMany({
        include: {
            Tasks: true
        }
    });

    return histories;
}

const updateHistory = async (data, id) => {
    const histories = await prisma.history.update({where: {id: id}, data: data});

    return histories;
}

const startHistory = async (id) => {
    const histories = await prisma.history.update({where: {id: id}, data: {
        startTime: new Date()
    }});

    return histories;
}

const pauseHistory = async (id) => {
    const histories = await prisma.history.update({where: {id: id}, data: {
        endTime: new Date(),
        closed: true
    }});

    return histories;
}


const deleteHistory = async(id) => {
    const history = await prisma.history.delete({where: {id: id}});
    return history;
}

module.exports = {
    createHistory,
    listHistory,
    updateHistory,
    deleteHistory,
    startHistory,
    pauseHistory
}


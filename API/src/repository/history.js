const prisma = require('../services/prisma');
const { redmine } = require('../fetcher/axios');

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
    const histories = await prisma.history.update({ where: { id: id }, data: data });

    return histories;
}

const startHistory = async (id) => {
    const histories = await prisma.history.update({
        where: { id: id }, data: {
            startTime: new Date()
        }
    });


    const history = await prisma.history.findFirst({
        where: {
            id: id
        },
        include: {
            Tasks: true
        }
    });

    if (history) {
        if (history.Tasks.redmineLink) {
            const redmineId = history.Tasks.redmineTaskId;
            // envia axios pra ativar a tarefa.
            const redmineAPI = await redmine.put(`/issues/${redmineId}.json`, {
                issue: {
                    status_id: 2
                }
            });
        }

    }

    return histories;
}

const pauseHistory = async (id) => {
    const histories = await prisma.history.update({
        where: { id: id }, data: {
            endTime: new Date(),
            closed: true
        }
    });

    const history = await prisma.history.findFirst({
        where: {
            id: id
        },
        include: {
            Tasks: true
        }
    });


    if (history) {
        if (history.Tasks.redmineLink) {
            const redmineId = history.Tasks.redmineTaskId;
            // envia axios pra ativar a tarefa.
            
            const redmineAPI = await redmine.put(`/issues/${redmineId}.json`, {
                issue: {
                    status_id: 7
                }
            });
        }
    }


    return histories;
}


const deleteHistory = async (id) => {
    const history = await prisma.history.delete({ where: { id: id } });
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


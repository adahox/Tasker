const prisma = require('../services/prisma');
const { redmine } = require('../fetcher/axios');
const { updateRedmineEntryActivity } = require('../fetcher/redmine');
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

const pauseHistory = async (id, workedTime) => {
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
            let redmineId = history.Tasks.redmineTaskId;
            // envia axios pra ativar a tarefa.
            let redmineAPI = await redmine.put(`/issues/${redmineId}.json`, {
                issue: {
                    status_id: 7
                }
            });
            console.log('redmineApi', redmineAPI.status);
            let yourDate = new Date();
            yourDate = yourDate.toISOString().split('T')[0];

            let data = {
                time_entry: {
                    issue_id: parseInt(redmineId),
                    user_id: parseInt(process.env.REDMINE_USER_ID),
                    hours: workedTime.workedTime,
                    comments: "Additional implementation",
                    spent_on: yourDate,
                    activity_id: parseInt(process.env.ACTIVITY_STATUS_PAUSE),
                }
            }


            redmineAPI = await redmine.post('/time_entries.json', data);
            console.log(redmineAPI.data);
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


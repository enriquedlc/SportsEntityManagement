import db from '../config/db.mjs';

const getAllTrainingSessions = async () => {
    const sql = 'SELECT * FROM training_sessions';

    const [results] = await db.query(sql);
    return results;
}

const addNewTrainingSession = async (client_id, trainer_id, date, start_time, end_time, price_per_hour) => {
    const sql = 'INSERT INTO training_sessions SET ?';

    const newTrainingSession = {
        client_id: client_id,
        trainer_id: trainer_id,
        date: date,
        start_time: start_time,
        end_time: end_time,
        price_per_hour: price_per_hour,
    };

    const [results] = await db.query(sql, newTrainingSession);
    return results;
};

const deleteTrainingSessionById = async (id) => {
    const sql = 'DELETE FROM training_sessions WHERE (id = ?)';

    const [results] = await db.query(sql, [id]);
    return results;
};

const updateTrainingSession = async (client_id, trainer_id, date, start_time, end_time, id) => {
    const sql = 'UPDATE training_sessions SET client_id = ?, trainer_id = ?, date = ?, start_time = ?, end_time = ? WHERE id = ?';

    const trainingSession = [client_id, trainer_id, date, start_time, end_time, id];

    const [results] = await db.query(sql, trainingSession);
    return results;
}

const getTrainingSessionsByTrainerId = async (id) => {
    const sql = `SELECT clients.*
                 FROM clients
                 JOIN training_sessions ON clients.id = training_sessions.client_id
                 WHERE training_sessions.trainer_id = ?`

    const [results] = await db.query(sql, [id]);
    return results;
};

const getTrainerAssignedToClient = async (id) => {
    const sql = `SELECT trainers.*
                 FROM trainers
                 JOIN training_sessions ON trainers.id = training_sessions.trainer_id
                 WHERE training_sessions.client_id = ?;`

    const [results] = await db.query(sql, [id]);
    return results;
};

export default {
    getAllTrainingSessions,
    addNewTrainingSession,
    deleteTrainingSessionById,
    updateTrainingSession,
    getTrainingSessionsByTrainerId,
    getTrainerAssignedToClient,
};

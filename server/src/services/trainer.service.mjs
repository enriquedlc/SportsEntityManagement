import db from '../config/db.mjs';
import utils from '../utils/utils.mjs';

const getAllTrainers = async () => {
    const sql = 'SELECT * FROM trainers';
    const [results] = await db.query(sql);
    return results;
}

const getTrainerById = async (id) => {
    const sql = 'SELECT * FROM trainers WHERE id = ?';
    const [results] = await db.query(sql, [id]);
    return results;
}

const addNewTrainer = async (first_name, last_name, dni, gender, phone, email, trainer_status) => {
    const sql = 'INSERT INTO trainers SET ?';
    const employment_start_date = utils.filterDate(new Date());

    const newTrainer = {
        first_name: first_name,
        last_name: last_name,
        dni: dni,
        gender: gender,
        phone: phone,
        email: email,
        trainer_status: trainer_status,
        employment_start_date: employment_start_date,

    }
    const [results] = await db.query(sql, newTrainer);
    return results;
}

const deleteTrainerById = async (id) => {
    const sql = 'DELETE FROM trainers WHERE (id = ?)';

    const [results] = await db.query(sql, [id]);
    return results;
}

const updateTrainer = async (first_name, last_name, dni, gender, phone, email, trainer_status, employment_start_date, id) => {
    const sql = 'UPDATE trainers SET first_name = ?, last_name = ?, dni = ?, gender = ?, phone = ?, email = ?, trainer_status = ? WHERE id = ?';

    const trainer = [first_name, last_name, dni, gender, phone, email, trainer_status, employment_start_date, id];

    const [results] = await db.query(sql, trainer);
    return results;
}

const searchTrainerByName = async (condition) => {
    const sql = 'SELECT * FROM trainers WHERE first_name LIKE ?"%"';
    const [results] = await db.query(sql, condition);
    return results;
}

export default {
    getAllTrainers,
    getTrainerById,
    addNewTrainer,
    deleteTrainerById,
    updateTrainer,
    searchTrainerByName,
}

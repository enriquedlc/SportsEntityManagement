import db from '../config/db.mjs';

const getAllClients = async () => {
    const sql = 'SELECT * FROM clients';
    const [results] = await db.query(sql);
    return results;
}

const getClientById = async (id) => {
    const sql = 'SELECT * FROM clients WHERE id = ?';
    const [results] = await db.query(sql, [id]);
    return results[0];
}

const addNewClient = async (first_name, last_name, dni, gender, phone, email, subscription_date) => {
    const sql = 'INSERT INTO clients SET ?';

    const newClient = {
        first_name: first_name,
        last_name: last_name,
        dni: dni,
        gender: gender,
        phone: phone,
        email: email,
        subscription_date: subscription_date,
    }

    const [results] = await db.query(sql, newClient);
    return results;
}

const deleteClientById = async (id) => {
    const sql = 'DELETE FROM clients WHERE (id = ?)';

    const [results] = await db.query(sql, [id]);
    return results;
}

const updateClient = async (first_name, last_name, dni, gender, phone, email, id) => {
    const sql = 'UPDATE clients SET first_name = ?, last_name = ?, dni = ?, gender = ?, phone = ?, email = ? WHERE id = ?';

    const client = [first_name, last_name, dni, gender, phone, email, id];

    const [results] = await db.query(sql, client);
    return results;
}

const searchClientByName = async (condition) => {
    const sql = 'SELECT * FROM clients WHERE first_name LIKE ?"%"';

    const [results] = await db.query(sql, condition);
    return results;
}

export default {
    getAllClients,
    getClientById,
    addNewClient,
    deleteClientById,
    updateClient,
    searchClientByName
}

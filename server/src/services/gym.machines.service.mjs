import db from '../config/db.mjs';

const getAllGymMachines = async () => {
    const sql = 'SELECT * FROM gym_machines';

    const [results] = await db.query(sql);
    return results;
}

const addNewGymMachine = async (machine_name, machine_type, machine_description, machine_state, machine_purchase_date) => {
    const sql = 'INSERT INTO gym_machines SET ?';

    const newGymMachine = {
        machine_name: machine_name,
        machine_type: machine_type,
        machine_description: machine_description,
        machine_state: machine_state,
        machine_purchase_date: machine_purchase_date,
    };

    const [results] = await db.query(sql, newGymMachine);
    return results;
};

const getGymMachineById = async (id) => {
    const sql = 'SELECT * FROM gym_machines WHERE machine_id = ?';
    const [results] = await db.query(sql, [id]);
    return results;
}

const deleteGymMachineById = async (id) => {
    const sql = 'DELETE FROM gym_machines WHERE (machine_id = ?)';
    const [results] = await db.query(sql, [id]);
    return results;
}

const updateGymMachine = async (machine_name, machine_type, machine_description, machine_state, machine_purchase_date, id) => {
    const sql = 'UPDATE gym_machines SET machine_name = ?, machine_type = ?, machine_description = ?, machine_state = ?, machine_purchase_date = ? WHERE machine_id = ?';

    const gymMachine = [machine_name, machine_type, machine_description, machine_state, machine_purchase_date, id];

    const [results] = await db.query(sql, gymMachine);
    return results;
}

const getGymMachinesByMachineType = async (machine_type) => {
    const sql = `SELECT * FROM gym_machines WHERE machine_type = ?;`

    const [results] = await db.query(sql, [machine_type]);
    return results;
}

const getGymMachinesByMachineState = async (machine_state) => {
    const sql = `SELECT * FROM gym_machines WHERE machine_state = ?;`

    const [results] = await db.query(sql, [machine_state]);
    return results;
}

export default {
    getAllGymMachines,
    addNewGymMachine,
    getGymMachineById,
    deleteGymMachineById,
    updateGymMachine,
    getGymMachinesByMachineType,
    getGymMachinesByMachineState,
};


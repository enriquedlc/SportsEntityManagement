import db from '../config/db.mjs';

const getAllActors = async () => {
    const sql = 'SELECT * FROM actores';
    const [results] = await db.query(sql)

    return results
}

const getActorById = async (id) => {
    const sql = 'SELECT * FROM actores WHERE actor_id = ?';
    const [results] = await db.query(sql, [id])

    return results[0]
}

const addNewActor = async (first_name, last_name) => {
    const sql = 'INSERT INTO actores SET ?'

    const newActor = { 
        first_name: first_name,
        last_name: last_name
    }

    const [results] = await db.query(sql, newActor)
    return results
}

const deleteActorById = async (id) => {
    const sql = 'DELETE FROM actores WHERE (actor_id = ?)'

    const [results] = await db.query(sql, [id])
    return results
}

const updateActor = async (first_name, last_name, id) => {
    const sql = 'UPDATE actores SET first_name = ?, last_name = ? WHERE actor_id = ?'

    const actor = [first_name, last_name, id];

    const [results] = await db.query(sql, actor)
    return results
}

const searchActor = async (condition) => {
    const sql = 'SELECT * FROM actores WHERE first_name LIKE ?"%"'

    const [results] = await db.query(sql, condition)
    return results
}

export default {
    getAllActors,
    getActorById,
    addNewActor,
    deleteActorById,
    updateActor,
    searchActor
}
import axios from 'axios'

const API_URL = 'http://localhost:8000/api/v1'

const getAllActors = async () => {
    const response = await axios.get(`${API_URL}/actors`);
    const actors = response.data;

    console.log('getAll: ', actors.data);

    return actors.data
}

const createActor = async (data) => {
    await fetch(`${API_URL}/actors`, {
        method: 'POST',
        body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name
        }),
        headers: {
            'Content-type': 'application/json'
        }

    })
        .then((res) => res.json())
        .catch((err) => console.log(err.message))
}

const updateActor = async (id, data) => {
    await fetch(`${API_URL}/actors/${id}`, {
        method: 'PUT',
        body: JSON.stringify({

            first_name: data.first_name,
            last_name: data.last_name
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err.message))
}

const deleteActor = async (id) => {
    await fetch(`${API_URL}/actors/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err.message))
}

const getActorById = async (id) => {
    const response = await axios.get(`${API_URL}/actors/${id}`);
    const actors = response.data;

    console.log('search actor service : ', actors.data);

    return actors.data
}

const ActorService = {
    getAllActors,
    createActor,
    updateActor,
    deleteActor,
    getActorById
}

export default ActorService
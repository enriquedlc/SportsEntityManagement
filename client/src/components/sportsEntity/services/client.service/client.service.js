import axios from 'axios';

const API_URL = 'http://localhost:8000/api/sportsentity';

const getAllClients = async () => {
    const response = await axios.get(`${API_URL}/clients`);
    const clients = response.data;

    console.log('getAll: ', clients.data);

    return clients.data
}

const createClient = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/clients`, {
            first_name: data.first_name,
            last_name: data.last_name,
            dni: data.dni,
            gender: data.gender,
            phone: data.phone,
            email: data.email,
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};

const updateClient = async (id, data) => {
    await fetch(`${API_URL}/clients/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            first_name: data.first_name,
            last_name: data.last_name,
            dni: data.dni,
            gender: data.gender,
            phone: data.phone,
            email: data.email,
            subscription_date: data.subscription_date
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err.message))
}

const deleteClient = async (id) => {
    await fetch(`${API_URL}/clients/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((res) => res.json())
        .catch((err) => console.log(err.message))
}

const getClientById = async (id) => {
    const response = await axios.get(`${API_URL}/clients/${id}`);
    const clients = response.data;

    console.log('getById: ', clients.data);

    return clients.data
}

const ClientService = {
    getAllClients,
    createClient,
    updateClient,
    deleteClient,
    getClientById
}

export default ClientService;



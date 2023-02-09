import clientService from "../services/client.service.mjs";
import httpCodes from "../errors/httpCodes.mjs";
import utils from "../utils/utils.mjs";

const getAllClients = async (req, res) => {
    try {
        const data = await clientService.getAllClients();
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: "OK",
            message:
                !data || data.length === 0
                    ? "Clients table is empty"
                    : "Sucesfully retrieved all clients",
            data,
        });
    } catch (err) {
        return res
            .status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "Internal Server Error",
                message: null,
                data: null,
            });
    }
};

const getClientById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "Client Id is needed",
            data: null,
        });
    }

    try {
        const data = await clientService.getClientById(id);
        data.length == 0
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Client is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved client data",
                data,
            });
    } catch (error) {
        return res
            .status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "Internal Server Error",
                message: null,
                data: null,
            });
    }
}

const addNewClient = async (req, res) => {
    const { first_name, last_name, dni, gender, phone, email } = req.body;
    const subscription_date = utils.filterDate(new Date())

    if (!first_name || !last_name || !dni || !gender || !phone || !email) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
            message: "All fields are required",
            data: null,
        });
    }

    try {
        const data = await clientService.addNewClient(first_name, last_name, dni, gender, phone, email, subscription_date);
        return res.send({
            statusCode: httpCodes.CREATED,
            statusMessage: "Created",
            message: "Sucesfully added new client",
            data,
        });
    } catch (error) {
        console.log(error);
        return res
            .status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "Internal Server Error",
                message: null,
                data: null,
            });
    }
}

const updateClient = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, dni, gender, phone, email } = req.body;

    if (!first_name || !last_name || !dni || !gender || !phone || !email) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
            message: "All fields are required",
            data: null,
        });
    }

    try {
        const data = await clientService.updateClient(first_name, last_name, dni, gender, phone, email, id);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Client is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully updated client data",
                data,
            });
    } catch (error) {
        console.log(error);
        return res
            .status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "Internal Server Error",
                message: null,
                data: null,
            });
    }
}

const deleteClientById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "Client Id is needed",
            data: null,
        });
    }

    try {
        const data = await clientService.deleteClientById(id);
        data === data.length == 0
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Client is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully deleted client",
                data,
            });
    } catch (error) {
        return res
            .status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "Internal Server Error",
                message: null,
                data: null,
            });
    }
}

const searchClientByName = async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param name is required",
            message: "name is needed",
            data: null,
        });
    }

    try {
        const data = await clientService.searchClientByName(name);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Client is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved client data",
                data,
            });
    } catch (error) {
        return res
            .status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: "Internal Server Error",
                message: null,
                data: null,
            });
    }
}

export default {
    getAllClients,
    getClientById,
    addNewClient,
    updateClient,
    deleteClientById,
    searchClientByName
};

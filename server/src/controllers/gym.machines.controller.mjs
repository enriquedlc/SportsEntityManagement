import gymMachinesService from "../services/gym.machines.service.mjs";
import httpCodes from "../errors/httpCodes.mjs";

const getAllGymMachines = async (req, res) => {
    try {
        const data = await gymMachinesService.getAllGymMachines();
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: "OK",
            message:
                !data || data.length === 0
                    ? "GymMachines table is empty"
                    : "Sucesfully retrieved all gym machines",
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
}

const getGymMachineById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "GymMachine Id is needed",
            data: null,
        });
    }

    try {
        const data = await gymMachinesService.getGymMachineById(id);
        console.log(data)
        data.length == 0
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "GymMachine is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved gym machine data",
                data,
            });
    } catch (error) {
        console.log(error)
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

const addNewGymMachine = async (req, res) => {
    const { machine_name, machine_type, machine_description, machine_state, machine_purchase_date } = req.body;

    if (!machine_name || !machine_type || !machine_description || !machine_state || !machine_purchase_date) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
            message: "All fields are required",
            data: null,
        });
    }

    try {
        const data = await gymMachinesService.addNewGymMachine(machine_name, machine_type, machine_description, machine_state, machine_purchase_date);
        return res.send({
            statusCode: httpCodes.CREATED,
            statusMessage: "CREATED",
            message: "Gym machine added successfully",
            data,
        });
    }
    catch (err) {
        console.log(err)
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

const updateGymMachine = async (req, res) => {
    const { id } = req.params;
    const { machine_name, machine_type, machine_description, machine_state, machine_purchase_date } = req.body;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "GymMachine Id is needed",
            data: null,
        });
    }

    if (!machine_name || !machine_type || !machine_description || !machine_state || !machine_purchase_date) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Bad Request",
            message: "All fields are required",
            data: null,
        });
    }

    try {
        const data = await gymMachinesService.updateGymMachine(machine_name, machine_type, machine_description, machine_state, machine_purchase_date, id);
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: "OK",
            message: "Gym machine updated successfully",
            data,
        });
    }
    catch (err) {
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

const deleteGymMachine = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "GymMachine Id is needed",
            data: null,
        });
    }

    try {
        const data = await gymMachinesService.deleteGymMachineById(id);
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: "OK",
            message: "Gym machine deleted successfully",
            data,
        });
    }
    catch (err) {
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

const getGymMachinesByMachineState = async (req, res) => {
    const machine_state = req.query.machine_state;

    if (!machine_state) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param machine_state is required",
            message: "GymMachine machine_state is needed",
            data: null,
        });
    }

    try {
        const data = await gymMachinesService.getGymMachinesByMachineState(machine_state);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "GymMachine is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved gym machine data",
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

const getGymMachinesByMachineType = async (req, res) => {
    const machine_type = req.query.machine_type;

    if (!machine_type) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param machine_type is required",
            message: "GymMachine machine_type is needed",
            data: null,
        });
    }

    try {
        const data = await gymMachinesService.getGymMachinesByMachineType(machine_type);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "GymMachine is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved gym machine data",
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
    getAllGymMachines,
    getGymMachineById,
    addNewGymMachine,
    updateGymMachine,
    deleteGymMachine,
    getGymMachinesByMachineState,
    getGymMachinesByMachineType,
};

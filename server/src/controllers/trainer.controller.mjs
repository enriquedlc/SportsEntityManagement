import trainerService from "../services/trainer.service.mjs";
import httpCodes from "../errors/httpCodes.mjs";
import utils from "../utils/utils.mjs";

const getAllTrainers = async (req, res) => {
    try {
        const data = await trainerService.getAllTrainers();
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: "OK",
            message:
                !data || data.lenght === 0
                    ? "Trainers table is empty"
                    : "Sucesfully retrieved all trainers",
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

const getTrainerById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "Trainer Id is needed",
            data: null,
        });
    }

    try {
        const data = await trainerService.getTrainerById(id);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Trainer is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved trainer data",
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

const addNewTrainer = async (req, res) => {
    const { first_name, last_name, dni, gender, phone, email } = req.body;
    const trainer_status = "ACTIVE";
    const employment_start_date = utils.filterDate(new Date());

    if (!first_name || !last_name || !dni || !gender || !phone || !email) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Missing required fields",
            message: "Missing required fields",
            data: null,
        });
    }

    try {
        const data = await trainerService.addNewTrainer(first_name, last_name, dni, gender, phone, email, trainer_status, employment_start_date);
        return res.send({
            statusCode: httpCodes.CREATED,
            statusMessage: "CREATED",
            message: "Sucesfully created new trainer",
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

const updateTrainer = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, dni, gender, phone, email, trainer_status } = req.body;

    if (!first_name || !last_name || !dni || gender, !phone || !email || !trainer_status) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Missing required fields",
            message: "Missing required fields",
            data: null,
        });
    }

    try {
        const data = await trainerService.updateTrainer(first_name, last_name, dni, gender, phone, email, trainer_status, id);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Trainer is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully updated trainer data",
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

const deleteTrainerById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param id is required",
            message: "Trainer Id is needed",
            data: null,
        });
    }

    try {
        const data = await trainerService.deleteTrainerById(id);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Trainer is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully deleted trainer data",
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

const searchTrainerByName = async (req, res) => {
    const name = req.query.name;

    if (!name) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "Param name is required",
            message: "Trainer name is needed",
            data: null,
        });
    }

    try {
        const data = await trainerService.searchTrainerByName(name);
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: "Trainer is not found",
                data: null,
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: "OK",
                message: "Sucesfully retrieved trainer data",
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

export default {
    getAllTrainers,
    getTrainerById,
    addNewTrainer,
    updateTrainer,
    deleteTrainerById,
    searchTrainerByName,
};


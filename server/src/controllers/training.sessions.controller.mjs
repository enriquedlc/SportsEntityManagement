import trainingSessionsService from "../services/training.sessions.service.mjs";
import httpCodes from "../errors/httpCodes.mjs";
import utils from "../utils/utils.mjs";

const getAllTrainingSessions = async (req, res) => {
    try {
        const data = await trainingSessionsService.getAllTrainingSessions();
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: "OK",
            message:
                !data || data.length === 0
                    ? "TrainingSessions table is empty"
                    : "Sucesfully retrieved all training sessions",
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

const addNewTrainingSession = async (req, res) => {
    const { client_id, trainer_id, date, start_time, end_time, price_per_hour } = req.body;

    if (!client_id || !trainer_id || !date || !start_time || !end_time || !price_per_hour) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: "All fields are required",
            message: "All fields are required",
            data: null,
        });
    }

    try {
        const data = await trainingSessionsService.addNewTrainingSession(client_id, trainer_id, date, start_time, end_time, price_per_hour);
        return res.send({
            statusCode: httpCodes.CREATED,
            statusMessage: "CREATED",
            message: "Sucesfully created new training session",
            data,
        });
    }
    catch (err) {
        console.log(err);
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
    getAllTrainingSessions,
    addNewTrainingSession,
}

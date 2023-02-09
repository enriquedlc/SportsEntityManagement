import actorService from '../services/actor.service.mjs'
import httpCodes from '../errors/httpCodes.mjs'

const getAllActors = async (req, res) => {
    try {
        const data = await actorService.getAllActors()
        return res.send({
            statusCode: httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.lenght === 0
                    ? 'Actores table is empty'
                    : 'Sucesfully retrieved all actors',
            data
        })
    } catch (err) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            })
    }
}

const getActorById = async (req, res) => {
    const { id } = req.params

    if (!id) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Param id is required',
            message: 'Actor Id is needed',
            data: null
        })
    }

    try {
        const data = await actorService.getActorById(id)
        data === undefined
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: 'Actor is not found',
                data: null
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message: 'Sucesfully retrieved actor data',
                data
            })
    } catch (error) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            })
    }
}

const addNewActor = async (req, res) => {

    const { first_name, last_name } = req.body

    if (!first_name || !last_name) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Param is required',
            message: 'Actor param is required',
            data: null
        })
    }

    try {
        const data = await actorService.addNewActor(first_name, last_name)
        return res.send({
            statusCode: !data || data.lenght === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.lenght === 0
                    ? 'Actores is not found'
                    : 'Sucesfully retrieved actor data',
            data
        })
    } catch (error) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            })
    }
}

const updateActor = async (req, res) => {

    const { id } = req.params
    const { first_name, last_name } = req.body

    if (!id || id == ':id' || !first_name || !last_name) {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Param is required',
            message: 'Actor param is required',
            data: null
        })
    }

    try {
        const data = await actorService.updateActor(first_name, last_name, id)
        data.affectedRows == 0
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: `NOT FOUND`,
                message: 'Actor is not found',
                data: null
            })
            : res.send({
                statusCode: httpCodes.OK,
                statusMessage: 'OK',
                message: 'Sucesfully retrieved actor data',
                data
            })
    } catch (error) {
        return res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            })
    }
}

const deleteActorById = async (req, res) => {

    const { id } = req.params

    if (!id || id == ':id') {
        return res.status(httpCodes.BAD_REQUEST).send({
            statusCode: httpCodes.BAD_REQUEST,
            statusMessage: 'Param id is required',
            message: 'Actor Id is needed',
            data: null
        })
    }

    try {
        const data = await actorService.deleteActorById(id)
        console.log(data);
        data.affectedRows == 0
            ? res.status(httpCodes.NOT_FOUND).send({
                statusCode: httpCodes.NOT_FOUND,
                statusMessage: 'NOT FOUND',
                message: 'Actores is not found',
                data: null
            })
            : res.send({
                statusCode: !data || data.lenght === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
                statusMessage: 'OK',
                message:
                    !data || data.lenght === 0
                        ? 'Actores is not found'
                        : 'Sucesfully retrieved actor data',
                data
            })
    } catch (error) {
        console.log(error);
        return res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            })
    }
}

const searchActor = async (req, res) => {

    const condition = req.query.name

    try {
        const data = await actorService.searchActor(condition)
        res.send({
            statusCode: !data || data.lenght === 0 ? httpCodes.NOT_FOUND : httpCodes.OK,
            statusMessage: 'OK',
            message:
                !data || data.lenght === 0
                    ? 'Actores is not found'
                    : 'Sucesfully retrieved actor data',
            data: data.length === 0 ? `No names started on: ${condition}` : data
        })
    } catch (error) {
        res.status(httpCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: httpCodes.INTERNAL_SERVER_ERROR,
                statusMessage: 'Internal Server Error',
                message: null,
                data: null
            })
    }
}


export default {
    getAllActors,
    getActorById,
    addNewActor,
    updateActor,
    deleteActorById,
    searchActor
}
import { Router } from 'express'
import actorController from '../controllers/actor.controller.mjs'
import clientController from '../controllers/client.controller.mjs'
import trainerController from '../controllers/trainer.controller.mjs'
import trainingSessionController from '../controllers/training.sessions.controller.mjs'
import gymMachineController from '../controllers/gym.machines.controller.mjs'

const router = Router()

/****************
 * ACTOR ROUTER *
 ****************/

router.route('/actors')
    .get((req, res) => {
        req.query?.name ? actorController.searchActor(req, res) : actorController.getAllActors(req, res)
    })
    .post(actorController.addNewActor)


router.route('/actors/:id')
    .get(actorController.getActorById)
    .put(actorController.updateActor)
    .delete(actorController.deleteActorById)

/****************
 * CLIENT ROUTER *
 ****************/

router.route('/clients')
    .get((req, res) => {
        req.query?.name ? clientController.searchClientByName(req, res) : clientController.getAllClients(req, res)
    })
    .post(clientController.addNewClient)

router.route('/clients/:id')
    .get(clientController.getClientById)
    .put(clientController.updateClient)
    .delete(clientController.deleteClientById)

/****************
 * TRAINER ROUTER *
 ****************/

router.route('/trainers')
    .get((req, res) => {
        req.query?.name ? trainerController.searchTrainerByName(req, res) : trainerController.getAllTrainers(req, res)
    })
    .post(trainerController.addNewTrainer)

router.route('/trainers/:id')
    .get(trainerController.getTrainerById)
    .put(trainerController.updateTrainer)
    .delete(trainerController.deleteTrainerById)

/******************************
 * TRAINING SESSIONS ROUTER   *
 *****************************/

router.route('/trainingSessions')
    .get(trainingSessionController.getAllTrainingSessions)
    .post(trainingSessionController.addNewTrainingSession)

/****************
 * GYM MACHINES ROUTER *
 ***********************/

router.route('/gymMachines')
    .get(gymMachineController.getAllGymMachines)
    .post(gymMachineController.addNewGymMachine)

router.route('/gymMachines/:id')
    .get(gymMachineController.getGymMachineById)
    .put(gymMachineController.updateGymMachine)
    .delete(gymMachineController.deleteGymMachine)

export default router

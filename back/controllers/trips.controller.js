import * as tripService from "../services/trips.service.js"
import { handleError } from "../utils/handleError.js"

//lista los viajes del usuaro
export async function getTrips(req, res) {
    try {
        const viajes = await tripService.getTrips(req.user.id, req.query)
        res.status(200).json(viajes)
    } catch (error) {
        handleError(res, error)
    }
}

//muestra un viaje
export async function getTripById(req, res) {
    try {
        const viaje = await tripService.getTripById(req.params.id, req.user.id)
        res.status(200).json(viaje)
    } catch (error) {
        handleError(res, error)
    }
}

//crea un viaje
export async function saveTrip(req, res) {
    try {
        const viaje = await tripService.saveTrip(req.body, req.user.id)
        res.status(201).json(viaje)
    } catch (error) {
        handleError(res, error)
    }
}

//edita el viaje
export async function updateTrip(req, res) {
    try {
        const viaje = await tripService.updateTrip(req.params.id, req.body, req.user.id)
        res.status(200).json(viaje)
    } catch (error) {
        handleError(res, error)
    }
    
}

//borrado logico
export async function deleteTrip(req, res) {
    try {
        await tripService.deleteTrip(req.params.id, req.user.id)
        res.status(200).json({ message: "Viaje eliminado"})
    } catch (error){
        handleError(res, error)
    }
    
}
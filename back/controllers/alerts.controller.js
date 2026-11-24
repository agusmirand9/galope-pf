import * as alertService from "../services/alerts.service.js"
import { handleError } from "../utils/handleError.js"

// los avisos activos de todos los usuariso
export async function getAlerts(req, res) {
    try {
        const avisos = await alertService.getAlerts(req.user.id, req.query)
        res.status(200).json(avisos)
    } catch (error) {
        handleError(res, error)
    }
}

//un aviso por id
export async function getAlertById(req, res) {
    try {
        const aviso = await alertService.getAlertById(req.params.id, req.user.id)
        res.status(200).json(aviso)
    } catch (error) {
        handleError(res, error)
    }
}

// publicar un aviso
export async function saveAlert(req, res) {
    try {
        const aviso = await alertService.saveAlert(req.body, req.user)
        res.status(201).json(aviso)
    } catch (error) {
        handleError(res, error)
    }
}

//confirmar aviso
export async function confirmAlert(req, res) {
    try {
        const aviso = await alertService.confirmAlert(req.params.id, req.user.id)
        res.status(201).json(aviso)
    } catch (error) {
        handleError(res, error)
    }
}

//el dueño del aviso edita la descripcion
export async function updateAlert(req, res) {
    try {
        const aviso = await alertService.updateAlert(req.params.id, req.body, req.user.id)
        res.status(200).json(aviso)
    } catch (error) {
        handleError(res, error)
    }
}

// el dueño elimina su aviso, borrado logico
export async function deleteAlert(req, res) {
    try {
        await alertService.deleteAlert(req.params.id, req.user.id)
        res.status(200).json({ message: "Aviso eliminado" })
    } catch (error) {
        handleError(res, error)
    }
}
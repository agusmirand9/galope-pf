import * as userService from "../services/users.service.js"
import { handleError } from "../utils/handleError.js"

export async function saveUser(req, res) {
    try {
        const usuario = await userService.saveUser(req.body)
        res.status(201).json(usuario)
    } catch (error) {
        handleError(res, error)
    }
}

export async function login(req, res) {
    try {
        const usuario = await userService.login(req.body)
        res.status(200).json(usuario)
    } catch (error) {
        handleError(res, error)
    }
}
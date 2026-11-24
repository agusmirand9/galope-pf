import { HttpError } from "./httpError.js";

export function handleError(res,error) {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ message: error.message })
    }
    console.error(error)
    res.status(500).json({ message: "Error interno del servidor "})
}


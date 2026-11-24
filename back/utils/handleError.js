import { HttpError } from "./httpError.js"

export function handleError(res, error) {
    if (error instanceof HttpError) {
        return res.status(error.status).json({ message: error.message })
    }
    if (error.type === "entity.too.large") {
        return res.status(413).json({ message: "El cuerpo de la petición es demasiado grande" })
    }
    console.error(error)
    res.status(500).json({ message: "Error interno del servidor" })
}
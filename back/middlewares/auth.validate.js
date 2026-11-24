import * as tokenService from "../services/token.service.js"

export function validateToken(req, res, next) {
    const header = req.headers.authorization

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Falta el token de autenticación"})
    }

    const token = header.split(" ") [1]

    try {
        req.user = tokenService.validateToken(token)
        next()
    } catch (error) {
        const message = error.name === "TokenExpiredError"
            ? "La sesión expiró, volvé a iniciar sesión"
            : "Token inválido"
        res.status(401).json({ message })
    }


}
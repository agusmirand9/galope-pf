import jwt from "jsonwebtoken"

export function createToken(usuario) {
    return jwt.sign(
        { id: usuario._id.toString(), username: usuario.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h"}
    )
}

export function validateToken(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}
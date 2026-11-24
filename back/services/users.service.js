import bcrypt from "bcrypt"
import { db } from "../db.js"
import { HttpError } from "../utils/httpError.js"
import { createToken } from "./token.service.js"

const usuarios = db.collection("usuarios")

export async function saveUser(datos) {
    const email = datos.email.toLowerCase()

    const existente = await usuarios.findOne({
        $or: [{ email }, { username: datos.username }]
    })
    if (existente) {
        const campo = existente.email === email ? "El email" : "El nombre de usuario"
        throw new HttpError(409,`${campo} ya está en uso`) 
    }

    const usuario = {
        nombre: datos.nombre,
        username: datos.username,
        email,
        password: await bcrypt.hash(datos.password, 10),
        creadoEn: new Date()
    }

    try {
        const { insertedId  } = await usuarios.insertOne(usuario)
        return { _id: insertedId, nombre: usuario.nombre, username: usuario.username, email }
    } catch (error) {
        //codigo de mongodb, clave duplicada
        if (error.code === 11000) {
            throw new HttpError(409, "El email o el nombre de usuario ya esta en uso")
        }
        throw error 
    }

}

export async function login(datos) {
    const email = datos.email.toLowerCase()
    const usuario = await usuarios.findOne({ email})

    const passwordOk = usuario && await bcrypt.compare(datos.password, usuario.password)

    if (!passwordOk) throw new HttpError(401, "Email o contraseña incorrectos")
       
    return{
        _id: usuario._id,
        nombre: usuario.nombre,
        username: usuario.username,
        email: usuario.email,
        token: createToken(usuario)
    }


}
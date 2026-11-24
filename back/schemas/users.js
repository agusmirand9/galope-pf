import { z } from "zod"

export const registerSchema = z.object({
    nombre: z.string("El nombre es obligatorio")
        .trim()
        .min(3, "El nombre debe tener al menos 3 caracteres"),
    username: z.string("El nombre de usuario es obligatorio")
        .min(3, "El nombre de usuario debe tener al menos 3 caracteres")
        .max(20, "El nombre de usuario no puede superar los 20 caracteres")
        .regex(/^[a-zA-Z0-9_]+$/, "Usá solo letras, números y guion bajo"),
    email: z.email("Debe ser un email válido"),
    password: z.string("La contraseña es obligatoria")
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .max(72, "La contraseña no puede superar los 72 caracteres"),
    passwordConfirm: z.string("Tenés que confirmar la contraseña")
})
    .refine((datos) => datos.password === datos.passwordConfirm, {
        error: "Las contraseñas no coinciden",
        path: ["passwordConfirm"]
    })

export const loginSchema = z.object({
    email: z.email("Debe ser un email válido"),
    password: z.string("La contraseña es obligatoria")
        .min(1, "La contraseña es obligatoria")
})
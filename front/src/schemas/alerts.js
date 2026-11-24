import { z } from "zod"
import { coordsSchema } from "./coords.js"

export const ALERT_TYPES = ["ruta_cortada", "accidente", "obra_demora", "tramo_mal_estado", "ruta_libre"]

const descripcionSchema = z.string("La descripción debe ser un texto")
    .trim()
    .max(140, "La descripción no puede superar los 140 caracteres")

export const alertSchema = z.object({
    tipo: z.enum(ALERT_TYPES, "Tipo de aviso inválido"),
    descripcion: descripcionSchema.optional(),
    ubicacion: coordsSchema
})

export const alertUpdateSchema = z.object({
    descripcion: descripcionSchema
})
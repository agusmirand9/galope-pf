import { z } from "zod"
import { coordsSchema } from "./coords.js"

// el lugar en el mapa
const placeSchema = coordsSchema.extend({
    nombre: z.string("El nombre del lugar es obligatorio")
        .min(2, "El nombre del lugar es muy corto")
        .max(100, "El nombre del lugar es muy largo"),
})

//defino una parada apartir de un lugar, con dos datos mas, opcionales
const stopSchema = placeSchema.extend({
    categoria: z.enum(["servicio", "bano", "comida", "gomeria", "otro"], "Categoría de parada inválida").optional(),
    nota: z.string().max(200, "La nota no puede superar los 200 caracteres").optional()
})


export const VEHICLE_TYPES = ["auto", "camioneta", "combi", "moto"]
export const FUEL_TYPES = ["nafta", "gasoil", "gnc", "electrico"]

const dateSchema = (campo) => z.iso.date(`La fecha de ${campo} no es válida (AAAA-MM-DD)`)

export const tripSchema = z.object({
    origen: placeSchema,
    destino: placeSchema,

    fechaSalida: dateSchema("salida"),
    fechaRegreso: dateSchema("regreso"),

    //viajeros, minimo un adulto obligatorio, puede haber 0 menores
    viajeros: z.object({
        adultos: z.number("La cantidad de adultos es obligatoria")
            .int("Los adultos tiene que ser un número entero")
            .min(1, "Tiene que viajar minimo un adulto")
            .max(10, "Máximo 10 adultos"),
        menores: z.number("La cantidad de menores es obligatoria")
            .int("Los menores tienen que ser un número entero")
            .min(0, "Los menores no pueden ser negativos")
            .max(10, "Máximo 10 menores") 
    }),

    vehiculo: z.object({
        tipo: z.enum(VEHICLE_TYPES, "Tipo de vehículo inválido"),
        combustible: z.enum(FUEL_TYPES, "Tipo de combustible inválido")
    }),

    mascotas: z.boolean("Indicá si viajás con mascotas"),

    paradas: z.array(stopSchema).max(20, "Máximo 20 paradas").default([]),

    distanciaKm: z.number().positive("La distancia debe ser mayor a 0").optional(),
    duracionMin: z.number().positive("La duración debe ser mayor a 0").optional()

})

    .refine(
        (viaje) => viaje.origen.nombre !== viaje.destino.nombre,
        {
            error: "El origen y el destino no pueden ser el mismo",
            path: ["destino"]
        }
    )
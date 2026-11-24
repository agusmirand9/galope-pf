import { z } from "zod"

export const coordsSchema = z.object({
    lat: z.number("La latitud es obligatoria")
        .min(-90, "Latitud inválida")
        .max(90, "Latitud inválida"),
    lng: z.number("La longitud es obligatoria")
        .min(-180, "Longitud inválida")
        .max(180, "Longitud inválida")
})
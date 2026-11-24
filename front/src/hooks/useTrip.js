import { useEffect, useState } from "react"
import * as tripService from "../services/trips.service.js"


export default function useTrip(id) {
    const [intento, setIntento] = useState(0)
    const [resultado, setResultado] = useState({ clave: null, viaje: null, error: null })

    const clave = `${id}-${intento}`

    useEffect(() => {
        let cancelado = false

        tripService.getTripById(id)
            .then(viaje => {
                if (!cancelado) setResultado({ clave, viaje, error: null })
            })
            .catch(error => {
                if (!cancelado) setResultado({ clave, viaje: null, error: error.message })
            })

        return () => { cancelado = true }
    }, [id, clave])

    return {
        viaje: resultado.viaje,
        error: resultado.error,
        cargando: resultado.clave !== clave,
        reintentar: () => setIntento(n => n + 1),
    }
}
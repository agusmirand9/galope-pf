import { useEffect, useState } from "react"

export default function useGeolocation() {
    const [intento, setIntento] = useState(0)
    const [resultado, setResultado] = useState({ clave: null, ubicacion: null, error: null })

    const soportado = typeof navigator !== "undefined" && "geolocation" in navigator

    useEffect(() => {
        if (!soportado) return
        let cancelado = false

        navigator.geolocation.getCurrentPosition(
            pos => {
                if (cancelado) return
                setResultado({
                    clave: intento,
                    ubicacion: { lat: pos.coords.latitude, lng: pos.coords.longitude },
                    error: null
                })
            },
            () => {
                if (cancelado) return
                setResultado({
                    clave: intento,
                    ubicacion: null,
                    error: "No pudimos obtener tu ubicación. Revisá el permiso del navegador."
                })
            },
            { enableHighAccuracy: true, timeout: 10000 }
        )

        return () => { cancelado = true }
    }, [intento, soportado])

    const vigente = resultado.clave === intento

    return {
        ubicacion: vigente ? resultado.ubicacion : null,
        error: !soportado ? "Tu navegador no permite obtener la ubicación." : vigente ? resultado.error : null,
        buscando: soportado && !vigente,
        reintentar: () => setIntento(n => n + 1),
    }
}
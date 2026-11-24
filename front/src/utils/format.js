const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]

// cambio el formato de las fechas
export function formatDate(iso) {
    const [, mes, dia] = iso.split("-")
    return `${Number(dia)} ${MESES[Number(mes) - 1]}`
}

// cantidad de noches entre dos fechas 
export function countNights(salida, regreso) {
    const aMs = (iso) => {
        const [anio, mes, dia] = iso.split("-").map(Number)
        return Date.UTC(anio, mes - 1, dia)
    }
    return Math.round((aMs(regreso) - aMs(salida)) / 86400000)
}

// formato de horas
export function formatDuration(minutos) {
    const h = Math.floor(minutos / 60)
    const m = minutos % 60
    if (h === 0) return `${m} min`
    return m === 0 ? `${h} h` : `${h} h ${m} min`
}


export const NOMBRES_COMBUSTIBLE = { nafta: "Nafta", gasoil: "Gasoil", gnc: "GNC", electrico: "Eléctrico" }

export function capitalize(texto) {
    return texto[0].toUpperCase() + texto.slice(1)
}

export function plural(cantidad, uno, varios) {
    return `${cantidad} ${cantidad === 1 ? uno : varios}`
}

export function formatNights(noches) {
    return noches === 0 ? "en el día" : plural(noches, "noche", "noches")
}
//hace cuanto, tiempo
export function timeAgo(iso) {
    const min = Math.floor((Date.now() - new Date(iso).getTime()) / 60000)
    if (min < 1) return "recién"
    if (min < 60) return `hace ${min} min`
    const horas = Math.floor(min / 60)
    if (horas < 24) return `hace ${horas} h`
    return `hace ${plural(Math.floor(horas / 24), "día", "días")}`
}

// vencimiento
export function timeLeft(iso) {
    const min = Math.ceil((new Date(iso).getTime() - Date.now()) / 60000)
    if (min < 60) return `vence en ${Math.max(min, 1)} min`
    return `vence en ${Math.floor(min / 60)} h`
}

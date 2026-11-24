import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import * as tripService from "../../services/trips.service.js"
import Button from "../../components/Button.jsx"
import Eyebrow from "../../components/Eyebrow.jsx"
import Tabs from "../../components/Tabs.jsx"
import TripCard from "../../components/TripCard.jsx"
import Loading  from "../../components/Loading.jsx"
import ErrorMessage from "../../components/ErrorMessage.jsx"

const TABS = [
    { id: "proximos", label: "Próximos" },
    { id: "pasados", label: "Pasados" },
]

export default function MisViajes() {
    const [tab, setTab] = useState("proximos")
    const [intento, setIntento] = useState(0)
    const [resultado, setResultado] = useState({ clave: null, viajes: [], error: null })
    const clave = `${tab}-${intento}`
    const cargando = resultado.clave !== clave

    useEffect(() => {
        let cancelado = false

        tripService.getTrips(tab)
            .then(viajes => {
                if (!cancelado) setResultado({ clave, viajes, error: null })
            })
            .catch(error => {
                if (!cancelado) setResultado({ clave, viajes: [], error: error.message })
            })
        return () => { cancelado = true }
    }, [tab, clave])

    let contenido

    if (cargando) {
        contenido = <Loading />

    } else if (resultado.error) {
        contenido = <ErrorMessage message={resultado.error} onRetry={() => setIntento(n => n + 1)} />
    } else if (resultado.viajes.length === 0) {
        contenido = (
            <div className="space-y-4 py-10">
                <p className="text-marron/70">
                    {tab === "proximos"
                        ? "Todavía no tenés viajes próximos."
                        : "Todavía no tenés viajes pasados."}
                </p>
                {tab === "proximos" && <Button to="/viajes/nuevo">Crear viaje</Button>}
            </div>
        )
    } else {
        contenido = (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {resultado.viajes.map(viaje => <TripCard key={viaje._id} viaje={viaje} />)}
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-5xl space-y-8 p-5">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-3">
                    <Eyebrow>Mis viajes</Eyebrow>
                    <h1 className="text-3xl font-medium">Tus salidas</h1>
                </div>
                <Button to="/viajes/nuevo">
                    <Plus size={18} className="mr-2" aria-hidden="true" /> Nuevo viaje
                </Button>
            </div>

            <Tabs tabs={TABS} active={tab} onChange={setTab} />

            {contenido}
        </div>
    )
}
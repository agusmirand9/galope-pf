import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import * as alertService from "../../services/alerts.service.js"
import { ALERT_TYPES } from "../../schemas/alerts.js"
import { ALERT_INFO } from "../../utils/alertTypes.js"
import Button from "../../components/Button.jsx"
import Eyebrow from "../../components/Eyebrow.jsx"
import AlertCard from "../../components/AlertCard.jsx"
import Loading from "../../components/Loading.jsx"
import ErrorMessage from "../../components/ErrorMessage.jsx"
import SelectField from "../../components/SelectField.jsx"

const FILTROS = ALERT_TYPES.map(t => ({ value: t, label: ALERT_INFO[t].label }))

export default function Avisos() {
    const [tipo, setTipo] = useState("")
    const [intento, setIntento] = useState(0)
    const [resultado, setResultado] = useState({ clave: null, avisos: [], error: null })

    const clave = `${tipo}-${intento}`
    const cargando = resultado.clave !== clave

    useEffect(() => {
        let cancelado = false

        alertService.getAlerts(tipo)
            .then(avisos => {
                if (!cancelado) setResultado({ clave, avisos, error: null })
            })
            .catch(error => {
                if (!cancelado) setResultado({ clave, avisos: [], error: error.message })
            })

        return () => { cancelado = true }
    }, [tipo, clave])

    function actualizar(avisoNuevo) {
        setResultado(r => ({
            ...r,
            avisos: r.avisos.map(a => a._id === avisoNuevo._id ? avisoNuevo : a)
        }))
    }

    function quitar(id) {
        setResultado(r => ({ ...r, avisos: r.avisos.filter(a => a._id !== id) }))
    }

    let contenido
    if (cargando) {
        contenido = <Loading />
    } else if (resultado.error) {
        contenido = <ErrorMessage message={resultado.error} onRetry={() => setIntento(n => n + 1)} />
    } else if (resultado.avisos.length === 0) {
        contenido = (
            <p className="py-10 text-marron/70">
                {tipo ? "No hay avisos vigentes de ese tipo." : "No hay avisos vigentes en este momento."}
            </p>
        )
    } else {
        contenido = (
            <div>
                {resultado.avisos.map(aviso => (
                    <AlertCard key={aviso._id} aviso={aviso} onUpdate={actualizar} onDelete={quitar} />
                ))}
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-2xl space-y-8 p-5">
            <div className="flex items-end justify-between gap-4">
                <div className="space-y-3">
                    <Eyebrow>Avisos</Eyebrow>
                    <h1 className="text-3xl font-medium">Así está el camino</h1>
                </div>
                <Button to="/avisos/nuevo">
                    <Plus size={18} className="mr-2" aria-hidden="true" /> Publicar
                </Button>
            </div>

            <SelectField id="tipo" label="Filtrar por tipo" placeholder="Todos los tipos"
                options={FILTROS} value={tipo} onChange={e => setTipo(e.target.value)} />

            {contenido}
        </div>
    )
}
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import * as alertService from "../../services/alerts.service.js"
import { alertSchema, ALERT_TYPES } from "../../schemas/alerts.js"
import { ALERT_INFO } from "../../utils/alertTypes.js"
import useGeolocation from "../../hooks/useGeolocation.js"
import Button from "../../components/Button.jsx"
import Eyebrow from "../../components/Eyebrow.jsx"
import FormField from "../../components/FormField.jsx"
import SelectField from "../../components/SelectField.jsx"
import ErrorMessage from "../../components/ErrorMessage.jsx"


const formSchema = alertSchema.omit({ ubicacion: true })

const TIPOS = ALERT_TYPES.map(t => ({ value: t, label: ALERT_INFO[t].label }))

export default function NuevoAviso() {
    const navigate = useNavigate()
    const { ubicacion, error, buscando, reintentar } = useGeolocation()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema)
    })

    async function publicar(datos) {
        try {
            await alertService.saveAlert({
                tipo: datos.tipo,
                descripcion: datos.descripcion?.trim() || undefined,
                ubicacion
            })
            toast.success("Aviso publicado")
            navigate("/avisos")
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <div className="mx-auto max-w-md space-y-8 p-5">
            <div className="space-y-3">
                <Eyebrow>Publicar aviso</Eyebrow>
                <h1 className="text-3xl font-medium">¿Qué viste en el camino?</h1>
            </div>

            <form onSubmit={handleSubmit(publicar)} noValidate className="space-y-5">
                <SelectField id="tipo" label="Tipo de aviso" placeholder="Elegí un tipo" options={TIPOS}
                    error={errors.tipo?.message} {...register("tipo")} />
                <FormField id="descripcion" label="Descripción (opcional)" maxLength={140}
                    error={errors.descripcion?.message} {...register("descripcion")} />

                {buscando && <p className="text-sm text-marron/70">Buscando tu ubicación...</p>}
                {ubicacion && <p className="text-sm text-marron/70">Se publica en tu ubicación actual.</p>}
                {error && <ErrorMessage message={error} onRetry={reintentar} />}

                <div className="flex gap-3">
                    <Button type="submit" disabled={isSubmitting || !ubicacion}>
                        {isSubmitting ? "Publicando..." : "Publicar"}
                    </Button>
                    <Button variant="secondary" to="/avisos">Cancelar</Button>
                </div>
            </form>
        </div>
    )
}
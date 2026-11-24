import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Trash2 } from "lucide-react"
import { toast } from "react-toastify"
import * as alertService from "../services/alerts.service.js"
import { alertUpdateSchema } from "../schemas/alerts.js"
import { ALERT_INFO } from "../utils/alertTypes.js"
import { timeAgo, timeLeft, plural } from "../utils/format.js"
import Button from "./Button.jsx"
import Chip from "./Chip.jsx"
import FormField from "./FormField.jsx"

export default function AlertCard({ aviso, onUpdate, onDelete }) {
    const [editando, setEditando] = useState(false)
    const [ocupado, setOcupado] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(alertUpdateSchema),
        defaultValues: { descripcion: aviso.descripcion ?? "" }
    })

    const info = ALERT_INFO[aviso.tipo]
    const cantidad = aviso.cantidadConfirmaciones

    async function confirmar() {
        setOcupado(true)
        try {
            onUpdate(await alertService.confirmAlert(aviso._id))
        } catch (error) {
            toast.error(error.message)
        } finally {
            setOcupado(false)
        }
    }

    async function guardar(datos) {
        try {
            onUpdate(await alertService.updateAlert(aviso._id, datos))
            setEditando(false)
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function eliminar() {
        if (!window.confirm("¿Eliminar este aviso?")) return

        setOcupado(true)
        try {
            await alertService.deleteAlert(aviso._id)
            toast.success("Aviso eliminado")
            onDelete(aviso._id)
        } catch (error) {
            toast.error(error.message)
            setOcupado(false)
        }
    }

    return (
        <article className="space-y-3 border-t border-marron/15 py-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
                <Chip estado={info.estado}>{info.label}</Chip>
                <span className="text-xs text-marron/70">{timeLeft(aviso.venceEn)}</span>
            </div>

            {editando ? (
                <form onSubmit={handleSubmit(guardar)} noValidate className="space-y-3">
                    <FormField id={`descripcion-${aviso._id}`} label="Descripción" maxLength={140}
                        error={errors.descripcion?.message} {...register("descripcion")} />
                    <div className="flex gap-3">
                        <Button type="submit" disabled={isSubmitting}>Guardar</Button>
                        <Button type="button" variant="secondary" onClick={() => setEditando(false)}>
                            Cancelar
                        </Button>
                    </div>
                </form>
            ) : (
                <>
                    {aviso.descripcion && <p>{aviso.descripcion}</p>}
                    <p className="text-sm text-marron/70">
                        @{aviso.username}{aviso.creadoEn && ` · ${timeAgo(aviso.creadoEn)}`}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                        {aviso.esMio ? (
                            <>
                                <span className="text-sm text-marron/70">
                                    {plural(cantidad, "confirmación", "confirmaciones")}
                                </span>
                                <Button variant="secondary" onClick={() => setEditando(true)}>
                                    <Pencil size={18} className="mr-2" aria-hidden="true" /> Editar
                                </Button>
                                <Button variant="secondary" onClick={eliminar} disabled={ocupado}>
                                    <Trash2 size={18} className="mr-2" aria-hidden="true" /> Eliminar
                                </Button>
                            </>
                        ) : aviso.confirmadoPorMi ? (
                            <Button variant="secondary" disabled>Confirmado ({cantidad})</Button>
                        ) : (
                            <Button onClick={confirmar} disabled={ocupado}>Confirmar ({cantidad})</Button>
                        )}
                    </div>
                </>
            )}
        </article>
    )
}
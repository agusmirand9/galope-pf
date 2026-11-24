import { LoaderCircle } from "lucide-react"

export default function Loading() {
    return (
        <div role="status" className="flex justify-center py-16 text-marron/70">
            <LoaderCircle className="animate-spin" size={28} strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">Cargando...</span>
        </div>
    )
}
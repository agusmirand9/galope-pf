const estados = {
    rojo: { fondo: "bg-estado-rojo/15", punto: "bg-estado-rojo" },
    amarillo: { fondo: "bg-estado-amarillo/15", punto: "bg-estado-amarillo" },
    verde: { fondo: "bg-estado-verde/15", punto: "bg-estado-verde" },
}

export default function Chip({ estado, children }) {
    const { fondo, punto } = estados[estado]
    return (
        <span className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm ${fondo}`}>
            <i className={`size-2 rounded-full ${punto}`} />
            {children}
        </span>
    )
}
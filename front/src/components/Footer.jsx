import { Link } from "react-router"
import logoceleste from "../assets/logoceleste.png"

const columnas = [
    {
        titulo: "Galopé",
        links: [
            { href: "#como-funciona", label: "Cómo funciona" },
            { href: "#avisos", label: "Avisos" },
            { href: "#comunidad", label: "Comunidad" },
        ],
    },
    {
        titulo: "Cuenta",
        links: [
            { to: "/login", label: "Ingresar" },
            { to: "/register", label: "Crear cuenta" },
            { to: "/perfil", label: "Perfil" },
        ],
    },
    {
        titulo: "La app",
        links: [
            { to: "/viajes", label: "Mis viajes" },
            { to: "/viajes/nuevo", label: "Nuevo viaje" },
            { to: "/avisos", label: "Avisos del camino" },
            { to: "/avisos/nuevo", label: "Publicar aviso" },
        ],
    },
]

export default function Footer() {
    return (
        <footer className="mt-20 bg-marron px-5 py-12 text-celeste">
            
            <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:justify-between">
                <div className="space-y-2">
                    <Link to="/">
                        <img src={logoceleste} alt="Galopé" className="h-8 w-auto" />
                    </Link>
                    <p className="text-sm">Viajá por las rutas argentinas, bien acompañado.</p>
                </div>

                <nav className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3 md:gap-12">
                    {columnas.map(({ titulo, links }) => (
                        <div key={titulo} className="space-y-3">
                            <p className="text-xs font-medium uppercase tracking-wider text-celeste/70">
                                {titulo}
                            </p>
                            <ul className="space-y-2">
                                {links.map(({ to, href, label }) => (
                                    <li key={label}>
                                        {to
                                            ? <Link to={to}>{label}</Link>
                                            : <a href={href}>{label}</a>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </footer>
    )
}
import { Link, NavLink } from "react-router"
import { Route, TriangleAlert, User } from "lucide-react"
import { useSession } from "../context/session.context.js"

const links = [
    { to: "/viajes", label: "Viajes", Icon: Route },
    { to: "/avisos", label: "Avisos", Icon: TriangleAlert },
    { to: "/perfil", label: "Perfil", Icon: User },
]

const linkClass = ({ isActive }) =>
    isActive ? "font-semibold text-azul" : "text-marron/70"

const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center gap-1 text-xs ${linkClass({ isActive })}`

export default function Nav() {
    const { usuario } = useSession()

    return (
        <>
            <header className="flex items-center justify-between px-5 py-4">
                <Link to="/" className="font-titulo text-lg">GALOPÉ</Link>

                {usuario ? (
                    <nav className="hidden gap-6 text-sm md:flex">
                        {links.map(({ to, label }) => (
                            <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
                        ))}
                    </nav>
                ) : (
                    <nav className="flex gap-5 text-sm">
                        <Link to="/login" className="text-marron/70">Ingresar</Link>
                        <Link to="/register" className="font-medium">Crear cuenta</Link>
                    </nav>
                )}
            </header>

            {usuario && (
                <nav className="fixed inset-x-0 bottom-0 flex justify-around border-t border-marron/15 bg-celeste-claro py-3 md:hidden">
                    {links.map(({ to, label, Icon }) => (
                        <NavLink key={to} to={to} className={mobileLinkClass}>
                            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                            {label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </>
    )
}
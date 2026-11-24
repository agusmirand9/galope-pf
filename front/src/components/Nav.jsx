import { Link, NavLink } from "react-router"
import { Route, TriangleAlert, User } from "lucide-react"
import { useSession } from "../context/session.context.js"
import logo from "../assets/logo.svg"

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
            <header className="sticky top-4 z-50 flex justify-center px-5 ">
                <div className="flex items-center gap-3 rounded-2xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur md:gap-5">
                    <Link to="/" className="shrink-0 pl-1">
                        <img src={logo} alt="Galopé" className="h-7 w-auto" />
                    </Link>

                    {usuario ? (
                        <nav className="hidden items-center gap-4 text-sm md:flex">
                            {links.map(({ to, label }) => (
                                <NavLink key={to} to={to} className={linkClass}>{label}</NavLink>
                            ))}
                        </nav>
                    ) : (
                        <>
                            <nav className="hidden items-center gap-4 text-sm md:flex">
                                <a href="/#como-funciona" className="text-marron/70 transition hover:text-marron">
                                    Cómo funciona
                                </a>
                                <Link to="/login" className="text-marron/70 transition hover:text-marron">
                                    Ingresar
                                </Link>
                            </nav>
                            <Link
                                to="/register"
                                className="rounded-xl bg-marron px-4 py-2 text-sm font-medium text-crema transition hover:bg-marron/90"
                            >
                                Crear cuenta
                            </Link>
                        </>
                    )}
                </div>
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
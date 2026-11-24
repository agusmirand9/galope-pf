import { Link } from "react-router"
import logoceleste from "../assets/logoceleste.svg"

export default function Footer() {
    return (
        <footer className="mt-20 bg-marron px-5 py-12 text-celeste">
            <div className="mx-auto flex max-w-5xl flex-col gap-8 md:flex-row md:justify-between">
                <div className="space-y-2">
                    <Link to="/">
                       <img src={logoceleste} alt="Galopé" className="h-8 w-auto" />
                    </Link>
                    <p className="text-sm">Viajá por las rutas argentinas, bien acompañado.</p>
                </div>
                <nav className="flex gap-6 text-sm">
                    <a href="#como-funciona">Cómo funciona</a>
                    <Link to="/login">Ingresar</Link>
                    <Link to="/register">Crear cuenta</Link>
                </nav>
            </div>
        </footer>
    )
}
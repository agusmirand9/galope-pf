import { Link } from "react-router"

export default function Card({ to, children }) {
    return (
        <article className="space-y-3">
            <Link to={to} className="block" aria-hidden="true" tabIndex={-1}>
                <div className="aspect-4/3 rounded-xl bg-linear-to-br from-azul/8 to-azul/24" />
            </Link>
            {children}
        </article>
    )
}
import { Link } from "react-router"

const variants = {
    primary: "bg-marron text-celeste-claro",
    secondary: "border border-marron/25 text-marron",
    inverted: "bg-celeste-claro text-marron",
}

export default function Button({ variant = "primary", to, className = "", children, ...props }) {
    const classes = `inline-flex h-12 items-center justify-center rounded-xl px-6 font-medium disabled:opacity-50 ${variants[variant]} ${className}`

    if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
    return <button className={classes} {...props}>{children}</button>
}
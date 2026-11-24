import { Navigate, Outlet } from "react-router"
import { useSession } from "../context/session.context.js"

export default function ProtectedRoute() {
    const { usuario } = useSession()

    return usuario ? <Outlet /> : <Navigate to="/login" replace />
}
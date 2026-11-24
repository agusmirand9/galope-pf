import { Suspense } from "react"
import { Outlet } from "react-router"
import { ToastContainer } from "react-toastify"
import Nav from "./Nav.jsx"
import Loading from "./Loading.jsx"

export default function Layout() {
    return (
        <div className="min-h-screen pb-20 md:pb-0">
            <Nav />
            <main>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar closeButton={false} />
        </div>
    )
}
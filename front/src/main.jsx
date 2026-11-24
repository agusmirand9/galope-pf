/* eslint-disable react-refresh/only-export-components */
import { StrictMode, lazy } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./index.css"
import SessionProvider from "./context/SessionProvider.jsx"
import Layout from "./components/Layout.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import RouteError from "./components/RouteError.jsx"


const Home = lazy(() => import("./pages/Home.jsx"))
const Login = lazy(() => import("./pages/auth/Login.jsx"))
const Register = lazy(() => import("./pages/auth/Register.jsx"))
const MisViajes = lazy(() => import("./pages/viajes/MisViajes.jsx"))
const Avisos = lazy(() => import("./pages/avisos/Avisos.jsx"))
const Perfil = lazy(() => import("./pages/Perfil.jsx"))
const NotFound = lazy(() => import("./pages/NotFound.jsx"))
const NuevoViaje = lazy(() => import("./pages/viajes/NuevoViaje.jsx"))
const DetalleViaje = lazy(() => import("./pages/viajes/DetalleViaje.jsx"))
const EditarViaje = lazy(() => import("./pages/viajes/EditarViaje.jsx"))
const NuevoAviso = lazy(() => import("./pages/avisos/NuevoAviso.jsx"))



const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                errorElement: <RouteError />,
                children: [
                    // publicas
                    { index: true, element: <Home /> },
                    { path: "login", element: <Login /> },
                    { path: "register", element: <Register /> },

                    // privadas
                    {
                        element: <ProtectedRoute />,
                        children: [
                            { path: "viajes", element: <MisViajes /> },
                            { path: "avisos", element: <Avisos /> },
                            { path: "avisos/nuevo", element: <NuevoAviso /> },
                            { path: "perfil", element: <Perfil /> },
                            { path: "viajes/nuevo", element: <NuevoViaje /> },
                            { path: "viajes/:id", element: <DetalleViaje /> },
                            { path: "viajes/:id/editar", element: <EditarViaje /> },
                        ],
                    },

                    { path: "*", element: <NotFound /> },
                ],
            },
        ],
    },
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <SessionProvider>
            <RouterProvider router={router} />
        </SessionProvider>
    </StrictMode>
)
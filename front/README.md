# GALOPÉ: frontend
Aplicación React de GALOPÉ. Consume la API que está en `../back`.

## Cómo levantarlo

Requisitos: Node.js 20 o superior y la API corriendo (ver `../back/README.md`).

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Crear `front/.env` copiando `.env.example`:

   | Variable | Qué es |
   |---|---|
   | `VITE_API_URL` | URL de la API, por ejemplo `http://localhost:2026/api` |

3. Iniciar en modo desarrollo:
   ```
   npm run dev
   ```
   La app se abre en `http://localhost:5173`.

## Estructura

```
src/
├── components/   piezas reutilizables (Button, Nav, formularios, tarjetas...)
├── context/      sesión del usuario (Context API)
├── hooks/        useTrip, useGeolocation
├── pages/        una por pantalla (auth, viajes, avisos, perfil, home)
├── schemas/      esquemas de Zod, los mismos que usa la API
├── services/     toda la comunicación con la API (las vistas no hacen fetch)
├── utils/        formato de fechas, destinos, almacenamiento local
└── main.jsx      rutas de la aplicación
```

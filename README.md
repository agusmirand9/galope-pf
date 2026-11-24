# GALOPÉ

Aplicación web para planificar viajes en auto por las rutas argentinas y ver
avisos del estado del camino, publicados y confirmados por la comunidad de viajeros.

## Qué se puede hacer

- **Crear una cuenta e iniciar sesión.** Las contraseñas se guardan encriptadas y la
  sesión dura 2 horas.
- **Mis viajes.** Crear, ver, editar y eliminar viajes (origen, destino, fechas,
  viajeros, vehículo y mascotas). Se separan en Próximos y Pasados.
- **Avisos del camino.** Publicar un aviso en tu ubicación actual (ruta cortada,
  accidente, obra o demora, tramo en mal estado, ruta libre), filtrarlos por tipo,
  confirmar los de otras personas (una sola vez por persona), y editar o eliminar
  los propios. Cada aviso vence a las 24 horas si nadie lo confirma.

## Tecnologías

| Backend | Node.js, Express 5, MongoDB (driver oficial), JWT, bcrypt, Zod |
| Frontend | React 19, Vite, React Router, React Hook Form, Zod, Tailwind CSS 4, Lucide, React Toastify |

## Estructura

```
galope/
├── back/    API REST (ver back/README.md)
└── front/   aplicación React (ver front/README.md)
```

El backend y el frontend son proyectos independientes: cada uno tiene su
`package.json` y se levanta por separado.

## Cómo levantar el proyecto

Requisitos: Node.js 22.22 o superior y una base de datos MongoDB (por ejemplo,
un cluster gratuito en MongoDB Atlas).

### 1. Backend

```
cd back
npm install
```

Crear el archivo `back/.env` copiando `back/.env.example`:

| Variable | Qué es |
|---|---|
| `PORT` | Puerto de la API (2026) |
| `MONGO_URI` | Cadena de conexión a MongoDB |
| `DB_NAME` | Nombre de la base de datos (`galope`) |
| `JWT_SECRET` | Clave secreta para firmar los tokens |

Después:

```
npm run dev
```

Para comprobar que funciona, abrir `http://localhost:2026/api`.

### 2. Frontend

En otra terminal:

```
cd front
npm install
```

Crear el archivo `front/.env` copiando `front/.env.example`:

| Variable | Qué es |
|---|---|
| `VITE_API_URL` | URL de la API (`http://localhost:2026/api`) |

Después:

```
npm run dev
```

Abrir `http://localhost:5173`.

Los archivos `.env` no están en el repositorio: se entregan aparte.

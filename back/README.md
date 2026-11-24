# GALOPÉ: API (backend)

API REST de GALOPÉ, una aplicación para planificar viajes en auto por las rutas
argentinas, con avisos de ruta publicados y confirmados por la comunidad de viajeros.

## Tecnologías

Node.js, Express 5, MongoDB, JWT,
bcrypt para encriptar contraseñas y Zod para validar datos.

## Requisitos

- Node.js 20 o superior
- Una base de datos MongoDB

## Cómo levantar el proyecto

1. Instalar las dependencias:
   ```
   npm install
   ```
2. Crear un archivo `.env` en esta carpeta, copiando `.env.example` y completando los valores:

   | Variable | Qué es |
   |---|---|
   | `PORT` | Puerto del servidor (por defecto 2026) |
   | `MONGO_URI` | Cadena de conexión a MongoDB |
   | `DB_NAME` | Nombre de la base de datos (`galope`) |
   | `JWT_SECRET` | Clave secreta para firmar los tokens |

3. Iniciar el servidor:
   ```
   npm run dev    
   npm start 
   ```
4. Comprobar que funciona: abrir `http://localhost:2026/api`.

## Autenticación

Las rutas privadas requieren el header `Authorization: Bearer <token>`.
El token se obtiene al iniciar sesión y vence a las 2 horas.

## Endpoints

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/usuarios` | No | Registrar una cuenta |
| POST | `/api/usuarios/login` | No | Iniciar sesión (devuelve el token) |
| GET | `/api/viajes?estado=proximos\|pasados` | Sí | Listar mis viajes |
| GET | `/api/viajes/:id` | Sí | Ver un viaje |
| POST | `/api/viajes` | Sí | Crear un viaje |
| PUT | `/api/viajes/:id` | Sí | Editar un viaje (se envía completo) |
| DELETE | `/api/viajes/:id` | Sí | Eliminar un viaje |
| GET | `/api/avisos?tipo=` | Sí | Listar avisos vigentes |
| GET | `/api/avisos/:id` | Sí | Ver un aviso |
| POST | `/api/avisos` | Sí | Publicar un aviso |
| POST | `/api/avisos/:id/confirmaciones` | Sí | Confirmar un aviso (una vez por persona) |
| PATCH | `/api/avisos/:id` | Sí | Editar la descripción (solo el autor) |
| DELETE | `/api/avisos/:id` | Sí | Eliminar un aviso (solo el autor) |

Todas las respuestas de error tienen el formato `{ "message": "..." }`.

## Estructura

```
back/
├── main.js          punto de entrada
├── db.js            conexión a MongoDB e índices
├── routes/          URLs de cada recurso
├── controllers/     reciben la petición y responden
├── services/        lógica y acceso a la base de datos
├── middlewares/     validación de datos y del token
├── schemas/         esquemas de validación (Zod)
└── utils/           errores y funciones de apoyo
```
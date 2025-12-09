# FEC Chatbot Demo

Proyecto de chatbot con frontend en TypeScript + Tailwind CSS y backend en Node.js.

## 📁 Estructura del Proyecto

```
FEC_chatbot_demo/
├── frontend/              # Frontend del chatbot
│   ├── src/
│   │   ├── components/   # Componentes React/TypeScript
│   │   ├── main.ts       # Punto de entrada
│   │   └── style.css     # Estilos con Tailwind
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/               # Backend del chatbot
│   ├── src/
│   │   ├── controllers/  # Controladores
│   │   ├── routes/       # Rutas de la API
│   │   ├── services/     # Lógica de negocio
│   │   ├── middleware/   # Middlewares personalizados
│   │   ├── server.js     # Servidor Express
│   │   └── index.js      # Scripts adicionales
│   ├── package.json
│   └── .env.example
│
├── shared/                # Código compartido (opcional)
│   └── src/
│
└── package.json           # Configuración del monorepo
```

## 🚀 Instalación

### Opción 1: Instalar todo desde la raíz (recomendado)

```bash
npm run install:all
```

### Opción 2: Instalar por separado

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

## ⚙️ Configuración

1. Copia el archivo de ejemplo de variables de entorno:
```bash
cp backend/.env.example backend/.env
```

2. Edita `backend/.env` y agrega tu API key de OpenAI si deseas usarla:
```
OPENAI_API_KEY=tu_api_key_aqui
```

## 🏃 Ejecución

### Desarrollo

**Ejecutar frontend y backend por separado:**

```bash
# Terminal 1 - Backend
npm run dev:backend
# o
cd backend && npm run dev

# Terminal 2 - Frontend
npm run dev:frontend
# o
cd frontend && npm run dev
```

**O ejecutar ambos desde la raíz:**
```bash
npm run dev
```

### Producción

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📝 Endpoints del Backend

- `GET /health` - Verificar estado del servidor
- `POST /api/chat` - Enviar mensaje al chatbot
  ```json
  {
    "message": "Hola, ¿cómo estás?"
  }
  ```

## 🛠️ Tecnologías

### Frontend
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express
- CORS
- dotenv

## 📦 Agregar Funcionalidades al Backend

### Agregar una nueva ruta:

1. Crea el controlador en `backend/src/controllers/`
2. Crea la ruta en `backend/src/routes/`
3. Agrega el servicio en `backend/src/services/` si es necesario
4. Registra la ruta en `backend/src/server.js`

### Ejemplo:

**`backend/src/routes/users.routes.js`**
```javascript
import express from 'express';
import { usersController } from '../controllers/users.controller.js';

const router = express.Router();
router.get('/', usersController.getAll);
export default router;
```

**`backend/src/server.js`**
```javascript
import usersRoutes from './routes/users.routes.js';
app.use('/api/users', usersRoutes);
```

## 🔧 Desarrollo

- Frontend corre en: `http://localhost:3000`
- Backend corre en: `http://localhost:3001`

## 📄 Licencia

MIT


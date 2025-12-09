# FEC Chatbot Demo

Proyecto de chatbot con frontend en TypeScript + Tailwind CSS y backend en Node.js.

## 📁 Estructura del Proyecto

```
FEC_chatbot_demo/
├── api/                   # Funciones serverless de Vercel
│   ├── chat/             # Endpoints del chatbot
│   │   ├── init.js       # GET /api/chat/init
│   │   └── index.js      # POST /api/chat
│   ├── health.js         # GET /api/health
│   └── services/         # Servicios compartidos
│       └── chat.service.js
│
├── frontend/              # Frontend del chatbot
│   ├── src/
│   │   ├── components/   # Componentes TypeScript
│   │   ├── main.ts       # Punto de entrada
│   │   └── style.css     # Estilos con Tailwind
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── vercel.json           # Configuración de Vercel
└── package.json          # Configuración del monorepo
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


## ⚙️ Configuración

Para desarrollo local, crea un archivo `.env` en la raíz con:
```
APIKEY=tu_api_key_de_openai_aqui
```

**Nota:** Para producción en Vercel, configura `APIKEY` en el dashboard de Vercel (Settings > Environment Variables).

## 🏃 Ejecución

### Desarrollo Local

**Opción 1: Solo frontend (sin API)**
```bash
npm run dev:frontend
# o
cd frontend && npm run dev
```

**Opción 2: Frontend + API serverless (recomendado)**
```bash
# Instala Vercel CLI si no lo tienes
npm i -g vercel

# Ejecuta todo (frontend + funciones serverless)
npm run dev
# o
vercel dev
```

Esto iniciará:
- Frontend en `http://localhost:3000`
- Funciones serverless en `http://localhost:3000/api/*`

### Producción

El proyecto se deployea completo en Vercel. Consulta `DEPLOY_VERCEL.md` para instrucciones.

## 📝 Endpoints de la API

- `GET /api/health` - Verificar estado del servidor
- `GET /api/chat/init` - Inicializar conversación
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

### Backend (Funciones Serverless)
- Node.js
- Funciones serverless de Vercel
- OpenAI API

## 📦 Agregar Funcionalidades a la API

### Agregar un nuevo endpoint:

1. Crea un archivo en `api/` (ej: `api/users/index.js`)
2. Exporta una función `handler` que recibe `req` y `res`
3. Vercel automáticamente creará la ruta `/api/users`

### Ejemplo:

**`api/users/index.js`**
```javascript
export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ users: [] });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}
```

Esto creará automáticamente `GET /api/users`

## 🔧 Desarrollo

- Frontend corre en: `http://localhost:3000`
- API serverless corre en: `http://localhost:3000/api/*` (con `vercel dev`)

## 🚀 Deploy

Para deployear el proyecto completo en Vercel, consulta el archivo `DEPLOY_VERCEL.md` para instrucciones detalladas.

## 📄 Licencia

MIT


# 💒 Wedding Planner - Aplicación de Planificación de Bodas

Una aplicación completa para la gestión profesional de bodas y eventos, desarrollada con las mejores tecnologías modernas.

## 🚀 Características Principales

### 👥 **Gestión de Usuarios**
- Registro e inicio de sesión seguro
- Perfiles de usuario personalizables
- Roles de usuario (cliente/proveedor/admin)

### 🎉 **Gestión de Eventos**
- Creación y edición de eventos
- Calendario interactivo
- Lista de invitados con confirmaciones
- Checklist de tareas
- Presupuesto y gastos

### 🏢 **Directorio de Proveedores**
- Catálogo completo de proveedores
- Búsqueda y filtros avanzados
- Sistema de calificaciones y reseñas
- Gestión de solicitudes

### 💰 **Sistema de Pagos**
- Seguimiento de pagos
- Distribución automática
- Reportes financieros
- Integración con PayPal

### 📱 **Interfaz Moderna**
- Diseño responsive
- Experiencia de usuario optimizada
- Componentes reutilizables
- Animaciones fluidas

## 🛠️ Tecnologías Utilizadas

### **Backend**
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticación
- **Winston** - Logging
- **Swagger** - Documentación API

### **Frontend**
- **React 18** - Biblioteca de UI
- **Tailwind CSS** - Framework CSS
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Framer Motion** - Animaciones
- **React Hook Form** - Formularios
- **React Big Calendar** - Calendario

## 📁 Estructura del Proyecto

```
wedding-planner/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── controllers/     # Controladores
│   │   ├── models/         # Modelos de datos
│   │   ├── routes/         # Rutas de API
│   │   ├── middleware/     # Middleware personalizado
│   │   ├── validations/    # Validaciones
│   │   └── utils/          # Utilidades
│   ├── scripts/           # Scripts de utilidad
│   ├── uploads/           # Archivos subidos
│   └── logs/              # Logs del sistema
├── frontend/              # Aplicación React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/         # Páginas de la aplicación
│   │   ├── contexts/      # Contextos de React
│   │   ├── services/      # Servicios de API
│   │   └── styles/        # Estilos globales
│   └── public/            # Archivos públicos
└── docker-compose.yml    # Configuración Docker
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+
- MongoDB 6.0+
- Git

### **Instalación Local**

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/wedding-planner.git
cd wedding-planner
```

2. **Configurar Backend**
```bash
cd backend
npm install
cp env-template.txt .env
# Editar .env con tus configuraciones
npm run dev
```

3. **Configurar Frontend**
```bash
cd frontend
npm install
# Crear .env con REACT_APP_API_URL=http://localhost:5000/api
npm start
```

### **Instalación con Docker**

```bash
# Clonar y configurar
git clone https://github.com/tu-usuario/wedding-planner.git
cd wedding-planner

# Ejecutar con Docker Compose
docker-compose up -d
```

## 🌐 Despliegue en Producción

### **Plataformas Recomendadas**

#### **Backend: Render.com**
- ✅ Deploy automático desde GitHub
- ✅ Variables de entorno fáciles
- ✅ SSL automático
- ✅ Plan gratuito disponible

#### **Frontend: Vercel**
- ✅ Optimización automática
- ✅ CDN global
- ✅ Deploy automático
- ✅ Analytics incluido

#### **Base de Datos: MongoDB Atlas**
- ✅ Base de datos en la nube
- ✅ Backup automático
- ✅ Escalabilidad
- ✅ Plan gratuito disponible

### **Configuración de Despliegue**

1. **Configurar MongoDB Atlas**
   - Crear cluster gratuito
   - Configurar usuario y contraseña
   - Obtener connection string

2. **Desplegar Backend en Render**
   - Conectar repositorio GitHub
   - Configurar variables de entorno
   - Deploy automático

3. **Desplegar Frontend en Vercel**
   - Conectar repositorio GitHub
   - Configurar variables de entorno
   - Deploy automático

## 📚 Documentación de API

La documentación completa de la API está disponible en:
- **Desarrollo**: `http://localhost:5000/api-docs`
- **Producción**: `https://tu-backend.onrender.com/api-docs`

### **Endpoints Principales**

#### **Autenticación**
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil de usuario

#### **Eventos**
- `GET /api/events` - Listar eventos
- `POST /api/events` - Crear evento
- `PUT /api/events/:id` - Actualizar evento
- `DELETE /api/events/:id` - Eliminar evento

#### **Proveedores**
- `GET /api/providers` - Listar proveedores
- `POST /api/providers` - Crear proveedor
- `GET /api/providers/search` - Buscar proveedores

#### **Pagos**
- `POST /api/payments` - Crear pago
- `GET /api/payments` - Listar pagos
- `POST /api/payments/:id/distribute` - Distribuir pago

## 🔧 Configuración de Variables de Entorno

### **Backend (.env)**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/wedding-planner
JWT_SECRET=tu-jwt-secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📊 Monitoreo y Logs

- **Logs del Backend**: `backend/logs/`
- **Métricas de Render**: Dashboard de Render
- **Analytics de Vercel**: Dashboard de Vercel
- **MongoDB Atlas**: Dashboard de Atlas

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollo**: Wedding Planner Team
- **Diseño**: UI/UX Team
- **Backend**: Node.js Team
- **Frontend**: React Team

## 📞 Soporte

Para soporte técnico o preguntas:
- 📧 Email: support@weddingplanner.com
- 🐛 Issues: GitHub Issues
- 📖 Documentación: `/api-docs`

---

**¡Planifica la boda perfecta con Wedding Planner! 💒✨**
# 🚀 Guía de Despliegue - Wedding Planner App

## 📋 Resumen del Proyecto

**Wedding Planner** es una aplicación completa de planificación de bodas y eventos con:
- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React + Tailwind CSS
- **Características**: Gestión de eventos, proveedores, pagos, invitados, checklist

## 🏗️ Arquitectura del Proyecto

```
wedding-planner/
├── backend/          # API Node.js/Express
├── frontend/         # React App
├── docker-compose.yml # Para desarrollo local
└── DEPLOYMENT.md     # Esta guía
```

## 🌐 Recomendaciones de Plataformas

### 🎯 **OPCIÓN RECOMENDADA**

#### **Backend: Render.com**
- ✅ **Gratis** para empezar
- ✅ **Fácil configuración** con GitHub
- ✅ **Auto-deploy** desde repositorio
- ✅ **MongoDB Atlas** integrado
- ✅ **Variables de entorno** fáciles
- ✅ **Logs** incluidos
- ✅ **SSL** automático

#### **Frontend: Vercel**
- ✅ **Gratis** y muy rápido
- ✅ **Optimización automática**
- ✅ **CDN global**
- ✅ **Deploy automático** desde GitHub
- ✅ **Preview deployments**
- ✅ **Analytics** incluido

#### **Base de Datos: MongoDB Atlas**
- ✅ **Gratis** (512MB)
- ✅ **Escalable**
- ✅ **Backup automático**
- ✅ **Monitoreo** incluido

---

### 🔄 **ALTERNATIVAS**

#### **Opción 2: Todo en Railway**
- Backend + Frontend + MongoDB
- Más simple, todo en una plataforma
- Plan gratuito disponible

#### **Opción 3: AWS/GCP/Azure**
- Más control y escalabilidad
- Requiere más configuración
- Costos variables

---

## 🚀 Pasos para Despliegue

### 1️⃣ **Preparar Repositorio**

```bash
# Crear repositorio en GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/tu-usuario/wedding-planner.git
git push -u origin main
```

### 2️⃣ **Configurar MongoDB Atlas**

1. Crear cuenta en [MongoDB Atlas](https://cloud.mongodb.com)
2. Crear cluster gratuito
3. Configurar usuario y contraseña
4. Obtener connection string
5. Configurar IP whitelist (0.0.0.0/0 para desarrollo)

### 3️⃣ **Desplegar Backend en Render**

1. Conectar cuenta de GitHub a Render
2. Crear nuevo "Web Service"
3. Seleccionar repositorio
4. Configurar:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: `backend`

#### Variables de Entorno en Render:
```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/wedding-planner
JWT_SECRET=tu-jwt-secret-super-seguro
JWT_EXPIRE=7d
FRONTEND_URL=https://tu-frontend.vercel.app
```

### 4️⃣ **Desplegar Frontend en Vercel**

1. Conectar cuenta de GitHub a Vercel
2. Importar proyecto
3. Configurar:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

#### Variables de Entorno en Vercel:
```env
REACT_APP_API_URL=https://tu-backend.onrender.com/api
```

### 5️⃣ **Configurar Dominios (Opcional)**

- **Backend**: `api.tudominio.com`
- **Frontend**: `tudominio.com`
- Configurar DNS en tu proveedor

---

## 🐳 Despliegue con Docker (Alternativo)

### Para desarrollo local:
```bash
docker-compose up -d
```

### Para producción:
```bash
# Backend
docker build -t wedding-backend ./backend
docker run -p 5000:5000 wedding-backend

# Frontend
docker build -t wedding-frontend ./frontend
docker run -p 3000:80 wedding-frontend
```

---

## 🔧 Configuración Post-Despliegue

### 1️⃣ **Configurar CORS**
- Actualizar `FRONTEND_URL` en backend
- Verificar que las URLs coincidan

### 2️⃣ **Configurar Base de Datos**
- Ejecutar scripts de inicialización
- Importar datos de prueba si es necesario

### 3️⃣ **Configurar Dominio Personalizado**
- Configurar DNS
- Actualizar variables de entorno
- Configurar SSL

### 4️⃣ **Monitoreo**
- Configurar logs
- Configurar alertas
- Configurar backups

---

## 📊 Monitoreo y Mantenimiento

### **Render (Backend)**
- Logs en tiempo real
- Métricas de rendimiento
- Alertas por email

### **Vercel (Frontend)**
- Analytics de rendimiento
- Métricas de usuarios
- Deploy previews

### **MongoDB Atlas**
- Métricas de base de datos
- Alertas de uso
- Backup automático

---

## 🚨 Consideraciones de Seguridad

1. **Variables de Entorno**: Nunca commitear `.env`
2. **JWT Secret**: Usar secretos fuertes y únicos
3. **CORS**: Configurar correctamente
4. **Rate Limiting**: Ya implementado
5. **HTTPS**: Automático en Render/Vercel
6. **MongoDB**: Configurar IP whitelist

---

## 💰 Costos Estimados

### **Gratis (Para empezar)**
- Render: $0/mes (plan gratuito)
- Vercel: $0/mes (plan gratuito)
- MongoDB Atlas: $0/mes (512MB)

### **Escalado (Cuando crezca)**
- Render: $7/mes (plan starter)
- Vercel: $20/mes (plan pro)
- MongoDB Atlas: $9/mes (M2 cluster)

---

## 🆘 Troubleshooting

### **Error de CORS**
- Verificar `FRONTEND_URL` en backend
- Verificar `REACT_APP_API_URL` en frontend

### **Error de Base de Datos**
- Verificar connection string
- Verificar IP whitelist en MongoDB Atlas

### **Error de Build**
- Verificar dependencias
- Verificar scripts en package.json

---

## 📞 Soporte

Si tienes problemas con el despliegue:
1. Revisar logs en Render/Vercel
2. Verificar variables de entorno
3. Verificar configuración de CORS
4. Verificar conexión a MongoDB

¡Tu aplicación de planificación de bodas estará lista para el mundo! 💒✨

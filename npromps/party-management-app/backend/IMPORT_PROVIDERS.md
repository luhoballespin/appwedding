# 📋 Importar Proveedores a la Base de Datos

Este archivo contiene instrucciones para importar los proveedores de ejemplo a tu base de datos MongoDB.

## 🚀 Métodos de Importación

### **Método 1: Script Automático (Recomendado)**

```bash
# Navegar al directorio del backend
cd npromps/party-management-app/backend

# Ejecutar el script de importación
npm run import-providers
```

### **Método 2: Importación Manual con MongoDB**

```bash
# Usar mongoimport directamente
mongoimport --db wedding_planner --collection providers --file sample-providers.json --jsonArray
```

### **Método 3: Desde MongoDB Compass**

1. Abrir MongoDB Compass
2. Conectar a tu base de datos
3. Seleccionar la colección `providers`
4. Usar la opción "Import Data"
5. Seleccionar el archivo `sample-providers.json`

## 📊 Proveedores Incluidos

El archivo `sample-providers.json` incluye **6 proveedores completos**:

### 1. **Catering Elegante** 🍽️
- **Categoría**: Catering
- **Precio**: $85 USD por persona
- **Servicios**: Menú completo, catering corporativo, barra libre
- **Descripción**: Servicio premium con chefs profesionales

### 2. **Decoraciones Florales María** 🌸
- **Categoría**: Flores
- **Precio**: $1,200 USD (paquete completo)
- **Servicios**: Decoración completa, centros de mesa, ramo de novia
- **Descripción**: 15 años de experiencia en decoración floral

### 3. **DJ Pro Music** 🎵
- **Categoría**: Música
- **Precio**: $800 USD (servicio completo)
- **Servicios**: DJ completo, equipo de sonido, iluminación
- **Descripción**: Equipos profesionales Pioneer y JBL

### 4. **Fotografía Artística Luna** 📸
- **Categoría**: Fotografía
- **Precio**: $1,500 USD (sesión completa)
- **Servicios**: Boda completa, sesión de pareja, eventos
- **Descripción**: 12 años de experiencia, equipos Canon y Sony

### 5. **Transporte Elegante VIP** 🚗
- **Categoría**: Transportación
- **Precio**: $400 USD (transporte novios)
- **Servicios**: Transporte novios, invitados, flota completa
- **Descripción**: 20 años de experiencia, flota de lujo

### 6. **Decoraciones Modernas** ✨
- **Categoría**: Decoración
- **Precio**: $2,000 USD (decoración completa)
- **Servicios**: Salón completo, centros de mesa, iluminación
- **Descripción**: Especialistas en diseño moderno y minimalista

## 🔧 Verificación de Importación

Después de importar, puedes verificar que los proveedores se cargaron correctamente:

### **Desde MongoDB Compass:**
1. Conectar a tu base de datos
2. Navegar a la colección `providers`
3. Deberías ver 6 documentos

### **Desde la API:**
```bash
# Obtener todos los proveedores
curl -X GET http://localhost:5000/api/providers

# Obtener proveedores por categoría
curl -X GET "http://localhost:5000/api/providers?category=catering"

# Buscar proveedores
curl -X GET "http://localhost:5000/api/providers?search=elegante"
```

### **Desde el Frontend:**
1. Iniciar el servidor frontend
2. Navegar a la página de crear evento
3. Hacer clic en "Agregar Proveedores"
4. Deberías ver los 6 proveedores listados

## 🛠️ Solución de Problemas

### **Error de Conexión a MongoDB:**
```bash
# Verificar que MongoDB esté ejecutándose
mongod --version

# Verificar la cadena de conexión en .env
MONGODB_URI=mongodb://localhost:27017/wedding_planner
```

### **Error de Permisos:**
```bash
# Asegurar que el archivo JSON sea legible
chmod 644 sample-providers.json
```

### **Error de Formato JSON:**
```bash
# Validar el JSON
node -e "console.log(JSON.parse(require('fs').readFileSync('sample-providers.json', 'utf8')))"
```

## 📝 Personalización

Si quieres modificar los proveedores:

1. **Editar el archivo JSON:**
   ```bash
   nano sample-providers.json
   ```

2. **Agregar nuevos proveedores:**
   - Seguir el mismo formato del JSON
   - Incluir todos los campos requeridos
   - Usar IDs de usuario válidos para las reviews

3. **Re-importar:**
   ```bash
   npm run import-providers
   ```

## 🎯 Próximos Pasos

Después de importar los proveedores:

1. **Probar el flujo completo:**
   - Crear un evento
   - Seleccionar proveedores
   - Procesar el pago

2. **Agregar más proveedores:**
   - Crear proveedores desde el frontend
   - Importar más datos de ejemplo

3. **Configurar notificaciones:**
   - Email para nuevos proveedores
   - Alertas de disponibilidad

¡Listo! Ahora tienes proveedores reales para probar el flujo completo de la aplicación. 🎉

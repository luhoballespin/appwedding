# 🗄️ Configuración de Base de Datos - Wedding Planner

## 📋 Opciones para configurar MongoDB

### 🚀 Opción 1: MongoDB Atlas (Recomendado - Gratis)

1. **Crear cuenta en MongoDB Atlas:**
   - Ve a [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Crea una cuenta gratuita
   - Selecciona el plan "Free" (M0)

2. **Crear un cluster:**
   - Haz clic en "Build a Database"
   - Selecciona "FREE" (M0 Sandbox)
   - Elige la región más cercana a ti
   - Dale un nombre al cluster (ej: "wedding-planner")

3. **Configurar acceso:**
   - Crea un usuario de base de datos:
     - Username: `wedding-planner-user`
     - Password: genera una contraseña segura
   - Configura acceso desde cualquier IP: `0.0.0.0/0`

4. **Obtener la cadena de conexión:**
   - Haz clic en "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia la cadena de conexión
   - Reemplaza `<password>` con tu contraseña
   - Reemplaza `<dbname>` con `wedding-planner`

5. **Actualizar el archivo .env:**
   ```bash
   # Comenta la línea de MongoDB local:
   # MONGO_URI=mongodb://localhost:27017/wedding-planner
   
   # Descomenta y actualiza la línea de MongoDB Atlas:
   MONGO_URI=mongodb+srv://wedding-planner-user:TU_PASSWORD@cluster0.xxxxx.mongodb.net/wedding-planner?retryWrites=true&w=majority
   ```

### 🏠 Opción 2: MongoDB Local (Para desarrollo avanzado)

#### Windows:
1. **Descargar MongoDB:**
   - Ve a [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
   - Selecciona Windows y descarga el MSI

2. **Instalar MongoDB:**
   - Ejecuta el instalador
   - Selecciona "Complete" installation
   - Marca "Install MongoDB as a Service"
   - Marca "Install MongoDB Compass" (opcional)

3. **Verificar instalación:**
   ```bash
   # Abrir CMD como administrador
   mongod --version
   mongo --version
   ```

4. **Iniciar MongoDB:**
   ```bash
   # Iniciar el servicio
   net start MongoDB
   
   # O iniciar manualmente
   mongod --dbpath "C:\data\db"
   ```

#### macOS:
```bash
# Instalar con Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb/brew/mongodb-community
```

#### Linux (Ubuntu/Debian):
```bash
# Instalar MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Iniciar MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 🔧 Opción 3: Docker (Rápido y fácil)

1. **Instalar Docker Desktop:**
   - Descarga desde [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

2. **Ejecutar MongoDB con Docker:**
   ```bash
   # Ejecutar MongoDB en Docker
   docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password mongo:latest
   
   # Verificar que esté corriendo
   docker ps
   ```

3. **Actualizar .env:**
   ```bash
   MONGO_URI=mongodb://admin:password@localhost:27017/wedding-planner?authSource=admin
   ```

## 🚀 Probar la conexión

Una vez configurada la base de datos, prueba el backend:

```bash
cd backend
npm run dev
```

Deberías ver:
```
✅ MongoDB conectado: [tu-host]
🚀 Servidor corriendo en puerto 5000
📚 API Documentation: http://localhost:5000/api-docs
```

## 🛠️ Comandos útiles

### MongoDB Atlas:
- **Dashboard:** [https://cloud.mongodb.com](https://cloud.mongodb.com)
- **Compass:** Descarga desde el dashboard para gestión visual

### MongoDB Local:
```bash
# Conectar a MongoDB
mongo
# o
mongosh

# Comandos básicos
show dbs
use wedding-planner
show collections
```

### Docker:
```bash
# Ver logs de MongoDB
docker logs mongodb

# Conectar a MongoDB en Docker
docker exec -it mongodb mongosh

# Detener MongoDB
docker stop mongodb

# Eliminar contenedor
docker rm mongodb
```

## 🔐 Variables de entorno importantes

```bash
# Base de datos
MONGO_URI=mongodb://localhost:27017/wedding-planner

# JWT (¡IMPORTANTE! Cambiar en producción)
JWT_SECRET=wedding_planner_super_secret_key_2024_secure_random_string_here

# Frontend
FRONTEND_URL=http://localhost:3000

# Puerto del servidor
PORT=5000
```

## 📝 Notas importantes

1. **Seguridad:** Nunca subas el archivo `.env` a Git
2. **Producción:** Usa variables de entorno reales en producción
3. **Backup:** Configura backups automáticos en MongoDB Atlas
4. **Monitoreo:** Usa MongoDB Atlas para monitorear tu base de datos

## 🆘 Solución de problemas

### Error: "MongoServerError: Authentication failed"
- Verifica que el usuario y contraseña sean correctos
- Asegúrate de que la IP esté en la whitelist (MongoDB Atlas)

### Error: "MongooseServerSelectionError"
- Verifica que MongoDB esté ejecutándose
- Revisa la URL de conexión en `.env`
- Verifica la conectividad de red

### Error: "Port 27017 already in use"
```bash
# Encontrar proceso usando el puerto
netstat -ano | findstr :27017

# Terminar proceso (Windows)
taskkill /PID <PID> /F
```

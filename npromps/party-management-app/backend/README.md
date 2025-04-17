# Party Management App - Backend

Este es el backend de la aplicación de gestión de fiestas, desarrollado con Node.js y Express. Utiliza MongoDB como base de datos y Mongoose para la gestión de modelos.

## Estructura del Proyecto

- **src/**: Contiene el código fuente de la aplicación.
  - **controllers/**: Controladores que manejan la lógica de negocio.
    - `authController.js`: Maneja la autenticación de usuarios.
    - `eventController.js`: Maneja la creación y gestión de eventos.
    - `providerController.js`: Maneja la gestión de proveedores.
    - `userController.js`: Maneja la información de los usuarios.
  - **middleware/**: Middleware para autenticación y autorización.
    - `authMiddleware.js`: Verifica el token JWT.
    - `roleMiddleware.js`: Verifica los roles de usuario.
  - **models/**: Modelos de datos para MongoDB.
    - `Event.js`: Modelo para eventos.
    - `Provider.js`: Modelo para proveedores.
    - `User.js`: Modelo para usuarios.
    - `Note.js`: Modelo para notas.
  - **routes/**: Rutas de la API.
    - `authRoutes.js`: Rutas de autenticación.
    - `eventRoutes.js`: Rutas para eventos.
    - `providerRoutes.js`: Rutas para proveedores.
    - `userRoutes.js`: Rutas para usuarios.
  - **utils/**: Utilidades y configuraciones.
    - `db.js`: Conexión a la base de datos MongoDB.
  - `app.js`: Punto de entrada de la aplicación.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega a la carpeta del backend:
   ```
   cd party-management-app/backend
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Uso

Para iniciar el servidor, ejecuta el siguiente comando:
```
npm start
```

El servidor se ejecutará en `http://localhost:5000` (puedes cambiar el puerto en la configuración).

## Autenticación

La aplicación utiliza JWT para la autenticación de usuarios. Asegúrate de incluir el token en las cabeceras de las solicitudes que requieran autenticación.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
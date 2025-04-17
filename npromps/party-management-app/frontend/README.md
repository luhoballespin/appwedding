# Party Management App - Frontend

Este es el frontend de la aplicación de gestión de fiestas, desarrollado con React. La aplicación permite a los usuarios organizar y gestionar eventos de manera eficiente.

## Estructura del Proyecto

- **public/**: Contiene archivos estáticos, incluyendo el archivo HTML principal.
- **src/**: Contiene el código fuente de la aplicación.
  - **components/**: Componentes reutilizables de la interfaz de usuario.
  - **contexts/**: Contextos de React para manejar el estado global, como la autenticación.
  - **hooks/**: Hooks personalizados para lógica reutilizable.
  - **pages/**: Páginas principales de la aplicación.
  - **services/**: Servicios para manejar la comunicación con el backend.
  - **styles/**: Archivos de estilos globales.
  - **App.js**: Componente principal de la aplicación.
  - **index.js**: Punto de entrada de la aplicación React.
  - **routes.js**: Definición de rutas de la aplicación.

## Instalación

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Navega al directorio del frontend:
   ```
   cd party-management-app/frontend
   ```
3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para iniciar la aplicación en modo de desarrollo, ejecuta:
```
npm start
```
Esto abrirá la aplicación en `http://localhost:3000`.

## Funcionalidades

- **Home**: Vista pública con información sobre la plataforma y proveedores destacados.
- **Dashboard**: Herramientas para organizadores, incluyendo calendario, notas y gestión de invitados.
- **Panel de Proveedores**: Herramientas para que los proveedores gestionen sus servicios y solicitudes.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
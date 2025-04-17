# Party Management App

Este proyecto es una aplicación web para la gestión y organización de fiestas. Permite a los usuarios, ya sean organizadores de eventos o proveedores de servicios, interactuar de manera efectiva para planificar eventos memorables.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: **backend** y **frontend**.

### Backend

El backend está construido con **Node.js** y **Express**, y utiliza **MongoDB** como base de datos. La estructura del backend incluye:

- **src**: Contiene la lógica de la aplicación.
  - **controllers**: Controladores para manejar la lógica de negocio.
  - **middleware**: Middleware para autenticación y autorización.
  - **models**: Modelos de datos utilizando Mongoose.
  - **routes**: Definición de rutas para la API.
  - **utils**: Utilidades, como la conexión a la base de datos.
- **package.json**: Configuración de dependencias y scripts del backend.

### Frontend

El frontend está construido con **React** y proporciona una interfaz de usuario interactiva. La estructura del frontend incluye:

- **public**: Archivos estáticos, incluyendo el HTML principal.
- **src**: Contiene los componentes y la lógica de la aplicación.
  - **components**: Componentes reutilizables de la interfaz.
  - **contexts**: Contextos para manejar el estado global, como la autenticación.
  - **hooks**: Hooks personalizados para lógica de componentes.
  - **pages**: Páginas principales de la aplicación.
  - **services**: Servicios para interactuar con la API del backend.
  - **styles**: Estilos globales para la aplicación.
- **package.json**: Configuración de dependencias y scripts del frontend.

## Funcionalidades

### Para Organizadores

- Dashboard con calendario, notas personalizadas y listas de invitados.
- Búsqueda y selección de proveedores.

### Para Proveedores

- Panel para crear y editar servicios.
- Visualización de solicitudes de contratación.

## Requisitos Técnicos

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT para autenticación.
- **Frontend**: React, hooks, Context API o Redux según sea necesario.

## Instalación

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del backend y frontend y ejecuta:
   ```
   cd backend
   npm install
   npm start
   ```

   ```
   cd frontend
   npm install
   npm start
   ```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT.
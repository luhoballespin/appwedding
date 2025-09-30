// Script de inicialización para MongoDB
db = db.getSiblingDB('wedding-planner');

// Crear usuario para la aplicación
db.createUser({
  user: 'wedding_app',
  pwd: 'wedding_app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'wedding-planner'
    }
  ]
});

// Crear colecciones iniciales
db.createCollection('users');
db.createCollection('events');
db.createCollection('providers');
db.createCollection('payments');
db.createCollection('notes');
db.createCollection('exchangerates');

print('Base de datos inicializada correctamente');

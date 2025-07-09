# 🌍 AdminJS Multiidioma con Roles y Usuarios

Este proyecto incluye un sistema completo de **multiidioma** y **gestión de roles y usuarios** en AdminJS v7.

## 🎯 **Características Implementadas**

### ✅ **Multiidioma**
- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Idioma secundario
- **Traducciones completas**: Interfaz completamente traducida
- **Cambio dinámico**: Los usuarios pueden cambiar idioma

### ✅ **Sistema de Roles**
- **3 roles predefinidos**: Admin, Manager, User
- **Permisos granulares**: read, write, delete, manage_users, manage_roles
- **Jerarquía de permisos**: Cada rol tiene diferentes capacidades

### ✅ **Gestión de Usuarios**
- **Autenticación personalizada**: Sistema de login propio
- **Perfiles de usuario**: Información completa de usuarios
- **Estados activo/inactivo**: Control de acceso
- **Preferencias de idioma**: Cada usuario puede elegir su idioma

---

## 🗄️ **Estructura de Base de Datos**

### **Tabla: roles**
```sql
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Tabla: users**
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role_id INTEGER REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  language VARCHAR(10) DEFAULT 'es',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### **Tabla: organizations**
```sql
CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 👥 **Roles y Permisos**

### **1. Administrador (admin)**
- **Permisos**: `read`, `write`, `delete`, `manage_users`, `manage_roles`
- **Acceso**: Completo a todas las funcionalidades
- **Puede**: Gestionar usuarios, roles, organizaciones, configuraciones

### **2. Gerente (manager)**
- **Permisos**: `read`, `write`
- **Acceso**: Limitado a lectura y escritura
- **Puede**: Ver y editar datos, pero no eliminar ni gestionar usuarios

### **3. Usuario (user)**
- **Permisos**: `read`
- **Acceso**: Solo lectura
- **Puede**: Ver datos, pero no modificar nada

---

## 🌐 **Sistema Multiidioma**

### **Idiomas Disponibles**
- **Español (es)**: Idioma por defecto
- **Inglés (en)**: Idioma secundario

### **Traducciones Incluidas**
- ✅ Interfaz completa (botones, menús, formularios)
- ✅ Mensajes del sistema
- ✅ Etiquetas de campos
- ✅ Mensajes de error y éxito
- ✅ Nombres de recursos (usuarios, roles, organizaciones)

### **Cómo Cambiar Idioma**
1. **Login**: El idioma se puede configurar por usuario
2. **Interfaz**: Se puede cambiar dinámicamente
3. **Preferencias**: Cada usuario puede elegir su idioma preferido

---

## 🚀 **Cómo Usar**

### **1. Acceder al Panel**
```bash
# Modo desarrollo (hot-reload)
./docker-scripts.sh dev

# Acceder a: http://localhost:3002/admin
```

### **2. Credenciales de Prueba**
```
Email: admin@example.com
Password: password123

Email: manager@example.com  
Password: password123

Email: user@example.com
Password: password123
```

### **3. Navegación**
- **Dashboard**: Vista general del sistema
- **Usuarios**: Gestión de usuarios y perfiles
- **Roles**: Configuración de roles y permisos
- **Organizaciones**: Gestión de organizaciones

---

## 🔧 **Configuración Avanzada**

### **Agregar Nuevos Idiomas**
1. Crear archivo `src/i18n/[codigo].json`
2. Agregar traducciones
3. Actualizar configuración en `app.module.ts`

### **Crear Nuevos Roles**
```sql
INSERT INTO roles (name, description, permissions) 
VALUES ('editor', 'Editor de contenido', '["read", "write"]');
```

### **Agregar Nuevos Permisos**
1. Actualizar la lógica en `AuthService`
2. Agregar validaciones en recursos
3. Actualizar interfaz de roles

---

## 📊 **Funcionalidades por Rol**

### **Administrador**
- ✅ Ver todas las tablas
- ✅ Crear, editar, eliminar registros
- ✅ Gestionar usuarios y roles
- ✅ Cambiar configuración del sistema
- ✅ Exportar/importar datos
- ✅ Ver logs y auditoría

### **Gerente**
- ✅ Ver todas las tablas
- ✅ Crear y editar registros
- ❌ No puede eliminar
- ❌ No puede gestionar usuarios/roles
- ✅ Exportar datos
- ❌ No puede ver logs

### **Usuario**
- ✅ Ver todas las tablas
- ❌ Solo lectura
- ❌ No puede crear/editar/eliminar
- ❌ No puede exportar
- ❌ Acceso limitado

---

## 🛠️ **Desarrollo**

### **Hot-Reload Activo**
- Los cambios en el código se reflejan automáticamente
- Modifica archivos y ve los cambios en tiempo real
- Perfecto para desarrollo y testing

### **Logs en Tiempo Real**
```bash
./docker-scripts.sh logs-dev
```

### **Reiniciar Servicios**
```bash
./docker-scripts.sh restart-dev
```

---

## 🔐 **Seguridad**

### **Autenticación**
- Sistema de login personalizado
- Contraseñas hasheadas (en producción)
- Sesiones seguras con cookies

### **Autorización**
- Verificación de permisos por acción
- Control de acceso granular
- Auditoría de acciones

### **Validación**
- Validación de datos en frontend y backend
- Sanitización de inputs
- Prevención de inyección SQL

---

## 📝 **Próximos Pasos**

### **Mejoras Sugeridas**
1. **Más idiomas**: Francés, alemán, portugués
2. **Permisos más granulares**: Por tabla, por campo
3. **Auditoría completa**: Logs de todas las acciones
4. **Notificaciones**: Sistema de alertas
5. **Reportes avanzados**: Gráficos y estadísticas
6. **API REST**: Endpoints para integración externa

### **Personalización**
1. **Temas**: Cambiar colores y estilos
2. **Dashboard personalizado**: Widgets específicos
3. **Acciones custom**: Botones y workflows
4. **Validaciones específicas**: Reglas de negocio

---

## 🆘 **Soporte**

### **Comandos Útiles**
```bash
# Ver estado de servicios
./docker-scripts.sh status

# Ver logs de desarrollo
./docker-scripts.sh logs-dev

# Limpiar todo y reiniciar
./docker-scripts.sh clean
./docker-scripts.sh dev
```

### **Troubleshooting**
- **Error de conexión**: Verificar que PostgreSQL esté corriendo
- **Problemas de autenticación**: Verificar credenciales en la BD
- **Errores de traducción**: Verificar archivos de idioma
- **Permisos**: Verificar configuración de roles

---

**¡Tu sistema AdminJS multiidioma con roles está listo para usar!** 🎉 
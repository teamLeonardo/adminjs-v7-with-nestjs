# 🐳 AdminJS v7 con NestJS - Docker Setup

Este proyecto incluye una configuración completa de Docker para ejecutar AdminJS v7 con NestJS y PostgreSQL, con soporte para **modo desarrollo** (hot-reload) y **modo producción**.

## 📋 Prerrequisitos

- Docker
- Docker Compose

## 🚀 Inicio Rápido

### Modo DESARROLLO (con hot-reload)
```bash
# Iniciar servicios en modo desarrollo
./docker-scripts.sh dev

# Ver logs de desarrollo
./docker-scripts.sh logs-dev
```

### Modo PRODUCCIÓN
```bash
# Iniciar servicios en modo producción
./docker-scripts.sh start

# Ver logs de producción
./docker-scripts.sh logs-prod
```

### Comandos generales
```bash
# Detener todos los servicios
./docker-scripts.sh stop

# Ver estado de servicios
./docker-scripts.sh status

# Limpiar todo
./docker-scripts.sh clean
```

## 🌐 URLs de Acceso

### Modo DESARROLLO
- **AdminJS Panel**: http://localhost:3002/admin
- **API NestJS**: http://localhost:3002
- **PostgreSQL**: localhost:5432

### Modo PRODUCCIÓN
- **AdminJS Panel**: http://localhost:3001/admin
- **API NestJS**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## 🔄 Diferencias entre Modos

### Modo DESARROLLO (`./docker-scripts.sh dev`)
- ✅ **Hot-reload automático**: Los cambios en tu código se reflejan inmediatamente
- ✅ **Volumen montado**: Tu código local está sincronizado con el contenedor
- ✅ **Logs detallados**: Más información de debugging
- ⚠️ **Puerto 3002**: Para evitar conflictos con producción
- ⚠️ **Menos optimizado**: Para desarrollo, no para producción

### Modo PRODUCCIÓN (`./docker-scripts.sh start`)
- ✅ **Optimizado**: Build optimizado para rendimiento
- ✅ **Puerto 3001**: Puerto estándar
- ✅ **Sin hot-reload**: Más estable para producción
- ⚠️ **Sin volumen**: Código compilado dentro de la imagen
- ⚠️ **Reinicio manual**: Para aplicar cambios

## 🔧 Configuración de Base de Datos

### Credenciales PostgreSQL
- **Host**: localhost (desde tu máquina) o postgres (desde contenedores)
- **Puerto**: 5432
- **Base de datos**: adminjs_db
- **Usuario**: adminjs_user
- **Contraseña**: adminjs_password

### Conexión desde tu máquina
```bash
psql -h localhost -p 5432 -U adminjs_user -d adminjs_db
```

## 📁 Estructura de Archivos Docker

```
├── Dockerfile              # Configuración de la imagen de la app
├── docker-compose.yml      # Orquestación de servicios (dev + prod)
├── .dockerignore          # Archivos a excluir del build
├── docker-scripts.sh      # Scripts de automatización
└── README-Docker.md       # Esta documentación
```

## 🛠️ Comandos Útiles

### Scripts Automatizados
```bash
./docker-scripts.sh dev          # Iniciar modo DESARROLLO
./docker-scripts.sh start        # Iniciar modo PRODUCCIÓN
./docker-scripts.sh stop         # Detener todos los servicios
./docker-scripts.sh restart-dev  # Reiniciar solo DESARROLLO
./docker-scripts.sh logs-dev     # Ver logs de DESARROLLO
./docker-scripts.sh logs-prod    # Ver logs de PRODUCCIÓN
./docker-scripts.sh build        # Construir imagen
./docker-scripts.sh clean        # Limpiar todo
./docker-scripts.sh status       # Ver estado de servicios
```

### Docker Compose Directo
```bash
# Modo desarrollo
docker-compose up -d postgres app-dev

# Modo producción
docker-compose up -d postgres app

# Ver logs específicos
docker-compose logs -f app-dev
docker-compose logs -f app

# Ejecutar comandos dentro del contenedor
docker-compose exec app-dev npm run test
docker-compose exec postgres psql -U adminjs_user -d adminjs_db
```

## 🔍 Troubleshooting

### Puerto 3001 ocupado (PRODUCCIÓN)
```bash
# Ver qué está usando el puerto
lsof -i :3001

# Matar el proceso
kill -9 <PID>
```

### Puerto 3002 ocupado (DESARROLLO)
```bash
# Ver qué está usando el puerto
lsof -i :3002

# Matar el proceso
kill -9 <PID>
```

### Puerto 5432 ocupado
```bash
# Ver qué está usando el puerto
lsof -i :5432

# Matar el proceso
kill -9 <PID>
```

### Problemas de permisos
```bash
# Dar permisos al script
chmod +x docker-scripts.sh
```

### Limpiar todo y empezar de nuevo
```bash
./docker-scripts.sh clean
./docker-scripts.sh dev    # o ./docker-scripts.sh start
```

## 📊 Monitoreo

### Ver estado de contenedores
```bash
./docker-scripts.sh status
# o
docker-compose ps
```

### Ver uso de recursos
```bash
docker stats
```

### Ver logs específicos
```bash
# Logs de desarrollo
./docker-scripts.sh logs-dev

# Logs de producción
./docker-scripts.sh logs-prod

# Logs de errores
docker-compose logs --tail=100 | grep ERROR
```

## 🔄 Flujo de Desarrollo

### Desarrollo diario
1. **Inicia modo desarrollo:**
   ```bash
   ./docker-scripts.sh dev
   ```

2. **Edita tu código** en tu editor local
3. **Los cambios se reflejan automáticamente** en http://localhost:3002/admin
4. **Ve logs en tiempo real:**
   ```bash
   ./docker-scripts.sh logs-dev
   ```

### Despliegue a producción
1. **Prueba en modo desarrollo** hasta que todo funcione
2. **Inicia modo producción:**
   ```bash
   ./docker-scripts.sh start
   ```
3. **Verifica en** http://localhost:3001/admin

## 🗄️ Persistencia de Datos

Los datos de PostgreSQL se almacenan en un volumen Docker llamado `postgres_data`. Para eliminar todos los datos:

```bash
docker-compose down -v
```

## 🔐 Variables de Entorno

Las variables de entorno están configuradas en `docker-compose.yml`:

- `DATABASE_URL`: Conexión a PostgreSQL
- `DATABASE_NAME`: Nombre de la base de datos
- `NODE_ENV`: Entorno de ejecución (development/production)

## 📝 Notas Importantes

1. **Primera ejecución**: La primera vez puede tardar más tiempo en construir la imagen
2. **Base de datos**: PostgreSQL se inicializa automáticamente con las credenciales configuradas
3. **AdminJS**: El panel de administración estará disponible en `/admin`
4. **Hot-reload**: Solo funciona en modo desarrollo (puerto 3002)
5. **Logs**: Usa `./docker-scripts.sh logs-dev` o `./docker-scripts.sh logs-prod` para ver logs específicos 
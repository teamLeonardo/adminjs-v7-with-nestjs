#!/bin/bash

# Script para manejar Docker con AdminJS y NestJS

case "$1" in
  "start")
    echo "🚀 Iniciando servicios en modo PRODUCCIÓN..."
    docker-compose up -d postgres app
    echo "✅ Servicios de PRODUCCIÓN iniciados!"
    echo "📊 AdminJS disponible en: http://localhost:3001/admin"
    echo "🔗 API disponible en: http://localhost:3001"
    ;;
  "dev")
    echo "🚀 Iniciando servicios en modo DESARROLLO..."
    docker-compose up -d postgres app-dev
    echo "✅ Servicios de DESARROLLO iniciados!"
    echo "📊 AdminJS disponible en: http://localhost:3002/admin"
    echo "🔗 API disponible en: http://localhost:3002"
    echo "🔄 Hot-reload activado - los cambios se reflejarán automáticamente"
    ;;
  "stop")
    echo "🛑 Deteniendo todos los servicios..."
    docker-compose down
    echo "✅ Servicios detenidos!"
    ;;
  "restart")
    echo "🔄 Reiniciando servicios..."
    docker-compose down
    docker-compose up -d
    echo "✅ Servicios reiniciados!"
    ;;
  "restart-dev")
    echo "🔄 Reiniciando servicios de DESARROLLO..."
    docker-compose down
    docker-compose up -d app-dev
    echo "🧹 Limpiando node_modules dentro del contenedor app-dev..."
    docker-compose exec app-dev rm -rf node_modules
    echo "📦 Instalando dependencias dentro del contenedor app-dev..."
    docker-compose exec app-dev npm install
    echo "✅ Servicios de DESARROLLO reiniciados!"
    ;;
  "logs")
    echo "📋 Mostrando logs..."
    docker-compose logs -f
    ;;
  "logs-dev")
    echo "📋 Mostrando logs de DESARROLLO..."
    docker-compose logs -f app-dev
    ;;
  "logs-prod")
    echo "📋 Mostrando logs de PRODUCCIÓN..."
    docker-compose logs -f app
    ;;
  "build")
    echo "🔨 Construyendo imagen..."
    docker-compose build
    echo "✅ Imagen construida!"
    ;;
  "clean")
    echo "🧹 Limpiando contenedores y volúmenes..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Limpieza completada!"
    ;;
  "status")
    echo "📊 Estado de los servicios:"
    docker-compose ps
    ;;
  "prisma-init")
    echo "🟡 Inicializando Prisma: migraciones y seed..."
    # Esperar a que postgres esté disponible
    until docker-compose exec -T postgres pg_isready -U "$POSTGRES_USER" > /dev/null 2>&1; do
      echo "⏳ Esperando a que PostgreSQL esté disponible..."
      sleep 2
    done
    echo "🔨 Reconstruyendo imagen para asegurar que Prisma esté disponible..."
    docker-compose build app
    echo "🔍 Verificando si existen migraciones..."
    docker-compose run --rm app sh -c '[ -d prisma/migrations ] && [ "$(ls -A prisma/migrations)" ] || npx prisma migrate dev --name init --skip-seed'
    echo "✅ PostgreSQL disponible. Ejecutando migraciones, generate y seed en un solo contenedor..."
    if docker-compose run --rm app sh -c "npx prisma migrate deploy && npx prisma generate && npx prisma db seed"; then
      echo "✅ Migraciones, generate y seed completados."
    else
      echo "❌ Error al ejecutar migraciones, generate o seed."
      exit 1
    fi
    echo "✅ Inicialización de Prisma completada."
    ;;
  "prisma-clean")
    echo "⚠️  Esto eliminará TODOS los datos de la base de datos y la reiniciará con migraciones y seed."
    read -p '¿Estás seguro? (escribe "SI" para continuar): ' confirm
    if [ "$confirm" = "SI" ]; then
      echo "🔨 Reconstruyendo imagen para asegurar que Prisma esté disponible..."
      docker-compose build app
      echo "🔄 Ejecutando reset de Prisma..."
      if docker-compose run --rm app npx prisma migrate reset --force; then
        echo "✅ Base de datos limpiada y reinicializada."
      else
        echo "❌ Error al limpiar la base de datos."
        exit 1
      fi
    else
      echo "❌ Operación cancelada."
    fi
    ;;
  *)
    echo "Uso: $0 {start|dev|stop|restart|restart-dev|logs|logs-dev|logs-prod|build|clean|status|prisma-init|prisma-clean}"
    echo ""
    echo "Comandos disponibles:"
    echo "  start        - Iniciar servicios en modo PRODUCCIÓN (puerto 3001)"
    echo "  dev          - Iniciar servicios en modo DESARROLLO con hot-reload (puerto 3002)"
    echo "  stop         - Detener todos los servicios"
    echo "  restart      - Reiniciar todos los servicios"
    echo "  restart-dev  - Reiniciar solo servicios de DESARROLLO"
    echo "  logs         - Ver logs de todos los servicios"
    echo "  logs-dev     - Ver logs solo del modo DESARROLLO"
    echo "  logs-prod    - Ver logs solo del modo PRODUCCIÓN"
    echo "  build        - Construir imagen"
    echo "  clean        - Limpiar contenedores y volúmenes"
    echo "  status       - Ver estado de los servicios"
    echo "  prisma-init  - Ejecutar migraciones y seed de Prisma (requiere postgres levantado)"
    echo "  prisma-clean - Eliminar todos los datos y reinicializar la base de datos (¡DESTRUCTIVO!)"
    echo ""
    echo "URLs de acceso:"
    echo "  PRODUCCIÓN:  http://localhost:3001/admin"
    echo "  DESARROLLO:  http://localhost:3002/admin"
    exit 1
    ;;
esac 
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# AdminJS v7 + NestJS + Prisma

Este proyecto es una integración de [AdminJS](https://adminjs.co/) v7 con [NestJS](https://nestjs.com/) y [Prisma](https://www.prisma.io/), preparado para entornos de desarrollo y producción usando Docker.

## Requisitos previos

- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- Node.js 18+ (solo si quieres correr localmente sin Docker)
- PostgreSQL (si no usas Docker para la base de datos)

## Variables de entorno

Copia el archivo `.env.example` a `.env` y ajusta las variables según tu entorno:

```
cp .env.example .env
```

## Instalación local (sin Docker)

```bash
npm install
npx prisma generate
npm run start:dev
```

## Uso con Docker

### 1. Construir y levantar en desarrollo (hot-reload)

```bash
./docker-scripts.sh restart-dev
```

- Accede a la app en: [http://localhost:3002](http://localhost:3002)
- Accede a AdminJS en: [http://localhost:3002/admin](http://localhost:3002/admin)

### 2. Ver logs de desarrollo

```bash
./docker-scripts.sh logs-dev
```

### 3. Parar los servicios de desarrollo

```bash
./docker-scripts.sh stop-dev
```

### 4. Construir y levantar en producción

```bash
./docker-scripts.sh build
./docker-scripts.sh start
```

- Accede a la app en: [http://localhost:3001](http://localhost:3001)
- Accede a AdminJS en: [http://localhost:3001/admin](http://localhost:3001/admin)

### 5. Comandos útiles de Prisma

- Ejecutar migraciones:
  ```bash
  ./docker-scripts.sh prisma-migrate
  ```
- Sembrar la base de datos:
  ```bash
  ./docker-scripts.sh prisma-seed
  ```
- Limpiar la base de datos (solo desarrollo):
  ```bash
  ./docker-scripts.sh prisma-clean
  ```

## Estructura de scripts

- `restart-dev`: Reinicia el entorno de desarrollo, limpia e instala dependencias dentro del contenedor.
- `logs-dev`: Muestra los logs de desarrollo.
- `stop-dev`: Detiene los servicios de desarrollo.
- `build`: Construye la imagen de producción.
- `start`: Levanta la app en modo producción.
- `prisma-migrate`: Ejecuta migraciones de Prisma.
- `prisma-seed`: Ejecuta el seed de Prisma.
- `prisma-clean`: Limpia la base de datos (solo desarrollo).

## Notas

- En desarrollo, los cambios en el código se reflejan automáticamente gracias al volumen montado y el hot-reload.
- Si cambias el schema de Prisma, asegúrate de correr `prisma generate` dentro del contenedor o reiniciar el entorno de desarrollo.
- Para producción, la imagen es ligera y optimizada usando Alpine.

---

**Autor:** Leonardo Sifuentes

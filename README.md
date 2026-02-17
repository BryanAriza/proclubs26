# ⚽ Pro Clubs Stats Tracker

Sistema completo de estadísticas y análisis para clubes de EA Sports FC Pro Clubs. Permite buscar clubes, visualizar estadísticas detalladas de equipos y jugadores, y analizar el rendimiento en partidos con una interfaz moderna y responsive.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 📋 ¿Qué Hace Este Sistema?

**Pro Clubs Stats Tracker** es una aplicación web que se conecta a la API oficial de EA Sports FC para proporcionar análisis completos de clubes de Pro Clubs. El sistema permite:

- 🔍 **Buscar clubes** por nombre en diferentes plataformas (PlayStation, Xbox, PC)
- 📊 **Visualizar estadísticas generales** del club (división, récord, habilidad, estadio)
- 👥 **Analizar jugadores** con rankings de goleadores, asistentes, MVPs y tabla completa con filtros
- 🏆 **Revisar historial de partidos** con estadísticas detalladas de cada encuentro y rendimiento por jugador
- 📱 **Experiencia responsive** totalmente optimizada para móviles, tablets y desktop
- 🎨 **Interfaz moderna** con animaciones fluidas y diseño inspirado en EA FC

## 🏗️ Arquitectura del Monorepo

```
proclubs/
├── apps/
│   ├── api/          # Backend NestJS con cache, rate-limiting y proxy a EA API
│   └── web/          # Frontend Next.js con App Router, TanStack Query y Tailwind CSS
│       ├── src/
│       │   ├── app/           # Rutas y páginas (App Router)
│       │   ├── components/    # Componentes React reutilizables
│       │   │   ├── club-page.tsx      # Vista principal del club
│       │   │   ├── players-table.tsx  # Tabla de jugadores con rankings
│       │   │   ├── matches-list.tsx   # Historial de partidos
│       │   │   └── search-page.tsx    # Búsqueda de clubes
│       │   └── lib/           # API client y utilidades
├── packages/
│   └── shared/       # Tipos TypeScript compartidos y utilidades
├── docker-compose.yml # Configuración Docker para Redis
└── README.md
```

## 🚀 Tecnologías Utilizadas

### 🎨 Frontend (Next.js + React)
- **[Next.js 14.1.0](https://nextjs.org/)** - Framework React con App Router para SSR y optimización
- **[React 18](https://react.dev/)** - Biblioteca para interfaces de usuario reactivas
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para mayor seguridad
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Framework CSS utility-first con diseño responsive mobile-first
- **[Framer Motion](https://www.framer.com/motion/)** - Animaciones y transiciones fluidas
- **[TanStack Query v5](https://tanstack.com/query/latest)** - Gestión de estado de servidor con cache
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes de UI accesibles (basados en Radix UI)
- **[Lucide React](https://lucide.dev/)** - Librería de iconos modernos

### ⚙️ Backend (NestJS)
- **[NestJS 10](https://nestjs.com/)** - Framework Node.js modular y escalable
- **Cache Manager** - Sistema de cache in-memory con soporte para Redis opcional
- **@nestjs/throttler** - Rate limiting (30 requests/minuto por defecto)
- **Axios** - Cliente HTTP con retry automático
- **Swagger/OpenAPI** - Documentación automática de API
- **Jest** - Testing unitario y e2e

### 📦 Shared Packages
- **TypeScript Interfaces** - Tipos compartidos entre frontend y backend
- **Utilidades Comunes** - Formatters, validators, helpers

### 🛠️ DevOps & Tools
- **[Turborepo](https://turbo.build/)** - Monorepo build system para builds paralelos optimizados
- **[pnpm](https://pnpm.io/)** - Gestor de paquetes eficiente con workspace support
- **Docker Compose** - Contenedor para Redis (opcional)
- **ESLint + Prettier** - Linting y formateo de código
- **TypeScript Strict Mode** - Compilación con verificación estricta

## 📋 Prerequisitos del Sistema

Antes de comenzar, asegúrate de tener instalado:

- **Node.js:** >= 18.0.0 ([Descargar aquí](https://nodejs.org/))
- **pnpm:** >= 8.0.0 (se instalará en los pasos siguientes)
- **Git:** Para clonar el repositorio ([Descargar aquí](https://git-scm.com/))
- **Redis:** Opcional para cache avanzado (Docker Compose incluido)

Verifica las versiones instaladas:
```bash
node --version    # Debe ser >= 18.0.0
git --version     # Cualquier versión reciente
```

## 🔧 Instalación Paso a Paso

### Paso 1: Clonar el Repositorio

Abre tu terminal y ejecuta:

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/proclubs.git

# Navega a la carpeta del proyecto
cd proclubs
```

### Paso 2: Instalar pnpm (Gestor de Paquetes)

Si no tienes pnpm instalado, instálalo globalmente:

```bash
npm install -g pnpm
```

Verifica la instalación:
```bash
pnpm --version    # Debe mostrar >= 8.0.0
```

### Paso 3: Instalar Dependencias del Proyecto

```bash
# Instala todas las dependencias del monorepo
pnpm install
```

Este comando instalará automáticamente las dependencias de:
- Apps (API y Web)
- Packages compartidos
- Todas las dependencias de desarrollo

### Paso 4: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y configura las siguientes variables:

```env
# ========== BACKEND (API) ==========
PORT=3001
NODE_ENV=development
EA_BASE_URL=https://proclubs.ea.com/api
USE_MOCKS=true                    # true = usar mocks para desarrollo, false = API real de EA
REDIS_URL=                        # Opcional: redis://localhost:6379 (si usas Docker)
RATE_LIMIT_TTL=60                 # Tiempo de ventana para rate limit (segundos)
RATE_LIMIT_MAX=30                 # Máximo de requests por ventana

# ========== FRONTEND (WEB) ==========
NEXT_PUBLIC_API_BASE=http://localhost:3001
```

**Nota:** Con `USE_MOCKS=true` la aplicación usará datos de ejemplo sin necesidad de la API real de EA.

### Paso 5: (Opcional) Levantar Redis con Docker

Si quieres usar Redis para cache avanzado:

```bash
# Inicia Redis en Docker
docker-compose up -d

# Verifica que esté corriendo
docker-compose ps
```

Luego actualiza el `.env` con:
```env
REDIS_URL=redis://localhost:6379
```

## 🏃 Cómo Usar la Aplicación

### Iniciar en Modo Desarrollo (Recomendado)

**Opción 1: Iniciar Todo el Proyecto (API + Frontend)**

```bash
# Desde la raíz del proyecto
pnpm dev
```

Esto iniciará automáticamente:
- **API Backend:** http://localhost:3001
  - Documentación Swagger: http://localhost:3001/docs
  - Health Check: http://localhost:3001/api/health
- **Frontend Web:** http://localhost:3000

**Opción 2: Iniciar Componentes Individualmente**

```bash
# Solo Backend API
cd apps/api
pnpm dev

# En otra terminal, solo Frontend
cd apps/web
pnpm dev
```

### Acceder a la Aplicación

1. Abre tu navegador en: **http://localhost:3000**
2. Verás la pantalla de búsqueda de clubes
3. ¡Comienza a explorar clubes de Pro Clubs!

### Primer Uso: Buscar un Club

1. **Selecciona la plataforma:**
   - PlayStation 5 (common-gen5)
   - Xbox Series X/S
   - PC

2. **Escribe el nombre del club** en el buscador
   - Ejemplo: "COKA FC", "Manchester", "Barcelona"

3. **Haz clic en un club** de los resultados para ver sus estadísticas completas

### Explorar Estadísticas del Club

Una vez dentro de un club, encontrarás 3 pestañas:

**📊 Pestaña "Resumen"**
- División actual y habilidad del club
- Récord de victorias, derrotas y empates
- Porcentaje de victorias
- Nombre del estadio oficial

**👥 Pestaña "Jugadores"**
- **Top 5 Rankings:** Goleadores, Asistentes, MVPs, Más Partidos, Expulsiones
- **Tabla Completa:** Todos los jugadores con estadísticas detalladas
- **Búsqueda:** Filtra jugadores por nombre
- **Ordenamiento:** Haz clic en las columnas para ordenar
- **ID de PlayStation:** Identificación única de cada jugador

**🏆 Pestaña "Partidos"**
- **Filtros:** Liga, Playoff, Amistosos
- **Tarjetas de Partido:** Marcador, resultado (Victoria/Derrota/Empate)
- **Haz clic en un partido** para expandir y ver:
  - Estadísticas del equipo: Posesión, pases, tiros, entradas, tarjetas
  - Rendimiento individual de cada jugador
  - Comparación con el equipo rival

## 🎨 Características Destacadas

### 📱 Diseño Responsive Mobile-First
- **Móviles:** Interfaz optimizada con tamaños compactos y navegación táctil
- **Tablets:** Aprovecha el espacio adicional mostrando más columnas
- **Desktop:** Experiencia completa con todas las estadísticas visibles
- **Breakpoints:** Adaptación fluida en 640px, 768px, 1024px y 1280px

### ⚡ Rendimiento y UX
- **Búsqueda con Debounce:** Espera 400ms para evitar requests innecesarios
- **Cache Inteligente:** TanStack Query cachea datos para navegación instantánea
- **Loading States:** Spinners y skeletons durante la carga
- **Error Handling:** Mensajes claros cuando algo falla
- **Lazy Loading:** Imágenes optimizadas que cargan bajo demanda

### 🎭 Animaciones y Transiciones
- **Framer Motion:** Transiciones suaves entre estados
- **Hover Effects:** Interacciones visuales en cards y botones
- **Expandible/Colapsable:** Partidos que se expanden para ver detalles
- **Gradientes Dinámicos:** Colores que cambian según el resultado (victoria/derrota)

### 🔒 Seguridad y Estabilidad
- **Proxy Obligatorio:** Frontend nunca llama directamente a EA API
- **Rate Limiting:** Protección contra abuso (30 req/min)
- **Timeout Control:** Máximo 15 segundos por request
- **Retry Automático:** 1 reintento en caso de error 5xx o timeout
- **Normalización de Errores:** Mensajes de error filtrados y seguros

## 📚 Documentación de la API

### Base URL
```
http://localhost:3001/api
```

### Documentación Interactiva (Swagger)
```
http://localhost:3001/docs
```

### Endpoints Disponibles

| Endpoint | Método | Descripción | Parámetros |
|----------|--------|-------------|------------|
| `/clubs/search` | GET | Buscar clubes por nombre | `platform`, `name` |
| `/clubs/:clubId/info` | GET | Información básica del club | `platform`, `clubId` |
| `/clubs/:clubId/overall` | GET | Estadísticas generales | `platform`, `clubId` |
| `/clubs/:clubId/members` | GET | Miembros y jugadores | `platform`, `clubId` |
| `/clubs/:clubId/matches` | GET | Historial de partidos | `platform`, `clubId`, `type` |
| `/health` | GET | Health check del servidor | Ninguno |

### Parámetros Comunes

**Platform (plataforma):**
- `common-gen5` - PlayStation 5 / Xbox Series X|S / PC (Current Gen)
- `common-gen4` - PlayStation 4 / Xbox One (Last Gen)
- `nx` - Nintendo Switch

**Match Type (tipo de partido):**
- `league` - Partidos de liga
- `playoff` - Partidos de playoff
- `friendly` - Partidos amistosos

### Ejemplos de Uso

**1. Buscar clubes:**
```bash
curl "http://localhost:3001/api/clubs/search?platform=common-gen5&name=COKA"
```

**2. Información del club:**
```bash
curl "http://localhost:3001/api/clubs/1458593/info?platform=common-gen5"
```

**3. Miembros del club:**
```bash
curl "http://localhost:3001/api/clubs/1458593/members?platform=common-gen5"
```

**4. Partidos de liga:**
```bash
curl "http://localhost:3001/api/clubs/1458593/matches?platform=common-gen5&type=league"
```

**5. Health check:**
```bash
curl "http://localhost:3001/api/health"
```

## 🧪 Testing y Calidad de Código

### Ejecutar Tests

```bash
# Tests unitarios del Backend
cd apps/api
pnpm test

# Tests e2e del Backend
pnpm test:e2e

# Tests con cobertura
pnpm test:cov

# Lint de todo el monorepo
cd ../..
pnpm lint

# Fix automático de problemas de lint
pnpm lint:fix
```

### Verificar Build

```bash
# Build de todo el proyecto
pnpm build

# Verificar que no hay errores de TypeScript
pnpm typecheck
```

## 📦 Build y Deployment (Producción)

### Build Completo

```bash
# Desde la raíz del proyecto
pnpm build
```

Esto generará:
- `apps/api/dist/` - Backend compilado
- `apps/web/.next/` - Frontend optimizado

### Iniciar en Producción

**Backend API:**
```bash
cd apps/api
pnpm build
pnpm start:prod
```

**Frontend Web:**
```bash
cd apps/web
pnpm build
pnpm start
```

### Variables de Entorno para Producción

Actualiza tu `.env` para producción:

```env
# Backend
NODE_ENV=production
PORT=3001
EA_BASE_URL=https://proclubs.ea.com/api
USE_MOCKS=false                   # Usar API real de EA
REDIS_URL=redis://tu-redis:6379   # Redis en producción
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100                # Ajusta según tus necesidades

# Frontend
NEXT_PUBLIC_API_BASE=https://tu-dominio-api.com
```

### Deployment Recomendado

**Frontend (100% Gratis):**
- [Netlify](https://netlify.com/) - ⭐ **Recomendado** - Deploy automático, CDN global, SSL gratis
- [Vercel](https://vercel.com/) - Alternativa excelente para Next.js

**Backend:**
- [Render](https://render.com/) - ⭐ **Opción Gratuita** - Plan free con sleep después de 15min inactividad
- [Railway](https://railway.app/) - **Mejor rendimiento** - $5-10/mes, siempre activo, Redis incluido
- [Fly.io](https://fly.io/) - Deploy global con plan gratuito limitado
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

**Redis (Opcional):**
- **Cache In-Memory** - ⭐ **Gratis** - Incluido, sin servicios externos
- [Upstash](https://upstash.com/) - Redis serverless con plan gratuito generoso
- [Redis Cloud](https://redis.com/cloud/) - Redis managed profesional

> 💡 **Recomendación según presupuesto:**
> - **$0/mes:** Netlify + Render Free + Cache In-Memory
> - **~$5-10/mes:** Netlify + Railway + Redis incluido (mejor rendimiento)

---

## 🌐 Guía Completa: Deploy 100% GRATIS (Netlify + Render)

### Arquitectura del Deployment

```
┌─────────────────────────────────────────────────────┐
│                    USUARIO                          │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────▼───────────┐
        │   Netlify (Frontend) │ ← Deploy del Next.js (GRATIS)
        │   https://tuapp.netlify.app │
        └──────────┬───────────┘
                   │ API Calls
        ┌──────────▼───────────┐
        │  Render.com (Backend)│ ← Deploy del NestJS (GRATIS)
        │  https://tuapi.onrender.com │
        │  ⚠️ Sleep after 15min │
        └──────────┬───────────┘
                   │
        ┌──────────▼───────────┐
        │ Cache In-Memory      │ ← Gratis, sin Redis externo
        └──────────────────────┘
                   │
        ┌──────────▼───────────┐
        │ UptimeRobot (Opcional)│ ← Mantiene backend despierto (GRATIS)
        └──────────────────────┘
```

> **Nota sobre el Plan Gratuito:**
> - ✅ Perfecto para: Demos, portafolio, proyectos personales, pruebas
> - ⚠️ Limitación: Backend se duerme después de 15min sin uso (primera carga toma 30-50s)
> - 💡 Solución: Usa UptimeRobot gratis para mantenerlo despierto con pings cada 5min
        ┌──────────▼───────────┐
        │   Netlify (Frontend) │ ← Deploy del Next.js
        │   https://tuapp.netlify.app │
        └──────────┬───────────┘
                   │ API Calls
        ┌──────────▼───────────┐
        │  Railway (Backend)   │ ← Deploy del NestJS
        │  https://tuapi.up.railway.app │
        └──────────┬───────────┘
                   │
        ┌──────────▼───────────┐
        │   Redis (Upstash)    │ ← Cache opcional
        └──────────────────────┘
```

### 📦 Parte 1: Preparar el Proyecto

> ✅ Ya tienes el archivo `netlify.toml` creado en la raíz del proyecto.

#### 1.1 Verificar Configuración

El archivo `netlify.toml` ya está configurado correctamente para desplegar el frontend desde `apps/web`.

#### 1.2 Actualizar package.json del Frontend

Verifica que `apps/web/package.json` tenga estos scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### 1.3 Crear .gitignore para Build Artifacts

#### 1.2 Verificar .gitignore

Asegúrate de tener en `.gitignore`:

```
# Build artifacts
.next/
dist/
node_modules/
.env.local
.env.production
```

### 🚀 Parte 2: Deploy del Backend a Render (GRATIS)

**Render Free Tier es perfecto porque:**
- ✅ 100% Gratuito (no requiere tarjeta de crédito)
- ✅ Deploy automático desde Git
- ✅ SSL/HTTPS incluido
- ✅ Variables de entorno fáciles
- ✅ Logs en tiempo real
- ⚠️ Se duerme después de 15min sin uso (primera carga toma 30-50s)

#### 2.1 Crear Cuenta en Render

1. Ve a [render.com](https://render.com/)
2. Haz clic en **"Get Started"**
3. Conecta tu cuenta de GitHub (gratis, no requiere tarjeta)

#### 2.2 Crear Web Service

1. En el dashboard, haz clic en **"New +"** → **"Web Service"**
2. Selecciona tu repositorio `proclubs`
3. Haz clic en **"Connect"**

#### 2.3 Configurar el Servicio Backend

**Name:** `proclubs-api` (o el nombre que prefieras)

**Region:** Oregon (USA) - El servidor más cercano en plan gratuito

**Branch:** `main`

**Root Directory:**
```
apps/api
```

**Runtime:** Node

**Build Command:**
```bash
cd ../.. && npm install -g pnpm && pnpm install && cd apps/api && pnpm build
```

**Start Command:**
```bash
cd apps/api && node dist/main.js
```

**Instance Type:** ⚠️ **FREE** (Selecciona el plan gratuito)

#### 2.4 Configurar Variables de Entorno

Haz clic en "Advanced" o ve a "Environment" después de crear el servicio:

```env
NODE_ENV=production
PORT=10000
EA_BASE_URL=https://proclubs.ea.com/api
USE_MOCKS=false
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

> **Nota:** Render usa el puerto `10000` por defecto en el plan gratuito. NO añadas `REDIS_URL` - usaremos cache in-memory que es gratis y no requiere configuración adicional.

#### 2.5 Deploy

1. Haz clic en **"Create Web Service"**
2. Espera 5-10 minutos (la primera vez tarda más, es normal) ⏳
3. Render construirá e iniciará tu backend automáticamente

#### 2.6 Obtener la URL del Backend

Render te dará una URL como:
```
https://proclubs-api.onrender.com
```

**¡Guarda esta URL!** La necesitarás para configurar el frontend.

#### 2.7 Verificar que Funciona

Visita en tu navegador:
```
https://proclubs-api.onrender.com/api/health
```

Deberías ver: `{"status":"ok"}` ✅

> **Limitación del Plan Gratuito:** El servicio se "duerme" después de 15 minutos sin actividad. La primera request después del sleep toma 30-50 segundos. Ver paso 4.5 para solución.

### 🎨 Parte 3: Deploy del Frontend a Netlify (GRATIS)

#### 3.1 Crear Cuenta en Netlify

1. Ve a [netlify.com](https://www.netlify.com/)
2. Haz clic en **"Sign up"** (gratis, no requiere tarjeta)
3. Conecta tu cuenta de GitHub

#### 3.2 Crear Nuevo Site

1. Haz clic en **"Add new site" → "Import an existing project"**
2. Selecciona **"Deploy with GitHub"**
3. Busca y selecciona tu repositorio `proclubs`

#### 3.3 Configurar Build Settings

**Base directory:**
```
apps/web
```

**Build command:**
```bash
cd ../.. && pnpm install --frozen-lockfile && cd apps/web && pnpm build
```

**Publish directory:**
```
apps/web/.next
```

**Environment variables:**

```env
NEXT_PUBLIC_API_BASE=https://proclubs-api.onrender.com
NODE_VERSION=18
```

⚠️ **IMPORTANTE:** Reemplaza con tu URL real de Render (sin `/` al final).

#### 3.4 Deploy

1. Haz clic en **"Deploy site"**
2. Espera 2-5 minutos ⏳
3. Netlify te dará una URL como: `https://remarkable-app-123456.netlify.app` ✅

#### 3.5 Configurar Dominio Personalizado (Opcional)

1. En Netlify, ve a **"Site settings" → "Domain management"**
2. Haz clic en **"Add custom domain"**
3. Sigue las instrucciones para configurar tu DNS (el dominio lo compras por separado)

### 🔧 Parte 4: Configuración Final

#### 4.1 Actualizar CORS en el Backend

Edita el archivo `apps/api/src/main.ts` para permitir requests desde Netlify:

En `apps/api/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://tu-app.netlify.app', // ⚠️ Reemplaza con tu URL real de Netlify
  ],
  credentials: true,
});
```

Haz commit y push para que Render redesplegue automáticamente (~5 minutos):

```bash
git add apps/api/src/main.ts
git commit -m "chore: update CORS for production"
git push origin main
```

#### 4.2 Verificar Variables de Entorno

**Backend (Render):**
```env
NODE_ENV=production
PORT=10000
EA_BASE_URL=https://proclubs.ea.com/api
USE_MOCKS=false
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

**Frontend (Netlify):**
```env
NEXT_PUBLIC_API_BASE=https://proclubs-api.onrender.com
NODE_VERSION=18
```

#### 4.3 Probar la Aplicación

1. Visita tu URL de Netlify: `https://tu-app.netlify.app`
2. Prueba buscar un club (ej: "COKA FC")
3. ⏳ Si el backend estaba dormido, la primera carga toma 30-50 segundos
4. Después de "despertar", todo funciona normalmente ✅
5. Revisa los logs en Render si hay errores (Dashboard → Logs)

#### 4.4 Verificar Health Check

Abre en tu navegador:
```
https://proclubs-api.onrender.com/api/health
```

Deberías ver: `{"status":"ok"}` ✅

#### 4.5 (Opcional) Mantener el Backend Despierto - UptimeRobot

Para evitar el "sleep" del plan gratuito y tener mejor experiencia:

1. Ve a [uptimerobot.com](https://uptimerobot.com/) (gratis, no requiere tarjeta)
2. Crea una cuenta
3. Haz clic en **"Add New Monitor"**:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** ProClubs Backend
   - **URL:** `https://proclubs-api.onrender.com/api/health`
   - **Monitoring Interval:** 5 minutes
4. Guarda

¡Listo! Tu backend recibirá un ping cada 5 minutos y nunca se dormirá 🎉

> **Nota:** UptimeRobot también te envía emails si el servicio falla.

### 🔄 Parte 5: Actualizaciones Automáticas

#### 5.1 Git Push → Auto Deploy

Ambas plataformas detectan cambios automáticamente:

```bash
# Haz cambios en tu código
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# Railway y Netlify detectarán el push y redesplegarán automáticamente
```

#### 5.2 Monitorear Deploys

**Railway:**
- Ve a tu proyecto → "Deployments"
- Revisa logs en tiempo real

**Netlify:**
- Ve a "Deploys" en tu dashboard
- Haz clic en un deploy para ver logs

### 🐛 Troubleshooting del Deployment

#### Problema: Build falla en Netlify

**Solución:**
```bash
# Verifica que el build funcione localmente
cd apps/web
pnpm build

# Si falla localmente, arregla los errores primero
```

#### Problema: Frontend no conecta con Backend

**Solución:**
1. Verifica `NEXT_PUBLIC_API_BASE` en Netlify
2. Asegúrate de que incluya `https://` y no termine en `/`
3. Verifica CORS en el backend

#### Problema: Backend crashea en Railway

**Solución:**
1. Revisa logs en Railway Dashboard
2. Verifica que todas las variables de entorno estén configuradas
3. Asegúrate de que el Start Command sea correcto: `node dist/main.js`

#### Problema: Redis no conecta

**Solución:**
1. Verifica que `REDIS_URL` esté configurada en Railway
2. Si falla, deja `REDIS_URL` vacío para usar cache in-memory

### 💰 Costos Estimados

**Plan Gratuito (Para Empezar):**
- Netlify Frontend: **$0/mes** (100GB bandwidth)
- Render Backend: **$0/mes** (con limitaciones: sleep after 15min inactivity)
- Redis In-Memory: **$0/mes**

**Plan Recomendado (Producción):**
- Netlify Frontend: **$0/mes** (suficiente para la mayoría)
- Railway Backend + Redis: **~$5-10/mes** (siempre activo, mejor rendimiento)
- Upstash Redis: **$0/mes** (10K commands/day gratis)

**Total Recomendado:** ~$5-10/mes para un proyecto en producción con buen rendimiento.

### 📝 Checklist Final

Antes de dar por terminado el deployment:

- [ ] ✅ Backend desplegado en Railway y funcionando
- [ ] ✅ Redis configurado (o cache in-memory activo)
- [ ] ✅ Frontend desplegado en Netlify
- [ ] ✅ Variables de entorno configuradas en ambas plataformas
- [ ] ✅ CORS configurado correctamente en el backend
- [ ] ✅ Búsqueda de clubes funciona
- [ ] ✅ Estadísticas cargan correctamente
- [ ] ✅ No hay errores en la consola del navegador
- [ ] ✅ No hay errores en los logs de Railway
- [ ] ✅ La app es responsive en móvil
- [ ] ✅ Dominio personalizado configurado (opcional)

### 🎉 ¡Listo!

Tu aplicación ahora está en producción:
- **Frontend:** https://tu-app.netlify.app
- **Backend:** https://tu-api.up.railway.app

¡Comparte el link con la comunidad de Pro Clubs! ⚽🚀

## � Troubleshooting (Solución de Problemas)

### Problema: El Backend no inicia

**Síntomas:** Error al ejecutar `pnpm dev`

**Soluciones:**
1. Verifica que el puerto 3001 esté libre:
   ```bash
   # Windows
   netstat -ano | findstr :3001
   
   # Mac/Linux
   lsof -i :3001
   ```
2. Revisa que las variables de entorno estén correctas en `.env`
3. Intenta con mocks activados: `USE_MOCKS=true`

### Problema: El Frontend no carga datos

**Síntomas:** La página se carga pero no muestra clubes

**Soluciones:**
1. Verifica que el backend esté corriendo en http://localhost:3001
2. Abre DevTools (F12) → Network tab para ver errores de red
3. Verifica `NEXT_PUBLIC_API_BASE` en `.env`
4. Prueba acceder directamente a: http://localhost:3001/api/health

### Problema: "Cannot find module" al instalar

**Síntomas:** Errores de módulos faltantes

**Soluciones:**
```bash
# Limpia node_modules y reinstala
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm install
```

### Problema: Redis no conecta

**Síntomas:** Warnings sobre cache en los logs

**Soluciones:**
1. Si no necesitas Redis, deja `REDIS_URL` vacío (usará cache in-memory)
2. Si usas Docker:
   ```bash
   docker-compose down
   docker-compose up -d
   docker-compose ps  # Verifica que esté "Up"
   ```
3. Verifica la URL: `REDIS_URL=redis://localhost:6379`

### Problema: Build falla con errores de TypeScript

**Síntomas:** Errores de tipos al hacer `pnpm build`

**Soluciones:**
```bash
# Verifica errores de TypeScript
pnpm typecheck

# Limpia builds anteriores
rm -rf apps/*/dist apps/*/.next
pnpm build
```

### Problema: La API de EA no responde

**Síntomas:** Timeout o errores 5xx

**Soluciones:**
1. Activa el modo mocks: `USE_MOCKS=true` en `.env`
2. Verifica que `EA_BASE_URL` sea correcta
3. La API de EA puede estar temporalmente caída (espera unos minutos)

### Problema: Imágenes de escudos no cargan

**Síntomas:** Placeholder en lugar de escudos de clubes

**Soluciones:**
- Los escudos se obtienen de EA Sports CDN
- Si EA no tiene el escudo, se muestra un badge personalizado
- Esto es normal y funciona como fallback

### Obtener Ayuda Adicional

Si ninguna solución funciona:

1. **Revisa los logs:** 
   - Backend: Terminal donde corre `pnpm dev`
   - Frontend: DevTools → Console (F12)

2. **Verifica versiones:**
   ```bash
   node --version    # >= 18.0.0
   pnpm --version    # >= 8.0.0
   ```

3. **Reinstalación limpia:**
   ```bash
   rm -rf node_modules apps/*/node_modules packages/*/node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

## 🚀 Scripts y Comandos Útiles

### Comandos de Desarrollo

```bash
# Iniciar todo el proyecto en desarrollo
pnpm dev

# Iniciar solo el backend
pnpm dev:api

# Iniciar solo el frontend
pnpm dev:web

# Watch mode (auto-recompila al guardar)
pnpm dev --watch
```

### Comandos de Build

```bash
# Build de todo el proyecto
pnpm build

# Build solo backend
pnpm build:api

# Build solo frontend
pnpm build:web

# Build optimizado para producción
NODE_ENV=production pnpm build
```

### Comandos de Testing

```bash
# Tests unitarios
pnpm test

# Tests con watch mode
pnpm test:watch

# Tests con cobertura
pnpm test:cov

# Tests e2e
pnpm test:e2e
```

### Comandos de Calidad

```bash
# Lint de todo el código
pnpm lint

# Lint con auto-fix
pnpm lint:fix

# Format código con Prettier
pnpm format

# Type checking
pnpm typecheck
```

### Comandos de Limpieza

```bash
# Limpiar node_modules
pnpm clean

# Limpiar builds
rm -rf apps/*/dist apps/*/.next

# Limpiar todo y reinstalar
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install
```

### Comandos de Docker

```bash
# Iniciar Redis
docker-compose up -d

# Ver logs de Redis
docker-compose logs -f

# Detener Redis
docker-compose down

# Reiniciar Redis
docker-compose restart
```

## 🎯 Features Implementadas

### ✅ Backend (NestJS)
- [x] Proxy a EA API con retry automático (1 reintento en errores)
- [x] Sistema de cache configurable (in-memory o Redis)
- [x] Rate limiting global por IP (30 requests/minuto)
- [x] Transformación y normalización de respuestas
- [x] Mock mode para desarrollo sin API real (`USE_MOCKS=true`)
- [x] Documentación Swagger automática en `/docs`
- [x] Manejo robusto de errores y timeouts (15s máximo)
- [x] Tests unitarios y e2e con Jest
- [x] Health check endpoint en `/api/health`

### ✅ Frontend (Next.js + React)
- [x] Búsqueda de clubes con debounce (400ms)
- [x] Selector de plataforma (PS5, Xbox Series, PC)
- [x] Página de detalle del club con 3 pestañas:
  - **Resumen:** División, habilidad, récord, estadio
  - **Jugadores:** Rankings Top 5 + tabla completa con filtros y ordenamiento
  - **Partidos:** Historial con filtros (liga/playoff/amistoso) y detalles expandibles
- [x] ID de PlayStation visible en tabla de jugadores
- [x] Loading states y error handling en toda la app
- [x] Diseño 100% responsive (mobile-first)
- [x] Animaciones fluidas con Framer Motion
- [x] UI profesional con Shadcn/ui y Tailwind CSS
- [x] Optimización de imágenes con Next.js Image
- [x] Cache de datos con TanStack Query

## � Roadmap (Funcionalidades Futuras)

### 🎯 Próximas Features
- [ ] **Modo Oscuro/Claro** - Toggle para cambiar el tema visual
- [ ] **Comparación de Clubes** - Ver estadísticas lado a lado de 2+ clubes
- [ ] **Gráficos de Evolución** - Visualización de progreso en el tiempo
- [ ] **Exportación a PDF** - Descargar reportes de estadísticas
- [ ] **Sistema de Favoritos** - Guardar clubes favoritos localmente
- [ ] **Paginación en Partidos** - Cargar más partidos históricos
- [ ] **Filtros Avanzados** - Búsqueda por posición, valoración, etc.

### 🔧 Mejoras Técnicas
- [ ] **SSR Completo** - Server-Side Rendering para mejor SEO
- [ ] **PWA** - Progressive Web App con modo offline
- [ ] **WebSockets** - Actualizaciones en tiempo real
- [ ] **Internacionalización** - Soporte multi-idioma (ES, EN, PT)
- [ ] **Analytics** - Tracking de uso con Google Analytics
- [ ] **Tests E2E Frontend** - Playwright o Cypress

### 🎨 UX Improvements
- [ ] **Notificaciones** - Alertas de nuevos partidos
- [ ] **Skeleton Loaders** - Mejores estados de carga
- [ ] **Tooltips Informativos** - Explicaciones de métricas
- [ ] **Búsqueda por Jugador** - Encontrar jugadores específicos
- [ ] **Estadísticas por Temporada** - Filtrar datos históricos

## 🤝 Contribuir al Proyecto

¡Las contribuciones son bienvenidas! Sigue estos pasos:

### 1. Fork y Clone

```bash
# Haz fork del repositorio en GitHub, luego:
git clone https://github.com/TU_USUARIO/proclubs.git
cd proclubs
pnpm install
```

### 2. Crea una Rama

```bash
# Crea una rama descriptiva
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. Desarrolla y Testea

```bash
# Haz tus cambios y asegúrate de que funcionen
pnpm dev

# Ejecuta los tests
pnpm test

# Verifica el linting
pnpm lint
```

### 4. Commit y Push

```bash
# Commit con mensaje descriptivo
git add .
git commit -m "feat: añadir modo oscuro al sistema"

# Push a tu fork
git push origin feature/nueva-funcionalidad
```

### 5. Abre un Pull Request

1. Ve a tu fork en GitHub
2. Haz clic en "Compare & pull request"
3. Describe tus cambios detalladamente
4. Espera la revisión y feedback

### Guías de Contribución

**Commits:**
- Usa [Conventional Commits](https://www.conventionalcommits.org/)
- Ejemplos: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`

**Código:**
- Sigue el estilo existente (usa el linter)
- Añade tests para nuevas funcionalidades
- Actualiza la documentación si es necesario

**Pull Requests:**
- Mantén cambios enfocados (un PR = una feature/fix)
- Incluye screenshots para cambios visuales
- Actualiza el README si añades features mayores

## 📄 Licencia

Este proyecto está licenciado bajo la **Licencia MIT**.

```
MIT License

Copyright (c) 2024 Pro Clubs Stats Tracker

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para
usar el Software sin restricciones, incluyendo sin limitación los derechos de
usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o
vender copias del Software.
```

Ver archivo [LICENSE](LICENSE) para más detalles.

## 👤 Créditos y Agradecimientos

### Desarrollado Por
- **BryanTech** - Desarrollador Principal
- Hecho con ❤️ para la comunidad de Pro Clubs

### Agradecimientos Especiales

- **EA Sports FC** - Por proporcionar la API pública de Pro Clubs
- **Comunidad de Next.js** - Por el framework increíble
- **Shadcn** - Por los componentes de UI hermosos y accesibles
- **Vercel** - Por la plataforma de hosting y desarrollo
- **Contribuidores Open Source** - Todas las librerías que hacen posible este proyecto

### Tecnologías Utilizadas

Este proyecto no sería posible sin:
- [Next.js](https://nextjs.org/) - Framework React
- [NestJS](https://nestjs.com/) - Framework backend
- [Tailwind CSS](https://tailwindcss.com/) - Estilos
- [TanStack Query](https://tanstack.com/query) - State management
- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- Y muchas más librerías open source ❤️

## 📞 Contacto y Soporte

### ¿Necesitas Ayuda?

- 📧 **Email:** tu-email@ejemplo.com
- 🐛 **Issues:** [GitHub Issues](https://github.com/tuusuario/proclubs/issues)
- 💬 **Discusiones:** [GitHub Discussions](https://github.com/tuusuario/proclubs/discussions)

### Redes Sociales

- 🐦 **Twitter:** [@tu_usuario](https://twitter.com/tu_usuario)
- 💼 **LinkedIn:** [Tu Perfil](https://linkedin.com/in/tu-perfil)
- 🎮 **Discord:** Únete a nuestra comunidad

## ⚠️ Disclaimer (Descargo de Responsabilidad)

**Este proyecto NO está afiliado, asociado, autorizado, respaldado por, o de ninguna manera oficialmente conectado con Electronic Arts Inc., EA Sports, o cualquiera de sus subsidiarias o afiliadas.**

- Los nombres oficiales **EA Sports FC**, **Pro Clubs**, y los logos relacionados son marcas registradas de Electronic Arts Inc.
- Este proyecto es un **proyecto de la comunidad para la comunidad**, creado con fines educativos y de análisis.
- Todos los datos mostrados son obtenidos de la **API pública de EA Sports FC**.
- El uso de este proyecto es bajo tu propia responsabilidad.

---

<div align="center">

**⚽ Pro Clubs Stats Tracker**

*Análisis profesional de estadísticas para EA Sports FC Pro Clubs*

Made with ❤️ and TypeScript

[⬆ Volver arriba](#-pro-clubs-stats-tracker)

</div>

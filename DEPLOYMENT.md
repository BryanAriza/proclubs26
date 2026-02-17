# 🚀 Guía Rápida de Deployment (100% GRATIS)

## ¿Qué vas a desplegar?

- **Frontend (Next.js)** → Netlify 🌐 (Gratis)
- **Backend (NestJS)** → Render.com 🚂 (Gratis con limitaciones)
- **Redis (opcional)** → Cache in-memory 💾 (Gratis, sin Redis externo)

> ⚠️ **Plan Gratuito:** El backend en Render se "duerme" después de 15 minutos de inactividad. La primera carga después del sleep toma 30-50 segundos. Para uso personal o demos, es perfecto. Para producción con tráfico constante, considera Railway ($5/mes).

---

## 📋 Checklist Pre-Deployment

Antes de comenzar, asegúrate de tener:

- [ ] Cuenta en GitHub con el código subido
- [ ] Código funcionando localmente con `pnpm dev`
- [ ] Build exitoso con `pnpm build`
- [ ] Archivo `netlify.toml` en la raíz del proyecto ✅ (ya creado)

---

## 🚂 Paso 1: Deploy del Backend GRATIS (Render.com)

### 1.1 Crear cuenta
👉 https://render.com/ → "Get Started" → Conecta GitHub (gratis, no requiere tarjeta)

### 1.2 Crear Web Service
- Clic en "New +" → "Web Service"
- Selecciona tu repositorio `proclubs`
- Clic en "Connect"

### 1.3 Configurar el Servicio

**Name:** `proclubs-api` (o el nombre que prefieras)

**Region:** Oregon (USA) - El más cercano gratuito

**Branch:** `main`

**Root Directory:** `apps/api`

**Runtime:** Node

**Build Command:**
```bash
cd ../.. && npm install -g pnpm && pnpm install && cd apps/api && pnpm build
```

**Start Command:**
```bash
cd apps/api && node dist/main.js
```

**Instance Type:** ⚠️ **Free** (Selecciona el plan gratuito)

### 1.4 Variables de Entorno (Environment Variables)

Haz clic en "Advanced" y añade estas variables:

```env
NODE_ENV=production
PORT=10000
EA_BASE_URL=https://proclubs.ea.com/api
USE_MOCKS=false
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

> 📝 **Nota:** Render usa el puerto 10000 por defecto en el plan gratuito. NO cambies `REDIS_URL` - usaremos cache in-memory que es gratis.

### 1.5 Deploy
- Clic en "Create Web Service"
- Espera 5-10 minutos (la primera vez tarda más) ⏳
- Render construirá e iniciará tu backend automáticamente

### 1.6 Obtén tu URL
Render te dará una URL como:
```
https://proclubs-api.onrender.com
```
**📝 GUARDA ESTA URL** - La necesitas para Netlify

### 1.7 Verificar que funciona
Visita:
```
https://proclubs-api.onrender.com/api/health
```

Deberías ver: `{"status":"ok"}` ✅

> ⚠️ **Limitación del Plan Gratuito:** 
> - El servicio se "duerme" después de 15 minutos sin actividad
> - La primera request después del sleep toma 30-50 segundos en "despertar"
> - 750 horas/mes gratis (suficiente para uso personal)
> - Para evitar el sleep, puedes usar un servicio como [UptimeRobot](https://uptimerobot.com/) que haga ping cada 14 minutos (también gratis)

---

## 🌐 Paso 2: Deploy del Frontend (Netlify)

### 2.1 Crear cuenta
👉 https://netlify.com/ → "Sign up" → Conecta GitHub

### 2.2 Importar proyecto
- "Add new site" → "Import an existing project"
- "Deploy with GitHub" → Selecciona `proclubs`

### 2.3 Configurar Build Settings

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

### 2.4 Variables de Entorno

⚠️ **IMPORTANTE:** Reemplaza con tu URL real de Render

```env
NEXT_PUBLIC_API_BASE=https://proclubs-api.onrender.com
NODE_VERSION=18
```

### 2.5 Deploy
- Clic en "Deploy site"
- Espera 2-5 minutos ⏳
- ¡Listo! Recibirás una URL como: `https://remarkable-app-123456.netlify.app`

---

## 🔧 Paso 3: Configuración Final

### 3.1 Actualizar CORS en Backend

Edita `apps/api/src/main.ts`:

```typescript
app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://TU-APP.netlify.app', // ⚠️ Reemplaza con tu URL de Netlify
  ],
  credentials: true,
});
```

Haz commit y push para que Render redesplegue (tarda ~5 min):
```bash
git add apps/api/src/main.ts
git commit -m "chore: update CORS for production"
git push origin main
```

### 3.2 (Opcional) Mantener el Backend Despierto

Para evitar el "sleep" del plan gratuito, usa UptimeRobot:

1. Ve a https://uptimerobot.com/ (gratis, no requiere tarjeta)
2. Crea una cuenta
3. "Add New Monitor":
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** ProClubs Backend
   - **URL:** https://proclubs-api.onrender.com/api/health
   - **Monitoring Interval:** 5 minutes
4. ¡Listo! Tu backend recibirá un ping cada 5 minutos y nunca se dormirá 🎉

### 3.3 Probar la Aplicación

1. Visita tu URL de Netlify
2. Busca un club (ej: "COKA FC")
3. ⏳ Si el backend estaba dormido, espera 30-50 segundos en la primera carga
4. Después funcionará normal ✅

---

## 🐛 Problemas Comunes

### Primera carga muy lenta (30-50 segundos)
- **Causa:** El backend en Render estaba dormido
- **Solución:** Configura UptimeRobot (ver paso 3.2) para mantenerlo despierto
- **Alternativa:** Espera, es normal en el plan gratuito

### Frontend no conecta con Backend
- Verifica `NEXT_PUBLIC_API_BASE` en Netlify (Site settings → Environment variables)
- Asegúrate de que incluya `https://` y NO termine en `/`
- Ejemplo correcto: `https://proclubs-api.onrender.com`
- Verifica que CORS esté configurado correctamente

### Backend crashea
- Revisa logs en Render Dashboard (pestaña "Logs")
- Verifica que Start Command sea: `cd apps/api && node dist/main.js`
- Asegúrate de que todas las variables estén configuradas
- Verifica que el puerto sea `10000` en la variable `PORT`

### Build falla en Netlify
- Verifica que el build funcione localmente: `cd apps/web && pnpm build`
- Revisa los logs del build en Netlify

### Build falla en Render
- Verifica que el Build Command incluya la instalación de pnpm
- Revisa los logs en la pestaña "Events"
- Asegúrate de que Root Directory sea `apps/api`

---

## 🔄 Actualizaciones Futuras

Después del deployment inicial, es súper simple:

```bash
# 1. Haz cambios en tu código
git add .
git commit -m "feat: nueva funcionalidad"
git push origin main

# 2. ¡Eso es todo! Render y Netlify redesplegarán automáticamente 🚀
# Render tarda ~5 minutos, Netlify ~2 minutos
```

---

## 💰 Costos

### 🎉 100% GRATIS:
- ✅ **Netlify Frontend:** $0/mes (100GB bandwidth, suficiente para miles de visitas)
- ✅ **Render Backend:** $0/mes (750 horas/mes, con sleep después de 15min inactividad)
- ✅ **UptimeRobot:** $0/mes (mantiene tu backend despierto)
- ✅ **Cache In-Memory:** $0/mes (sin Redis externo)

**Total: $0/mes** - Perfecto para proyectos personales, demos, portafolio

### 💎 Si necesitas mejor rendimiento:
- **Railway Backend:** $5-10/mes (sin sleep, siempre activo, Redis incluido)
- **Render Paid:** $7/mes (sin sleep, siempre activo)
- **Total con backend de pago:** ~$5-10/mes

---

## 📱 URLs Finales

Una vez terminado, tendrás:

- **🌐 Frontend:** https://tu-app.netlify.app
- **🚂 Backend:** https://proclubs-api.onrender.com
- **📊 Swagger Docs:** https://proclubs-api.onrender.com/docs
- **❤️ Health Check:** https://proclubs-api.onrender.com/api/health

---

## ✅ Checklist Final

Antes de dar por terminado:

- [ ] Backend funciona en Render (visita /api/health)
- [ ] Frontend funciona en Netlify
- [ ] Variables de entorno configuradas en ambos
- [ ] CORS actualizado con la URL de Netlify
- [ ] UptimeRobot configurado (opcional pero recomendado)
- [ ] Búsqueda de clubes funciona
- [ ] Sin errores en consola del navegador
- [ ] Sin errores en logs de Render
- [ ] Responsive en móvil

---

## 🎉 ¡Felicidades!

Tu aplicación está **100% gratis** en producción y lista para compartir! ⚽

**Siguiente paso:** Comparte tu URL y recibe feedback 🚀

## 🔗 Links Útiles

- **Render Dashboard:** https://dashboard.render.com/
- **Netlify Dashboard:** https://app.netlify.com/
- **UptimeRobot:** https://uptimerobot.com/ (para mantener el backend despierto)
- **GitHub Repo:** Tu repositorio para ver deploys automáticos

## 💡 Tips Adicionales

1. **Primer uso después de un tiempo:** Si nadie usa la app por 15+ minutos, la primera carga será lenta (30-50s). Usa UptimeRobot para evitarlo.

2. **Monitoreo:** Render envía emails si el servicio falla. Netlify también.

3. **Logs:** Siempre revisa los logs en Render si algo no funciona.

4. **Dominio personalizado:** Tanto Netlify como Render permiten dominios custom gratis (solo pagas el dominio).

5. **SSL:** Ambos servicios incluyen SSL/HTTPS gratis automáticamente 🔒

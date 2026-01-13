# 🚀 Guía Paso a Paso: Desplegar en Vercel

## ✅ Requisitos Previos
- Cuenta de GitHub (gratuita)
- Cuenta de Vercel (gratuita)
- El proyecto ya está listo para desplegar

---

## 📋 Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"New"** (o el ícono +)
3. Configura tu repositorio:
   - **Nombre**: `dashboard-sostenibilidad-inmobiliaria`
   - **Descripción**: "Dashboard profesional de sostenibilidad inmobiliaria con análisis energético y riesgos climáticos"
   - **Visibilidad**: Privado o Público (tu elección)
4. **NO** marques ninguna opción de inicialización (README, .gitignore, licencia)
5. Haz clic en **"Create repository"**

### 1.2 Subir el Proyecto a GitHub

Desde tu computadora local, después de descomprimir el archivo ZIP:

```bash
# Navegar al directorio del proyecto
cd dashboard-sostenibilidad-web

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Dashboard de Sostenibilidad Inmobiliaria"

# Conectar con tu repositorio de GitHub
# Reemplaza TU_USUARIO con tu nombre de usuario de GitHub
git remote add origin https://github.com/TU_USUARIO/dashboard-sostenibilidad-inmobiliaria.git

# Subir el código
git branch -M main
git push -u origin main
```

---

## 🌐 Paso 2: Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. **Importante**: Selecciona **"Continue with GitHub"** para conectar tu cuenta
4. Autoriza a Vercel para acceder a tus repositorios
5. Completa tu perfil si es necesario

---

## 🚀 Paso 3: Importar y Desplegar el Proyecto

### 3.1 Importar desde GitHub

1. En el dashboard de Vercel, haz clic en **"Add New..."** → **"Project"**
2. Vercel mostrará tus repositorios de GitHub
3. Busca `dashboard-sostenibilidad-inmobiliaria`
4. Haz clic en **"Import"**

### 3.2 Configurar el Proyecto

Vercel detectará automáticamente que es un proyecto Next.js. Verifica:

- **Framework Preset**: Next.js ✅ (detectado automáticamente)
- **Root Directory**: `./` (por defecto)
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**¡No cambies nada!** La configuración automática es correcta.

### 3.3 Configurar Variables de Entorno

**MUY IMPORTANTE**: Antes de desplegar, configura la base de datos:

1. En la sección **"Environment Variables"**, agrega:

```
DATABASE_URL
```

**Valor temporal** (usaremos SQLite primero):
```
file:./prisma/dev.db
```

2. Haz clic en **"Add"**

### 3.4 Desplegar

1. Haz clic en **"Deploy"**
2. Vercel comenzará a construir tu proyecto (toma 2-3 minutos)
3. Verás el progreso en tiempo real
4. Cuando termine, verás: **"🎉 Congratulations!"**

---

## 🗄️ Paso 4: Configurar Base de Datos PostgreSQL

### 4.1 Crear Base de Datos en Vercel

1. En tu proyecto desplegado, ve a la pestaña **"Storage"**
2. Haz clic en **"Create Database"**
3. Selecciona **"Postgres"**
4. Elige el nombre: `dashboard-sostenibilidad-db`
5. Selecciona la región más cercana a tus usuarios
6. Haz clic en **"Create"**

### 4.2 Conectar Base de Datos

Vercel automáticamente:
- Creará la variable de entorno `POSTGRES_URL`
- La conectará a tu proyecto
- Actualizará el despliegue

### 4.3 Actualizar Configuración de Prisma

1. Ve a tu proyecto local
2. Edita `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Cambiar de "sqlite" a "postgresql"
  url      = env("POSTGRES_URL")  // Cambiar de "DATABASE_URL" a "POSTGRES_URL"
}
```

3. Guarda y sube los cambios:

```bash
git add prisma/schema.prisma
git commit -m "Update database to PostgreSQL"
git push
```

Vercel detectará el cambio y redesplegará automáticamente.

### 4.4 Inicializar Base de Datos

Necesitas ejecutar las migraciones y seed. Tienes 2 opciones:

**Opción A: Desde Vercel CLI (Recomendado)**

1. Instala Vercel CLI:
```bash
npm install -g vercel
```

2. Inicia sesión:
```bash
vercel login
```

3. Vincula tu proyecto:
```bash
cd dashboard-sostenibilidad-web
vercel link
```

4. Ejecuta los comandos de base de datos:
```bash
vercel env pull .env.local
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

**Opción B: Desde el Dashboard de Vercel**

1. Ve a tu proyecto en Vercel
2. Pestaña **"Settings"** → **"Functions"**
3. Agrega un script temporal en `package.json`:

```json
"scripts": {
  "postbuild": "prisma generate && prisma db push && ts-node prisma/seed.ts"
}
```

4. Haz commit y push:
```bash
git add package.json
git commit -m "Add postbuild script"
git push
```

---

## 🎉 Paso 5: Acceder a tu Dashboard

1. En Vercel, ve a tu proyecto
2. Verás tu URL en la parte superior: `https://dashboard-sostenibilidad-inmobiliaria.vercel.app`
3. Haz clic en **"Visit"** o copia la URL
4. **¡Tu dashboard está en vivo!** 🚀

---

## 🔧 Paso 6: Configuración Adicional (Opcional)

### 6.1 Dominio Personalizado

1. En Vercel, ve a **"Settings"** → **"Domains"**
2. Agrega tu dominio personalizado (ej: `dashboard.tuempresa.com`)
3. Configura los DNS según las instrucciones de Vercel
4. Vercel configurará SSL automáticamente

### 6.2 Variables de Entorno Adicionales

Si necesitas agregar más configuraciones:

1. Ve a **"Settings"** → **"Environment Variables"**
2. Agrega las variables necesarias
3. Redeploye el proyecto

---

## 📊 Monitoreo y Mantenimiento

### Ver Logs
1. En Vercel, pestaña **"Deployments"**
2. Haz clic en cualquier despliegue
3. Ve a **"Functions"** para ver logs de las APIs

### Actualizar el Proyecto
Cada vez que hagas `git push`, Vercel redesplegará automáticamente:

```bash
# Hacer cambios en tu código
git add .
git commit -m "Descripción de cambios"
git push
```

### Rollback
Si algo sale mal:
1. Ve a **"Deployments"**
2. Encuentra un despliegue anterior que funcionaba
3. Haz clic en los 3 puntos → **"Promote to Production"**

---

## ❓ Solución de Problemas

### Error: "Prisma Client not found"
```bash
# Asegúrate de que postbuild incluye prisma generate
"postbuild": "prisma generate"
```

### Error: "Database connection failed"
- Verifica que `POSTGRES_URL` esté configurada
- Verifica que la base de datos esté creada en Vercel Storage

### Error: "Build failed"
- Revisa los logs en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el build local funciona: `npm run build`

---

## 🎯 Checklist Final

Antes de compartir tu dashboard, verifica:

- ✅ El sitio carga correctamente
- ✅ Todas las pestañas funcionan
- ✅ Los datos se muestran correctamente
- ✅ Los gráficos se renderizan
- ✅ El botón de carga de archivos aparece (aunque la funcionalidad requiere configuración adicional de almacenamiento)
- ✅ El diseño es responsive (prueba en móvil)

---

## 📞 Recursos Adicionales

- **Documentación de Vercel**: https://vercel.com/docs
- **Documentación de Next.js**: https://nextjs.org/docs
- **Documentación de Prisma**: https://www.prisma.io/docs
- **Soporte de Vercel**: https://vercel.com/support

---

## 🌟 ¡Felicidades!

Tu Dashboard de Sostenibilidad Inmobiliaria está ahora en producción con:
- ✅ URL pública permanente
- ✅ SSL/HTTPS automático
- ✅ CDN global para máxima velocidad
- ✅ Despliegue continuo desde Git
- ✅ Base de datos PostgreSQL
- ✅ Escalabilidad automática

**URL de ejemplo**: `https://dashboard-sostenibilidad-inmobiliaria.vercel.app`

¡Ahora puedes compartir tu dashboard con clientes e inversores! 🎉


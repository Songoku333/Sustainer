# 🚀 Guía de Despliegue en Vercel - Dashboard con Autenticación

## 📋 Resumen

Esta guía te ayudará a desplegar tu **Dashboard de Sostenibilidad Inmobiliaria** con sistema completo de autenticación (login y registro) en Vercel.

## ✨ Funcionalidades Incluidas

- ✅ Sistema de autenticación completo (NextAuth.js)
- ✅ Página de registro de usuarios
- ✅ Página de login
- ✅ Protección de rutas del dashboard
- ✅ Gestión de sesiones
- ✅ Base de datos con PostgreSQL
- ✅ Dashboard completo con 7 pestañas
- ✅ Análisis de datos reales de consumo energético
- ✅ Visualizaciones interactivas

## 🎯 Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear Repositorio en GitHub

1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"New"** (verde) para crear un nuevo repositorio
3. Configura el repositorio:
   - **Repository name**: `dashboard-sostenibilidad-inmobiliaria`
   - **Description**: "Dashboard de Sostenibilidad Inmobiliaria con análisis energético y riesgos climáticos"
   - **Visibility**: Private o Public (según prefieras)
   - ❌ **NO** marques "Add a README file"
   - ❌ **NO** marques "Add .gitignore"
   - ❌ **NO** marques "Choose a license"
4. Haz clic en **"Create repository"**

### 1.2 Subir el Código a GitHub

Descomprime el archivo ZIP en tu computadora y ejecuta estos comandos en la terminal:

```bash
cd dashboard-sostenibilidad-web

# Inicializar Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Dashboard de Sostenibilidad con autenticación"

# Conectar con GitHub (reemplaza TU_USUARIO con tu usuario de GitHub)
git remote add origin https://github.com/TU_USUARIO/dashboard-sostenibilidad-inmobiliaria.git

# Subir el código
git branch -M main
git push -u origin main
```

**Nota**: Cuando te pida usuario y contraseña, usa tu **Personal Access Token** de GitHub en lugar de tu contraseña.

#### Crear Personal Access Token (si no tienes uno):
1. Ve a GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click en "Generate new token (classic)"
3. Selecciona los permisos: `repo` (todos los sub-permisos)
4. Copia el token generado (¡guárdalo en un lugar seguro!)

---

## 🚀 Paso 2: Desplegar en Vercel

### 2.1 Crear Cuenta en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en **"Sign Up"**
3. Selecciona **"Continue with GitHub"**
4. Autoriza a Vercel para acceder a tu cuenta de GitHub

### 2.2 Importar el Proyecto

1. En el dashboard de Vercel, haz clic en **"Add New..."** → **"Project"**
2. Busca tu repositorio `dashboard-sostenibilidad-inmobiliaria`
3. Haz clic en **"Import"**

### 2.3 Configurar el Proyecto

En la página de configuración:

**Framework Preset**: Next.js (se detecta automáticamente)

**Root Directory**: `./` (dejar por defecto)

**Build Command**: `npm run build` (dejar por defecto)

**Output Directory**: `.next` (dejar por defecto)

**Install Command**: `npm install` (dejar por defecto)

**❌ NO hagas clic en "Deploy" todavía** - primero necesitamos configurar la base de datos

---

## 🗄️ Paso 3: Configurar Base de Datos PostgreSQL

### 3.1 Crear Base de Datos en Vercel

1. En la página de configuración del proyecto, ve a la pestaña **"Storage"**
2. Haz clic en **"Create Database"**
3. Selecciona **"Postgres"**
4. Configura:
   - **Database Name**: `dashboard-sostenibilidad-db`
   - **Region**: Selecciona la más cercana a tus usuarios
5. Haz clic en **"Create"**

### 3.2 Conectar la Base de Datos al Proyecto

1. Una vez creada la base de datos, haz clic en **"Connect Project"**
2. Selecciona tu proyecto `dashboard-sostenibilidad-inmobiliaria`
3. Vercel agregará automáticamente las variables de entorno necesarias:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - etc.

---

## 🔐 Paso 4: Configurar Variables de Entorno

### 4.1 Agregar Variables de Entorno Adicionales

1. Ve a tu proyecto en Vercel
2. Click en **"Settings"** → **"Environment Variables"**
3. Agrega las siguientes variables:

#### Variable 1: NEXTAUTH_SECRET
- **Key**: `NEXTAUTH_SECRET`
- **Value**: Genera un secreto aleatorio ejecutando en tu terminal:
  ```bash
  openssl rand -base64 32
  ```
  O usa: `tu-secreto-super-seguro-cambialo-en-produccion-12345`
- **Environment**: Production, Preview, Development (marca las 3)

#### Variable 2: NEXTAUTH_URL
- **Key**: `NEXTAUTH_URL`
- **Value**: `https://tu-proyecto.vercel.app` (reemplaza con tu URL de Vercel)
- **Environment**: Production

#### Variable 3: DATABASE_URL
- **Key**: `DATABASE_URL`
- **Value**: Ya debe estar configurada automáticamente por Vercel
- Si no está, cópiala de la pestaña Storage → tu base de datos → .env.local

### 4.2 Actualizar Prisma Schema

El archivo `prisma/schema.prisma` ya está configurado para usar PostgreSQL en producción:

```prisma
datasource db {
  provider = "postgresql"  // Cambiado de sqlite a postgresql
  url      = env("DATABASE_URL")
}
```

**Importante**: Antes de desplegar, asegúrate de actualizar el schema:

```bash
# En tu computadora, actualiza el schema
# Cambia en prisma/schema.prisma:
# provider = "sqlite"  →  provider = "postgresql"
```

Luego haz commit y push:

```bash
git add prisma/schema.prisma
git commit -m "Update database provider to PostgreSQL"
git push
```

---

## 🎬 Paso 5: Desplegar

### 5.1 Iniciar Despliegue

1. En Vercel, haz clic en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. ¡Tu aplicación estará en vivo!

### 5.2 Ejecutar Migraciones de Base de Datos

Después del primer despliegue, necesitas crear las tablas en la base de datos:

**Opción A: Desde tu computadora (recomendado)**

1. Copia la `DATABASE_URL` de Vercel (Settings → Environment Variables)
2. Crea un archivo `.env.local` en tu proyecto local:
   ```
   DATABASE_URL="postgresql://..."
   ```
3. Ejecuta las migraciones:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

**Opción B: Desde Vercel CLI**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link al proyecto
vercel link

# Ejecutar migraciones
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

---

## 🎉 Paso 6: ¡Listo!

Tu dashboard ya está en vivo en: `https://tu-proyecto.vercel.app`

### Credenciales Demo

**Email**: `demo@smartrem.solutions`  
**Contraseña**: `demo123`

### Probar el Sistema

1. **Visita tu URL de Vercel**
2. **Serás redirigido al login** (porque no estás autenticado)
3. **Regístrate** con tu email o usa las credenciales demo
4. **Accede al dashboard** completo

---

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel desplegará automáticamente los cambios.

---

## 🛠️ Solución de Problemas

### Error: "Database connection failed"

**Solución**:
1. Verifica que la variable `DATABASE_URL` esté configurada en Vercel
2. Asegúrate de haber ejecutado `npx prisma db push`
3. Revisa los logs en Vercel → tu proyecto → Deployments → click en el deployment → Logs

### Error: "NEXTAUTH_SECRET is not set"

**Solución**:
1. Ve a Settings → Environment Variables
2. Agrega `NEXTAUTH_SECRET` con un valor aleatorio
3. Redespliega el proyecto

### Error: "Prisma Client not generated"

**Solución**:
1. Asegúrate de que `prisma generate` se ejecute en el build
2. Verifica que `postinstall` esté en `package.json`:
   ```json
   "scripts": {
     "postinstall": "prisma generate"
   }
   ```

### No puedo hacer login

**Solución**:
1. Verifica que hayas ejecutado el seed: `npx prisma db seed`
2. Revisa los logs de Vercel para ver errores específicos
3. Intenta registrar un nuevo usuario

---

## 📞 Soporte

Si tienes problemas:

1. **Revisa los logs** en Vercel → Deployments → tu deployment → Logs
2. **Verifica las variables de entorno** en Settings → Environment Variables
3. **Consulta la documentación**:
   - [Vercel Docs](https://vercel.com/docs)
   - [Next.js Docs](https://nextjs.org/docs)
   - [Prisma Docs](https://www.prisma.io/docs)
   - [NextAuth.js Docs](https://next-auth.js.org)

---

## 🎁 Bonus: Dominio Personalizado

### Configurar tu propio dominio

1. Ve a tu proyecto en Vercel → Settings → Domains
2. Haz clic en **"Add"**
3. Ingresa tu dominio (ej: `dashboard.tuempresa.com`)
4. Sigue las instrucciones para configurar los DNS
5. Actualiza `NEXTAUTH_URL` con tu nuevo dominio

---

## ✅ Checklist Final

Antes de compartir tu dashboard:

- [ ] Base de datos PostgreSQL creada y conectada
- [ ] Variables de entorno configuradas (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `DATABASE_URL`)
- [ ] Migraciones ejecutadas (`npx prisma db push`)
- [ ] Datos iniciales cargados (`npx prisma db seed`)
- [ ] Login funciona con credenciales demo
- [ ] Registro de nuevos usuarios funciona
- [ ] Dashboard muestra datos correctamente
- [ ] Logout funciona correctamente
- [ ] URL personalizada configurada (opcional)

---

¡Felicidades! Tu Dashboard de Sostenibilidad Inmobiliaria está en producción y listo para usar. 🎉


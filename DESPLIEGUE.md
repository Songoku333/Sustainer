# Guía de Despliegue - Dashboard de Sostenibilidad Inmobiliaria

## 📋 Opciones de Despliegue

Este dashboard es una aplicación Next.js completa con base de datos que requiere un servidor para funcionar. **No puede desplegarse en GitHub Pages** ya que GitHub Pages solo soporta sitios estáticos sin backend.

### Opciones Recomendadas

#### 1. Vercel (Recomendado) ⭐

**Ventajas:**
- Optimizado para Next.js
- Despliegue automático desde Git
- Base de datos PostgreSQL incluida
- SSL gratuito
- CDN global
- Serverless functions
- Plan gratuito generoso

**Pasos para desplegar:**

1. Crear cuenta en [Vercel](https://vercel.com)

2. Instalar Vercel CLI:
```bash
npm install -g vercel
```

3. Desde el directorio del proyecto:
```bash
cd /home/ubuntu/dashboard-sostenibilidad-web
vercel
```

4. Seguir las instrucciones del CLI:
   - Vincular con tu cuenta de Vercel
   - Configurar el proyecto
   - Seleccionar configuración de Next.js

5. Configurar base de datos:
   - En el dashboard de Vercel, ir a Storage
   - Crear una base de datos PostgreSQL
   - Copiar la URL de conexión
   - Agregar como variable de entorno `DATABASE_URL`

6. Ejecutar migraciones:
```bash
npx prisma db push
npx ts-node prisma/seed.ts
```

7. Desplegar:
```bash
vercel --prod
```

#### 2. Railway

**Ventajas:**
- Incluye base de datos PostgreSQL automáticamente
- Despliegue desde Git
- Variables de entorno gestionadas
- Plan gratuito disponible

**Pasos para desplegar:**

1. Crear cuenta en [Railway](https://railway.app)

2. Crear nuevo proyecto desde GitHub

3. Railway detectará automáticamente Next.js

4. Agregar servicio de PostgreSQL:
   - Click en "New Service"
   - Seleccionar "PostgreSQL"
   - Railway configurará automáticamente `DATABASE_URL`

5. Configurar build command:
```bash
npx prisma generate && npx prisma db push && npm run build
```

6. Configurar start command:
```bash
npm start
```

7. Desplegar automáticamente al hacer push a Git

#### 3. Netlify

**Ventajas:**
- Interfaz intuitiva
- Despliegue continuo
- Funciones serverless

**Pasos para desplegar:**

1. Crear cuenta en [Netlify](https://netlify.com)

2. Conectar repositorio de GitHub

3. Configurar build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

4. Para la base de datos, usar servicio externo como:
   - Supabase (PostgreSQL)
   - PlanetScale (MySQL)
   - MongoDB Atlas

5. Configurar variables de entorno con la URL de la base de datos

## 🗄️ Configuración de Base de Datos

### Opción 1: PostgreSQL (Producción)

1. Actualizar `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Configurar variable de entorno:
```
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"
```

3. Ejecutar migraciones:
```bash
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

### Opción 2: SQLite (Desarrollo)

Ya configurado por defecto. Solo para desarrollo local.

## 🔐 Variables de Entorno

Crear archivo `.env` en el directorio raíz:

```env
# Base de datos
DATABASE_URL="postgresql://..."

# Next.js
NEXT_PUBLIC_API_URL="https://tu-dominio.com"

# Opcional: Autenticación
NEXTAUTH_URL="https://tu-dominio.com"
NEXTAUTH_SECRET="tu-secreto-aleatorio"
```

## 📦 Comandos de Despliegue

### Desarrollo Local
```bash
npm run dev
```

### Construcción para Producción
```bash
npm run build
npm start
```

### Migraciones de Base de Datos
```bash
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

### Verificar Build
```bash
npm run build
```

## 🌐 Dominios Personalizados

### En Vercel:
1. Ir a Project Settings > Domains
2. Agregar dominio personalizado
3. Configurar DNS según instrucciones

### En Railway:
1. Ir a Settings > Networking
2. Agregar Custom Domain
3. Configurar CNAME en tu proveedor de DNS

## 🔄 Actualización de Datos

Para actualizar los datos de la propiedad de ejemplo:

1. Editar `prisma/seed.ts`
2. Ejecutar:
```bash
npx prisma db push --force-reset
npx ts-node prisma/seed.ts
```

## 📊 Monitoreo

### Logs en Vercel:
- Dashboard > Logs
- Ver logs en tiempo real
- Filtrar por tipo de log

### Logs en Railway:
- Dashboard > Deployments > View Logs
- Logs en tiempo real
- Métricas de rendimiento

## 🐛 Troubleshooting

### Error: Prisma Client not generated
```bash
npx prisma generate
```

### Error: Database connection failed
- Verificar `DATABASE_URL` en variables de entorno
- Verificar que la base de datos esté accesible
- Verificar credenciales

### Error: Build failed
```bash
npm run build
# Revisar errores en la consola
```

## 📝 Notas Importantes

1. **GitHub Pages NO es compatible** con este proyecto ya que requiere:
   - Backend con Node.js
   - Base de datos
   - API Routes de Next.js
   - Procesamiento de archivos en servidor

2. **Para una versión estática** (sin backend):
   - Eliminar API routes
   - Usar datos estáticos en JSON
   - Eliminar funcionalidad de carga de archivos
   - Usar `next export` para generar sitio estático

3. **Seguridad:**
   - Nunca commitear archivos `.env`
   - Usar variables de entorno para secretos
   - Configurar CORS apropiadamente
   - Validar inputs de usuario

## 🚀 Recomendación Final

Para este proyecto específico, **recomendamos Vercel** por:
- Optimización nativa para Next.js
- Base de datos PostgreSQL incluida
- Despliegue automático
- Plan gratuito generoso
- Excelente rendimiento global

## 📞 Soporte

Para problemas de despliegue:
1. Revisar logs de la plataforma
2. Verificar variables de entorno
3. Confirmar que la base de datos está accesible
4. Revisar documentación de la plataforma elegida


# 🏢 Dashboard de Sostenibilidad Inmobiliaria

Dashboard profesional para análisis de sostenibilidad en inversiones inmobiliarias, con seguimiento de certificaciones energéticas, riesgos climáticos, y rendimiento real vs. teórico.

![Dashboard Preview](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-6.0-2d3748?style=for-the-badge&logo=prisma)

## ✨ Características Principales

### 🔐 Autenticación Completa
- **Sistema de registro** con validación de email único
- **Login seguro** con NextAuth.js
- **Gestión de sesiones** persistentes
- **Protección de rutas** en servidor
- **Hash de contraseñas** con bcrypt

### 📊 Dashboard Interactivo

#### 7 Pestañas Principales:

1. **Resumen Ejecutivo**
   - Métricas clave de sostenibilidad
   - Consumo energético y emisiones CO₂
   - ROI y ahorro anual
   - Temperatura implícita (alineación climática)

2. **Certificación Energética**
   - Comparativa E → A
   - Reducción del 82.7% en consumo
   - Reducción del 83.7% en emisiones
   - Visualizaciones impactantes

3. **Mejoras Implementadas**
   - Aerotermia
   - Aislamiento térmico
   - Energía solar fotovoltaica
   - Inversión y ahorro por mejora

4. **Beneficios Financieros**
   - Análisis económico completo
   - Proyecciones a 10 años
   - Valorización del inmueble
   - Gráficos de ahorros acumulados

5. **Certificados CAE**
   - Certificados de Ahorro Energético
   - Proyección de ingresos
   - Valor total: 21,450€ a 10 años

6. **Riesgos Climáticos MSCI**
   - Temperatura implícita: 1.9°C
   - Riesgos físicos (calor, agua)
   - Riesgos de transición
   - Trayectoria de carbono

7. **Performance Real**
   - Análisis de consumo real vs. teórico
   - Carga de archivos (CSV, PDF, Excel)
   - Distribución por períodos tarifarios
   - Análisis estacional

### 📈 Visualizaciones Avanzadas
- Gráficos de barras comparativos
- Gráficos de líneas temporales
- Gráficos circulares (pie charts)
- Gráficos de radar para objetivos
- Termómetros visuales
- Gráficos de área compuestos

### 🗄️ Base de Datos Robusta
- **PostgreSQL** en producción
- **Prisma ORM** para type-safety
- **7 modelos de datos**:
  - Users (usuarios)
  - Properties (propiedades)
  - EnergyCertification (certificaciones)
  - Improvements (mejoras)
  - EnergyConsumptionReal (consumo real)
  - ClimateRisk (riesgos climáticos)
  - CaeCertificate (certificados CAE)
  - UploadedFile (archivos cargados)

## 🚀 Tecnologías Utilizadas

### Frontend
- **Next.js 15.5** - Framework React con SSR
- **React 19** - Biblioteca UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Visualizaciones de datos
- **Lucide React** - Iconos

### Backend
- **Next.js API Routes** - Backend serverless
- **NextAuth.js** - Autenticación
- **Prisma** - ORM
- **PostgreSQL** - Base de datos
- **bcryptjs** - Hash de contraseñas

### DevOps
- **Vercel** - Hosting y deployment
- **Git** - Control de versiones
- **ESLint** - Linting
- **PostCSS** - CSS processing

## 📦 Instalación Local

### Prerrequisitos
- Node.js 18+ 
- npm o pnpm
- PostgreSQL (o usar SQLite para desarrollo)

### Pasos

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/dashboard-sostenibilidad-inmobiliaria.git
cd dashboard-sostenibilidad-inmobiliaria
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
```

Edita `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dashboard_db"
NEXTAUTH_SECRET="tu-secreto-super-seguro-cambialo"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Configurar base de datos**
```bash
# Generar cliente de Prisma
npx prisma generate

# Crear tablas
npx prisma db push

# Poblar con datos de ejemplo
npx prisma db seed
```

5. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

6. **Abrir en navegador**
```
http://localhost:3000
```

## 🔑 Credenciales Demo

**Email**: `demo@smartrem.solutions`  
**Contraseña**: `demo123`

## 📁 Estructura del Proyecto

```
dashboard-sostenibilidad-web/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/    # NextAuth endpoints
│   │   │   ├── properties/            # API de propiedades
│   │   │   ├── register/              # API de registro
│   │   │   └── upload/                # API de carga de archivos
│   │   ├── login/                     # Página de login
│   │   ├── register/                  # Página de registro
│   │   ├── page.tsx                   # Dashboard principal
│   │   └── layout.tsx                 # Layout principal
│   ├── components/
│   │   ├── DashboardComplete.tsx      # Componente principal
│   │   └── FileUpload.tsx             # Componente de carga
│   ├── auth.ts                        # Configuración NextAuth
│   └── generated/prisma/              # Cliente Prisma generado
├── prisma/
│   ├── schema.prisma                  # Esquema de base de datos
│   └── seed.ts                        # Datos iniciales
├── public/                            # Archivos estáticos
├── .env.example                       # Ejemplo de variables de entorno
├── package.json                       # Dependencias
├── tailwind.config.ts                 # Configuración Tailwind
├── tsconfig.json                      # Configuración TypeScript
└── README.md                          # Este archivo
```

## 🌐 Despliegue en Producción

Consulta la guía completa en: **GUIA_DESPLIEGUE_VERCEL_CON_AUTH.md**

### Resumen rápido:

1. **Subir a GitHub**
2. **Crear proyecto en Vercel**
3. **Crear base de datos PostgreSQL en Vercel**
4. **Configurar variables de entorno**
5. **Desplegar**
6. **Ejecutar migraciones**

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm start            # Iniciar servidor de producción

# Base de datos
npx prisma generate  # Generar cliente Prisma
npx prisma db push   # Aplicar cambios al schema
npx prisma db seed   # Poblar con datos de ejemplo
npx prisma studio    # Abrir interfaz visual de BD

# Linting
npm run lint         # Ejecutar ESLint
```

## 📊 Datos de Ejemplo

El proyecto incluye datos de una propiedad real:

**Propiedad**: SAN VIZCONDE DE LOS ASILOS 4 1C, Madrid
- **Superficie**: 58 m²
- **Certificación inicial**: E (249 kWh/m² año)
- **Certificación mejorada**: A (43 kWh/m² año)
- **Inversión**: 15,000€
- **Ahorro anual**: 1,800€
- **10 meses** de datos reales de consumo

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👥 Autores

**Smart REM Solutions**
- Website: [smartrem.solutions](https://smartrem.solutions)
- Email: info@smartrem.solutions

## 🙏 Agradecimientos

- Next.js team por el excelente framework
- Vercel por el hosting gratuito
- Prisma por el ORM type-safe
- NextAuth.js por la autenticación
- Recharts por las visualizaciones

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: support@smartrem.solutions
- 📖 Documentación: Ver archivos .md en el proyecto
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/dashboard-sostenibilidad-inmobiliaria/issues)

---

**Hecho con ❤️ por Smart REM Solutions**

© 2025 Smart REM Solutions. Todos los derechos reservados.


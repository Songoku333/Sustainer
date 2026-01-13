import { PrismaClient } from '../src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear o actualizar usuario demo
  const hashedPassword = await bcrypt.hash('demo123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@smartrem.solutions' },
    update: {
      password: hashedPassword,
    },
    create: {
      email: 'demo@smartrem.solutions',
      name: 'Usuario Demo',
      password: hashedPassword,
      company: 'Smart REM Solutions',
      role: 'user',
    },
  });

  console.log(`✅ Usuario creado: ${user.email}`);

  // Crear propiedad de ejemplo
  const property = await prisma.property.create({
    data: {
      userId: user.id,
      name: 'SAN VIZCONDE DE LOS ASILOS 4 1C',
      address: 'San Vizconde de los Asilos 41C, Madrid, España',
      surfaceArea: 58,
      propertyType: 'Residencial',
    },
  });

  console.log(`✅ Propiedad creada: ${property.name}`);

  // Crear certificación inicial (E)
  await prisma.energyCertification.create({
    data: {
      propertyId: property.id,
      certificationType: 'initial',
      rating: 'E',
      consumptionKwhM2: 249,
      emissionsKgCo2M2: 43,
      certificationDate: new Date('2024-01-01'),
    },
  });

  // Crear certificación mejorada (A)
  await prisma.energyCertification.create({
    data: {
      propertyId: property.id,
      certificationType: 'improved',
      rating: 'A',
      consumptionKwhM2: 43,
      emissionsKgCo2M2: 7,
      certificationDate: new Date('2024-06-01'),
    },
  });

  console.log('✅ Certificaciones energéticas creadas');

  // Crear mejoras implementadas
  const improvements = [
    {
      improvementType: 'Aerotermia',
      description: 'Sistema de aerotermia para calefacción y ACS',
      investmentAmount: 8000,
      annualSavings: 960,
      implementationDate: new Date('2024-03-01'),
    },
    {
      improvementType: 'Aislamiento Térmico',
      description: 'Mejora del aislamiento en fachadas y cubierta',
      investmentAmount: 5000,
      annualSavings: 600,
      implementationDate: new Date('2024-04-01'),
    },
    {
      improvementType: 'Energía Solar Fotovoltaica',
      description: 'Instalación de paneles solares fotovoltaicos',
      investmentAmount: 2000,
      annualSavings: 240,
      implementationDate: new Date('2024-05-01'),
    },
  ];

  for (const improvement of improvements) {
    await prisma.improvement.create({
      data: {
        propertyId: property.id,
        ...improvement,
      },
    });
  }

  console.log('✅ Mejoras implementadas creadas');

  // Crear datos de consumo real (basados en los archivos CSV proporcionados)
  const consumptionData = [
    { month: '2025-01-01', consumption: 24, cost: 17, period: 'valle' },
    { month: '2025-02-01', consumption: 48, cost: 31, period: 'llano' },
    { month: '2025-03-01', consumption: 396, cost: 205, period: 'punta' },
    { month: '2025-04-01', consumption: 29, cost: 14, period: 'valle' },
    { month: '2025-05-01', consumption: 120, cost: 46, period: 'llano' },
    { month: '2025-06-01', consumption: 152, cost: 59, period: 'punta' },
    { month: '2025-07-01', consumption: 819, cost: 519, period: 'punta' },
    { month: '2025-08-01', consumption: 519, cost: 220, period: 'punta' },
    { month: '2025-09-01', consumption: 249, cost: 72, period: 'llano' },
    { month: '2025-10-01', consumption: 30, cost: 29, period: 'valle' },
  ];

  for (const data of consumptionData) {
    const startDate = new Date(data.month);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    await prisma.energyConsumptionReal.create({
      data: {
        propertyId: property.id,
        periodStart: startDate,
        periodEnd: endDate,
        consumptionKwh: data.consumption,
        costEuros: data.cost,
        tariffPeriod: data.period,
        sourceFile: 'consumos_sips_2025.csv',
      },
    });
  }

  console.log('✅ Datos de consumo real creados');

  // Crear riesgos climáticos MSCI
  await prisma.climateRisk.create({
    data: {
      propertyId: property.id,
      impliedTemperature: '1.9°C',
      alignmentScenario: 'Alineado con 2°C',
      physicalRiskHeat: 'Medio',
      physicalRiskWater: 'Bajo',
      transitionRiskCurrent: 43,
      transitionRisk2030: 25,
      transitionRisk2050: 10,
    },
  });

  console.log('✅ Riesgos climáticos creados');

  // Crear certificado CAE
  await prisma.caeCertificate.create({
    data: {
      propertyId: property.id,
      annualSavingsKwh: 11956,
      certificateValueEuros: 2145,
      projectionYears: 10,
      totalValueEuros: 21450,
    },
  });

  console.log('✅ Certificado CAE creado');

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


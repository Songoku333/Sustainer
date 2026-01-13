-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "surfaceArea" INTEGER NOT NULL,
    "propertyType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyCertification" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "certificationType" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "consumptionKwhM2" INTEGER NOT NULL,
    "emissionsKgCo2M2" INTEGER NOT NULL,
    "certificationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnergyCertification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Improvement" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "improvementType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "investmentAmount" INTEGER NOT NULL,
    "annualSavings" INTEGER NOT NULL,
    "implementationDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Improvement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnergyConsumptionReal" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "consumptionKwh" INTEGER NOT NULL,
    "costEuros" INTEGER NOT NULL,
    "tariffPeriod" TEXT NOT NULL,
    "sourceFile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EnergyConsumptionReal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimateRisk" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "impliedTemperature" TEXT NOT NULL,
    "alignmentScenario" TEXT NOT NULL,
    "physicalRiskHeat" TEXT NOT NULL,
    "physicalRiskWater" TEXT NOT NULL,
    "transitionRiskCurrent" INTEGER NOT NULL,
    "transitionRisk2030" INTEGER NOT NULL,
    "transitionRisk2050" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClimateRisk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaeCertificate" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "annualSavingsKwh" INTEGER NOT NULL,
    "certificateValueEuros" INTEGER NOT NULL,
    "projectionYears" INTEGER NOT NULL,
    "totalValueEuros" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaeCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" SERIAL NOT NULL,
    "propertyId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "processingStatus" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ClimateRisk_propertyId_key" ON "ClimateRisk"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "CaeCertificate_propertyId_key" ON "CaeCertificate"("propertyId");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyCertification" ADD CONSTRAINT "EnergyCertification_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Improvement" ADD CONSTRAINT "Improvement_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnergyConsumptionReal" ADD CONSTRAINT "EnergyConsumptionReal_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClimateRisk" ADD CONSTRAINT "ClimateRisk_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaeCertificate" ADD CONSTRAINT "CaeCertificate_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

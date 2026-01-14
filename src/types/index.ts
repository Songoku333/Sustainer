import {
    Role as _Role,
    CertificationType as _CertificationType,
    Rating as _Rating,
    ProcessingStatus as _ProcessingStatus
} from "@/generated/prisma";

export { Role, CertificationType, Rating, ProcessingStatus } from "@/generated/prisma";

export interface PropertyData {
    id: number;
    userId: number;
    name: string;
    address: string;
    surfaceArea: number;
    propertyType: string;
    createdAt: Date;
    updatedAt: Date;
    certifications: EnergyCertification[];
    improvements: Improvement[];
    consumptionRecords: EnergyConsumptionReal[];
    climateRisk: ClimateRisk | null;
    caeCertificate: CaeCertificate | null;
    uploadedFiles: UploadedFile[];
}

export interface EnergyCertification {
    id: number;
    propertyId: number;
    certificationType: _CertificationType;
    rating: _Rating;
    consumptionKwhM2: number;
    emissionsKgCo2M2: number;
    certificationDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Improvement {
    id: number;
    propertyId: number;
    improvementType: string;
    description: string;
    investmentAmount: number;
    annualSavings: number;
    implementationDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface EnergyConsumptionReal {
    id: number;
    propertyId: number;
    periodStart: Date;
    periodEnd: Date;
    consumptionKwh: number;
    costEuros: number;
    tariffPeriod: string;
    sourceFile: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ClimateRisk {
    id: number;
    propertyId: number;
    impliedTemperature: string;
    alignmentScenario: string;
    physicalRiskHeat: string;
    physicalRiskWater: string;
    transitionRiskCurrent: number;
    transitionRisk2030: number;
    transitionRisk2050: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CaeCertificate {
    id: number;
    propertyId: number;
    annualSavingsKwh: number;
    certificateValueEuros: number;
    projectionYears: number;
    totalValueEuros: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface UploadedFile {
    id: number;
    propertyId: number;
    fileName: string;
    fileType: string;
    fileSize: number;
    fileUrl: string;
    processingStatus: _ProcessingStatus;
    createdAt: Date;
    updatedAt: Date;
}

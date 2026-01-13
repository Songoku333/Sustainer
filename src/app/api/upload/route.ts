import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const propertyId = formData.get('propertyId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Save file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const filepath = join(process.cwd(), 'uploads', filename);
    
    await writeFile(filepath, buffer);

    // Create file record
    const uploadedFile = await prisma.uploadedFile.create({
      data: {
        fileName: file.name,
        fileUrl: filepath,
        fileType: file.type,
        fileSize: file.size,
        processingStatus: 'pending',
        propertyId: parseInt(propertyId),
      },
    });

    // Process file based on type
    let processedData = null;
    
    if (file.name.endsWith('.csv')) {
      processedData = await processCSVFile(buffer.toString('utf-8'), parseInt(propertyId));
    } else if (file.name.endsWith('.pdf')) {
      // TODO: Implement PDF processing
      processedData = { message: 'PDF processing not yet implemented' };
    } else if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      // TODO: Implement Excel processing
      processedData = { message: 'Excel processing not yet implemented' };
    }

    return NextResponse.json({
      success: true,
      file: uploadedFile,
      processedData,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}

async function processCSVFile(content: string, propertyId: number) {
  const lines = content.split('\n');
  const headers = lines[0].split(',');
  
  let totalConsumption = 0;
  let recordCount = 0;
  const monthlyData: Record<string, number> = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(',');
    
    // Assuming CSV format: date, consumption, cost
    // Adjust based on actual CSV structure
    const date = values[0];
    const consumption = parseFloat(values[1]);
    
    if (!isNaN(consumption)) {
      totalConsumption += consumption;
      recordCount++;

      // Group by month
      const month = date.substring(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = 0;
      }
      monthlyData[month] += consumption;
    }
  }

  // Create consumption records
  for (const [month, consumption] of Object.entries(monthlyData)) {
    await prisma.energyConsumptionReal.create({
      data: {
        propertyId,
        periodStart: new Date(month + '-01'),
        periodEnd: new Date(month + '-28'),
        consumptionKwh: Math.round(consumption),
        costEuros: Math.round(consumption * 0.15),
        tariffPeriod: 'mixed',
        sourceFile: 'uploaded',
      },
    });
  }

  return {
    totalConsumption,
    recordCount,
    monthlyData,
    averageDaily: totalConsumption / recordCount,
  };
}


import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      include: {
        certifications: true,
        improvements: true,
        consumptionRecords: true,
        climateRisk: true,
        caeCertificate: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const property = await prisma.property.create({
      data: {
        userId: body.userId || 1,
        name: body.name,
        address: body.address,
        surfaceArea: body.surfaceArea || 0,
        propertyType: body.propertyType || 'residential',
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}


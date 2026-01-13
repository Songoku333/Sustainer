import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const propertyId = parseInt(id);

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
        userId: parseInt(session.user.id) // Ensure we only fetch properties belonging to the user
      },
      include: {
        certifications: true,
        improvements: true,
        consumptionRecords: {
          orderBy: { periodStart: 'asc' },
        },
        climateRisk: true,
        caeCertificate: true,
        uploadedFiles: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: 'Propiedad no encontrada o no autorizada' },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('Error al obtener propiedad:', error);
    return NextResponse.json(
      { error: 'Error al obtener datos de la propiedad' },
      { status: 500 }
    );
  }
}


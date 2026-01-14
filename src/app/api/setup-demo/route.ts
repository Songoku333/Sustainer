
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
    try {
        console.log('🔄 Iniciando setup de usuario demo via API...');

        const hashedPassword = await bcrypt.hash('demo123', 10);

        const user = await prisma.user.upsert({
            where: { email: 'demo@smartrem.solutions' },
            update: {
                password: hashedPassword,
                name: 'Usuario Demo (Reset)',
                company: 'Smart REM Solutions',
                role: 'user',
            },
            create: {
                email: 'demo@smartrem.solutions',
                name: 'Usuario Demo',
                password: hashedPassword,
                company: 'Smart REM Solutions',
                role: 'user',
            },
        });

        // Asegurarse de que existe la propiedad
        let property = await prisma.property.findFirst({
            where: { userId: user.id }
        });

        if (!property) {
            property = await prisma.property.create({
                data: {
                    userId: user.id,
                    name: 'SAN VIZCONDE DE LOS ASILOS 4 1C',
                    address: 'San Vizconde de los Asilos 41C, Madrid, España',
                    surfaceArea: 58,
                    propertyType: 'Residencial',
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Usuario demo reseteado correctamente',
            user: { email: user.email, id: user.id }
        });
    } catch (error: any) {
        console.error('❌ Error en setup-demo:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

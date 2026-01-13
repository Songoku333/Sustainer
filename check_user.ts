
import { PrismaClient } from './src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🔍 Verificando usuario demo...');

    try {
        const user = await prisma.user.findUnique({
            where: { email: 'demo@smartrem.solutions' },
        });

        if (!user) {
            console.log('❌ El usuario demo NO existe en la base de datos.');
            console.log('💡 Sugerencia: Ejecuta "npx ts-node prisma/seed.ts"');
        } else {
            console.log('✅ El usuario demo existe.');
            console.log('   ID:', user.id);
            console.log('   Email:', user.email);
            console.log('   Hash:', user.password.substring(0, 10) + '...');

            const isMatch = await bcrypt.compare('demo123', user.password);
            if (isMatch) {
                console.log('✅ La contraseña "demo123" es correcta.');
            } else {
                console.log('❌ La contraseña NO coincide.');
            }
        }
    } catch (error) {
        console.error('❌ Error al conectar con la BD:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const email = 'demo@smartrem.solutions';

        // 1. Check DB Connection and User
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({
                status: 'error',
                message: 'User not found in database',
                step: 'findUnique',
                email
            });
        }

        // 2. Check Password
        const isMatch = await bcrypt.compare('demo123', user.password);

        return NextResponse.json({
            status: 'success',
            message: 'User found verification complete',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                passwordHashPrefix: user.password.substring(0, 10) + '...',
            },
            passwordCheck: {
                matches: isMatch,
                testPassword: 'demo123'
            },
            env: {
                nodeEnv: process.env.NODE_ENV,
                hasDbUrl: !!process.env.DATABASE_URL
            }
        });

    } catch (error: any) {
        return NextResponse.json({
            status: 'error',
            message: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}

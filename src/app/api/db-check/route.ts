import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  try {
    // 1. Measure database connection & latency
    const dbVersionResult: any = await prisma.$queryRaw`SELECT version();`;
    const latencyMs = Date.now() - startTime;

    // 2. Fetch live record counts across tables
    const [companiesCount, usersCount, projectsCount, towersCount, unitsCount, leadsCount, invoicesCount] =
      await Promise.all([
        prisma.company.count(),
        prisma.user.count(),
        prisma.project.count(),
        prisma.tower.count(),
        prisma.unit.count(),
        prisma.lead.count(),
        prisma.saaSInvoice.count(),
      ]);

    // 3. Fetch sample developer tenants
    const companies = await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        code: true,
        plan: true,
        status: true,
        city: true,
        registrationNumber: true,
        reraNumber: true,
        gstin: true,
        monthlyFee: true,
      },
    });

    // 4. Fetch super admin user status
    const superAdmin = await prisma.user.findFirst({
      where: { role: 'SUPER_ADMIN' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
      },
    });

    return NextResponse.json({
      success: true,
      status: 'Connected & Fully Operational',
      provider: 'Neon Serverless PostgreSQL (AWS us-east-1)',
      database: 'neondb',
      endpoint: 'ep-royal-shape-bcncpwcb-pooler.c-16.us-east-1.aws.neon.tech',
      latencyMs: `${latencyMs}ms`,
      postgresVersion: dbVersionResult[0]?.version || 'PostgreSQL 16',
      counts: {
        companies: companiesCount,
        users: usersCount,
        projects: projectsCount,
        towers: towersCount,
        units: unitsCount,
        leads: leadsCount,
        saasInvoices: invoicesCount,
      },
      superAdminConfigured: superAdmin,
      registeredCompanies: companies,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        status: 'Connection Error',
        message: error.message,
      },
      { status: 500 }
    );
  }
}


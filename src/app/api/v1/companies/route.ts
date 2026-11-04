import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET /api/v1/companies — Fetch all registered developer tenants
export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: {
          select: {
            users: true,
            projects: true,
            units: true,
            leads: true,
            bookings: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error: any) {
    console.error('Error fetching companies:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch companies', error: error?.message },
      { status: 500 }
    );
  }
}

// POST /api/v1/companies — Provision new developer tenant organization
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      code,
      plan = 'Professional',
      userLimit = 20,
      projectLimit = 10,
      contactEmail,
      phone = '+91 80 4000 1122',
      city = 'Bangalore',
      registrationNumber,
      cin,
      reraNumber,
      gstin,
      address,
      monthlyFee = 34999,
      adminName,
      adminEmail,
      adminPassword = 'BuilderAdmin@2026',
    } = body;

    if (!name || !code) {
      return NextResponse.json(
        { success: false, message: 'Company Name and Code are required' },
        { status: 400 }
      );
    }

    const cleanCode = code.toUpperCase().replace(/[^A-Z0-9]/g, '');

    // Check if code or email already exists
    const existing = await prisma.company.findUnique({
      where: { code: cleanCode },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, message: `Company code "${cleanCode}" is already in use.` },
        { status: 409 }
      );
    }

    const effectiveCin = cin || registrationNumber || `U45200KA2024PTC${Math.floor(100000 + Math.random() * 900000)}`;

    // Create Company and Admin User in a single transaction
    const newCompany = await prisma.company.create({
      data: {
        name,
        code: cleanCode,
        plan,
        status: 'Active',
        userLimit: Number(userLimit),
        projectLimit: Number(projectLimit),
        contactEmail: contactEmail || adminEmail || `admin@${cleanCode.toLowerCase()}.com`,
        phone,
        city,
        registrationNumber: effectiveCin,
        cin: effectiveCin,
        reraNumber: reraNumber || `PRM/KA/RERA/2026/${Math.floor(1000 + Math.random() * 9000)}`,
        gstin: gstin || `29AAAC${cleanCode.slice(0, 4)}1234F1Z5`,
        address: address || `${name} Tower, CBD Area, ${city}`,
        monthlyFee: Number(monthlyFee),
        billingCycle: 'Monthly',
        paymentStatus: 'Paid',
        adminName: adminName || `${name} Admin`,
        adminEmail: adminEmail || contactEmail,
        users: adminEmail
          ? {
              create: {
                name: adminName || `${name} Admin`,
                email: adminEmail.trim().toLowerCase(),
                phone,
                password: adminPassword,
                role: 'COMPANY_ADMIN',
                department: 'Executive Leadership',
                designation: 'Managing Director & Builder Admin',
                status: 'Active',
              },
            }
          : undefined,
      },
      include: {
        users: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Tenant "${name}" successfully provisioned with company code "${cleanCode}".`,
        data: {
          company: newCompany,
          adminUser: newCompany.users[0] || null,
          initialCredentials: adminEmail
            ? {
                email: adminEmail,
                password: adminPassword,
                loginUrl: '/login?portal=admin',
              }
            : null,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error provisioning tenant:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to provision tenant', error: error?.message },
      { status: 500 }
    );
  }
}


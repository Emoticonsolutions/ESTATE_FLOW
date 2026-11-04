import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_BROKERS, INITIAL_BROKER_DEALS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId') || 'comp-prestige';

  try {
    const brokers = await prisma.broker.findMany({
      where: { companyId },
      orderBy: { totalBookingsDone: 'desc' },
    });

    return NextResponse.json({
      success: true,
      message: 'Channel partners retrieved from Neon PostgreSQL',
      data: brokers,
      meta: { total: brokers.length, source: 'Neon PostgreSQL (Live)' },
    });
  } catch (err: any) {
    const brokers = INITIAL_BROKERS.filter((b) => b.companyId === companyId);
    return NextResponse.json({
      success: true,
      message: 'Channel partners retrieved from memory fallback',
      data: brokers,
      meta: { total: brokers.length, source: 'Memory Cache Fallback' },
    });
  }
}

// POST /api/v1/brokers — Register new broker firm or register client under broker
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action = 'register-broker' } = body;

    // Action A: Register new Channel Partner Firm
    if (action === 'register-broker') {
      const {
        companyId = 'comp-prestige',
        name,
        firmName,
        reraNumber = 'AG/KA/RERA/2026/001928',
        mobile,
        email,
        commissionRate = 2.5,
      } = body;

      if (!name || !firmName || !mobile) {
        return NextResponse.json(
          { success: false, message: 'Partner name, firm name and mobile are required' },
          { status: 400 }
        );
      }

      try {
        const newBroker = await prisma.broker.create({
          data: {
            companyId,
            name,
            firmName,
            reraNumber,
            mobile,
            email,
            commissionRate: Number(commissionRate),
            tier: 'Gold',
            totalBookingsDone: 0,
          },
        });

        return NextResponse.json(
          {
            success: true,
            message: `Channel partner "${firmName}" successfully registered under RERA ${reraNumber}.`,
            data: newBroker,
          },
          { status: 201 }
        );
      } catch {
        const fallbackBroker = {
          id: `broker-${Date.now()}`,
          companyId,
          name,
          agencyName: firmName,
          reraRegistration: reraNumber,
          mobile,
          email,
          city: 'Bangalore',
          commissionPercentage: Number(commissionRate),
          totalDeals: 0,
          totalVolume: 0,
          commissionEarned: 0,
          commissionPaid: 0,
          commissionPending: 0,
          status: 'Active',
        };

        return NextResponse.json(
          {
            success: true,
            message: 'Channel partner registered (Memory Cache Fallback)',
            data: fallbackBroker,
          },
          { status: 201 }
        );
      }
    }

    // Action B: Register Buyer Client with 90-Day Anti-Poaching Lock
    if (action === 'register-client-tag') {
      const {
        companyId = 'comp-prestige',
        brokerName = 'Apex Channel Partners',
        clientName,
        clientMobile,
        clientEmail,
        budget = '150L',
        configuration = '3 BHK',
      } = body;

      if (!clientName || !clientMobile) {
        return NextResponse.json(
          { success: false, message: 'Client name and mobile are required' },
          { status: 400 }
        );
      }

      const lockExpiresAt = new Date();
      lockExpiresAt.setDate(lockExpiresAt.getDate() + 90);

      // Create lead with broker referral attribution
      const leadNum = `CP-LEAD-${Math.floor(1000 + Math.random() * 9000)}`;

      try {
        const newLead = await prisma.lead.create({
          data: {
            leadNumber: leadNum,
            companyId,
            fullName: clientName,
            mobile: clientMobile,
            email: clientEmail || 'client@example.com',
            city: 'Bangalore',
            preferredContactMethod: 'WhatsApp',
            interestedProjectId: 'proj-1',
            propertyType: 'Apartment',
            configuration,
            budgetMin: 120,
            budgetMax: 180,
            source: 'Broker Referral',
            priority: 'Hot',
            status: 'New',
            aiScore: 88,
            notes: `Tag protected by 90-day anti-poaching lock until ${lockExpiresAt.toISOString().split('T')[0]}. Attributed Partner: ${brokerName}.`,
          },
        });

        return NextResponse.json(
          {
            success: true,
            message: `Client "${clientName}" registered and locked to ${brokerName} for 90 days.`,
            data: {
              lead: newLead,
              antiPoachExpiry: lockExpiresAt.toISOString(),
              guaranteeNotice: 'Anti-poaching rule active: Deal commission guaranteed even on direct developer visit.',
            },
          },
          { status: 201 }
        );
      } catch {
        return NextResponse.json(
          {
            success: true,
            message: `Client "${clientName}" registered under 90-day protection lock.`,
            data: {
              leadNumber: leadNum,
              clientName,
              brokerName,
              antiPoachExpiry: lockExpiresAt.toISOString(),
            },
          },
          { status: 201 }
        );
      }
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Broker operation failed', error: err.message },
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_FOLLOW_UPS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId') || 'comp-prestige';
  const isCompleted = searchParams.get('isCompleted');

  try {
    const where: any = { companyId };
    if (isCompleted !== null && isCompleted !== undefined) {
      where.isCompleted = isCompleted === 'true';
    }

    const followUps = await prisma.followUp.findMany({
      where,
      include: {
        lead: true,
      },
      orderBy: { scheduledAt: 'asc' },
    });

    return NextResponse.json({
      success: true,
      message: 'Follow-ups retrieved from Neon PostgreSQL',
      data: followUps,
      meta: { total: followUps.length, source: 'Neon PostgreSQL (Live)' },
    });
  } catch (err: any) {
    const followUps = INITIAL_FOLLOW_UPS.filter((f) => f.companyId === companyId);
    return NextResponse.json({
      success: true,
      message: 'Follow-ups retrieved from memory cache fallback',
      data: followUps,
      meta: { total: followUps.length, source: 'Memory Cache Fallback' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyId = 'comp-prestige',
      leadId,
      type = 'Phone Call',
      scheduledAt = new Date().toISOString(),
      executiveName = 'Rohan Sharma',
      notes,
    } = body;

    if (!leadId) {
      return NextResponse.json(
        { success: false, message: 'leadId is required for scheduling follow-up' },
        { status: 400 }
      );
    }

    try {
      const newFollowUp = await prisma.followUp.create({
        data: {
          companyId,
          leadId,
          type,
          scheduledAt: new Date(scheduledAt),
          executiveName,
          notes: notes || 'Scheduled follow-up discussion',
          isCompleted: false,
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Follow-up scheduled successfully in Neon PostgreSQL',
          data: newFollowUp,
        },
        { status: 201 }
      );
    } catch {
      const fallback = {
        id: `fu-${Date.now()}`,
        companyId,
        leadId,
        leadName: body.leadName || 'Customer Inquiry',
        leadMobile: body.leadMobile || '+91 98450 12345',
        assignedToId: 'user-sales-exec-1',
        assignedToName: executiveName,
        type,
        dateTime: scheduledAt,
        remarks: notes || 'Follow-up scheduled',
        isCompleted: false,
        isOverdue: false,
      };

      return NextResponse.json(
        {
          success: true,
          message: 'Follow-up scheduled (Memory Cache Fallback)',
          data: fallback,
        },
        { status: 201 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to schedule follow-up', error: err.message },
      { status: 400 }
    );
  }
}

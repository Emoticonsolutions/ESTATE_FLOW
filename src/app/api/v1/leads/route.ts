import { NextResponse } from 'next/server';
import { INITIAL_LEADS } from '@/lib/mockData';
import { Lead } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId') || 'comp-prestige';
  const status = searchParams.get('status');

  let leads = INITIAL_LEADS.filter((l) => l.companyId === companyId);
  if (status) {
    leads = leads.filter((l) => l.status === status);
  }

  return NextResponse.json({
    success: true,
    message: 'Leads fetched successfully',
    data: leads,
    meta: {
      total: leads.length,
      page: 1,
      limit: 20,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Section 9 & 10: Input validation
    if (!body.fullName || !body.mobile) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: {
            fullName: !body.fullName ? 'Customer full name is required' : undefined,
            mobile: !body.mobile ? 'Customer phone number is required' : undefined,
          },
        },
        { status: 400 }
      );
    }

    // Duplicate detection check
    const existing = INITIAL_LEADS.find(
      (l) => l.mobile.replace(/\s+/g, '') === body.mobile.replace(/\s+/g, '')
    );

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      leadNumber: `LEAD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      companyId: body.companyId || 'comp-prestige',
      fullName: body.fullName,
      mobile: body.mobile,
      email: body.email || 'customer@example.com',
      city: body.city || 'Bangalore',
      state: body.state || 'Karnataka',
      preferredContactMethod: body.preferredContactMethod || 'WhatsApp',
      interestedProjectId: body.interestedProjectId || 'proj-1',
      propertyType: body.propertyType || 'Apartment',
      configuration: body.configuration || '3 BHK',
      budgetMin: body.budgetMin || 120,
      budgetMax: body.budgetMax || 160,
      purpose: body.purpose || 'End-use',
      possessionPreference: body.possessionPreference || 'Within 6 Months',
      source: body.source || 'Meta (Facebook/IG)',
      priority: body.priority || 'Hot',
      assignedManagerId: 'user-sales-manager',
      assignedExecutiveId: 'user-sales-exec-1',
      status: 'New',
      aiScore: 82,
      notes: body.notes || 'Inbound lead captured via API endpoint.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: existing
          ? 'Lead created (Notice: potential duplicate mobile detected)'
          : 'Lead created successfully',
        data: newLead,
        duplicateWarning: existing ? true : false,
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload format', error: err.message },
      { status: 400 }
    );
  }
}


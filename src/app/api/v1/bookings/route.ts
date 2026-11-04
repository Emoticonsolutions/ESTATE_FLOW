import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_BOOKINGS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get('companyId') || 'comp-prestige';
  const status = searchParams.get('status');

  try {
    const where: any = { companyId };
    if (status) where.status = status;

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        unit: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      message: 'Bookings retrieved from Neon PostgreSQL',
      data: bookings,
      meta: { total: bookings.length, source: 'Neon PostgreSQL (Live)' },
    });
  } catch (err: any) {
    let bookings = INITIAL_BOOKINGS.filter((b) => b.companyId === companyId);
    if (status) bookings = bookings.filter((b) => b.status === status);

    return NextResponse.json({
      success: true,
      message: 'Bookings retrieved from memory cache fallback',
      data: bookings,
      meta: { total: bookings.length, source: 'Memory Cache Fallback' },
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      companyId = 'comp-prestige',
      unitId,
      customerName,
      customerMobile,
      customerEmail = 'buyer@example.com',
      customerPan = 'ABCDE1234F',
      totalAgreementValue,
      bookingAmountPaid,
      paymentPlan = 'Construction Linked Plan (CLP)',
    } = body;

    if (!customerName || !customerMobile) {
      return NextResponse.json(
        { success: false, message: 'Customer name and mobile number are required' },
        { status: 400 }
      );
    }

    const bookingNum = `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      // Find default unit if not provided
      let effectiveUnitId = unitId;
      if (!effectiveUnitId) {
        const anyUnit = await prisma.unit.findFirst();
        effectiveUnitId = anyUnit?.id || 'unit-1';
      }

      const newBooking = await prisma.booking.create({
        data: {
          bookingNumber: bookingNum,
          companyId,
          unitId: effectiveUnitId,
          customerName,
          customerMobile,
          customerEmail,
          customerPan,
          totalAgreementValue: Number(totalAgreementValue || 15500000),
          bookingAmountPaid: Number(bookingAmountPaid || 500000),
          paymentPlan,
          status: 'Pending Approval',
          bookingDate: new Date().toISOString().split('T')[0],
        },
      });

      // Update unit status to Reserved/Booked
      try {
        await prisma.unit.update({
          where: { id: effectiveUnitId },
          data: { status: 'Booked', ownerCustomerName: customerName, ownerMobile: customerMobile },
        });
      } catch {}

      return NextResponse.json(
        {
          success: true,
          message: 'Booking request created and submitted for manager approval in Neon PostgreSQL',
          data: newBooking,
        },
        { status: 201 }
      );
    } catch (dbErr: any) {
      // Fallback
      const fallbackBooking = {
        id: `book-${Date.now()}`,
        bookingNumber: bookingNum,
        customerName,
        customerMobile,
        unitNumber: body.unitNumber || 'Tower A - 304',
        agreedPrice: Number(totalAgreementValue || 15500000),
        bookingAmount: Number(bookingAmountPaid || 500000),
        status: 'Pending Approval',
        bookingDate: new Date().toISOString().split('T')[0],
        allotmentLetterGenerated: false,
      };

      return NextResponse.json(
        {
          success: true,
          message: 'Booking created (Memory Cache Fallback)',
          data: fallbackBooking,
        },
        { status: 201 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Booking creation failed', error: err.message },
      { status: 400 }
    );
  }
}

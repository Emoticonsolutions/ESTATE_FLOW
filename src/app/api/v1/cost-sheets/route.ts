import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const basePrice = Number(body.basePrice) || 14500000;
    const floorRise = Number(body.floorRise) || 250000;
    const plc = Number(body.plc) || 200000;
    const parking = Number(body.parking) || 350000;
    const clubhouse = Number(body.clubhouse) || 250000;
    const maintenance = Number(body.maintenance) || 120000;
    const otherCharges = Number(body.otherCharges) || 80000;
    const discount = Number(body.discount) || 0;

    const subtotal = basePrice + floorRise + plc + parking + clubhouse + maintenance + otherCharges;
    const taxable = Math.max(0, subtotal - discount);
    const gstRate = 0.05;
    const gstAmount = Math.round(taxable * gstRate);
    const finalTotal = taxable + gstAmount;

    return NextResponse.json({
      success: true,
      message: 'Cost sheet calculated successfully',
      data: {
        id: `cs-${Date.now()}`,
        basePrice,
        floorRise,
        plc,
        parking,
        clubhouse,
        maintenance,
        otherCharges,
        subtotal,
        discount,
        taxGstRate: 5,
        taxGstAmount: gstAmount,
        finalTotal,
        paymentPlan: body.paymentPlan || 'Construction Linked Milestone Plan',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Invalid payload', error: err.message },
      { status: 400 }
    );
  }
}


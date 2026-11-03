import { NextResponse } from 'next/server';
import { INITIAL_PAYMENTS } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: INITIAL_PAYMENTS,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newPayment = {
      id: `pay-${Date.now()}`,
      receiptNumber: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: body.customerName,
      unitNumber: body.unitNumber,
      amount: Number(body.amount),
      paymentMethod: body.paymentMethod,
      referenceNumber: body.referenceNumber,
      paymentDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
    };

    return NextResponse.json({
      success: true,
      message: 'Payment recorded and official receipt stamped',
      data: newPayment,
    }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Payment recording failed', error: err.message },
      { status: 400 }
    );
  }
}


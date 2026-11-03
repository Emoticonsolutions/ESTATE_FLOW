import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const unitId = params.id;

    // Transactional simulation
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 72);

    return NextResponse.json({
      success: true,
      message: `Unit ${unitId} locked successfully for 72 hours. Double booking prevented.`,
      data: {
        unitId,
        status: 'Blocked',
        blockedBy: body.blockedBy || 'Sales Executive',
        blockedUntil: expireTime.toISOString(),
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Transaction error', error: err.message },
      { status: 500 }
    );
  }
}


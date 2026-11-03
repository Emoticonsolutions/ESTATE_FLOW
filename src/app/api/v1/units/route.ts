import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { INITIAL_UNITS } from '@/lib/mockData';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const towerId = searchParams.get('towerId');
  const status = searchParams.get('status');

  try {
    const where: any = {};
    if (towerId) where.towerId = towerId;
    if (status) where.status = status;

    const units = await prisma.unit.findMany({
      where,
      orderBy: [{ floorNumber: 'desc' }, { unitNumber: 'asc' }],
    });

    return NextResponse.json({
      success: true,
      message: 'Units retrieved from Neon PostgreSQL',
      data: units,
      meta: { total: units.length, source: 'Neon PostgreSQL (Live)' },
    });
  } catch {
    let units = INITIAL_UNITS;
    if (towerId) units = units.filter((u) => u.towerId === towerId);
    if (status) units = units.filter((u) => u.status === status);

    return NextResponse.json({
      success: true,
      message: 'Units retrieved',
      data: units,
      meta: { total: units.length, source: 'Memory Cache Fallback' },
    });
  }
}

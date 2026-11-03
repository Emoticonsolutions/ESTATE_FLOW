import { NextResponse } from 'next/server';
import { INITIAL_UNITS } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const towerId = searchParams.get('towerId');
  const status = searchParams.get('status');

  let units = INITIAL_UNITS;
  if (towerId) units = units.filter((u) => u.towerId === towerId);
  if (status) units = units.filter((u) => u.status === status);

  return NextResponse.json({
    success: true,
    message: 'Units retrieved',
    data: units,
  });
}


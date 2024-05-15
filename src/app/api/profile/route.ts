import { NextRequest, NextResponse } from 'next/server';

import { setCookies } from '@/lib/action';

export async function POST(request: NextRequest) {
  const body = await request.json();
  setCookies('user', body);
  return NextResponse.json({ success: true });
}

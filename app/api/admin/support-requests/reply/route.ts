import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return NextResponse.json({ message: 'Backend URL not configured' }, { status: 500 });
  }

  const authorization = request.headers.get('authorization');
  const body = await request.json();

  const backendResponse = await fetch(`${backendUrl}/admin/support-requests/reply`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(authorization ? { Authorization: authorization } : {}),
    },
    body: JSON.stringify(body),
  });

  const contentType = backendResponse.headers.get('content-type') || 'application/json';
  const responseBody = await backendResponse.text();

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    headers: { 'content-type': contentType },
  });
}
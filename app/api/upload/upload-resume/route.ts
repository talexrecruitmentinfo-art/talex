import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendUrl) {
    return NextResponse.json({ message: 'Backend URL not configured' }, { status: 500 });
  }

  const formData = await request.formData();
  const authorization = request.headers.get('authorization');

  const backendResponse = await fetch(`${backendUrl}/api/upload/upload-resume`, {
    method: 'POST',
    headers: authorization ? { Authorization: authorization } : undefined,
    body: formData,
  });

  const contentType = backendResponse.headers.get('content-type') || 'application/json';
  const body = await backendResponse.text();

  return new NextResponse(body, {
    status: backendResponse.status,
    headers: { 'content-type': contentType },
  });
}

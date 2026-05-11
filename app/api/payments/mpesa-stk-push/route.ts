import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/payments/mpesa-stk-push
 * Initiates M-Pesa STK push for payment
 */
export async function POST(request: NextRequest) {
  try {
    const { jobId, phoneNumber, amount } = await request.json();

    // Validate input
    if (!jobId || !phoneNumber || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const formattedPhone = phoneNumber.startsWith('0')
      ? '254' + phoneNumber.slice(1)
      : phoneNumber;

    if (!/^254\d{9}$/.test(formattedPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Get authentication token from request headers
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Call backend API to initiate STK push
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com';
    const response = await fetch(`${backendUrl}/payments/mpesa-stk-push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        jobId,
        phoneNumber: formattedPhone,
        amount,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to initiate payment' },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(
      {
        success: true,
        message: 'STK push initiated',
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment STK push error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

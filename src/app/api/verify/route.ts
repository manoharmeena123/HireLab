import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = 'CBYC2OdZUkKDTJWldzClqINs';
  const sig = crypto
    .createHmac('sha256', keySecret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');
  return sig;
};

export async function POST(request: NextRequest) {
  const { orderCreationId, razorpayPaymentId, razorpaySignature } = await request.json();
  const signature = generatedSignature(orderCreationId, razorpayPaymentId);

  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: 'Payment verification failed', isOk: false },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { message: 'Payment verified successfully', isOk: true },
    { status: 200 }
  );
}

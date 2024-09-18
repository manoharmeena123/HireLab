import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_6Yk0yEiSfOEYXv',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'CBYC2OdZUkKDTJWldzClqINs',
});

export async function POST(request: Request) {
  try {
    const { paymentId, amount, currency } = await request.json(); // Expect paymentId and amount from the request body

    if (!paymentId || !amount) {
      return NextResponse.json({ message: 'Payment ID and amount are required' }, { status: 400 });
    }

    // First, retrieve the payment details to check the status
    const paymentDetails = await razorpay.payments.fetch(paymentId);

    if (paymentDetails.status === 'captured') {
      // Return a successful response if the payment is already captured
      return NextResponse.json({
        message: 'Payment has already been captured',
        data: paymentDetails,
        alreadyCaptured: true, // Flag to indicate that this was already captured
      }, { status: 200 });
    }

    // If payment is not captured, capture it
    const captureResponse = await razorpay.payments.capture(paymentId, amount, currency);

    return NextResponse.json({
      message: 'Payment captured successfully',
      data: captureResponse,
      alreadyCaptured: false, // Flag to indicate that this is a fresh capture
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error capturing payment:', error);
    return NextResponse.json({
      message: 'Failed to capture payment',
      error: error.message,
    }, { status: 500 });
  }
}

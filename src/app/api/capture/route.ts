// pages/api/capture.ts
import Razorpay from 'razorpay';
import { NextApiRequest, NextApiResponse } from 'next';

const razorpay = new Razorpay({
  key_id: 'rzp_test_6Yk0yEiSfOEYXv',
  key_secret: 'CBYC2OdZUkKDTJWldzClqINs',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { paymentId, amount } = req.body; // Expect paymentId and amount from the request body

    if (!paymentId || !amount) {
      return res.status(400).json({ message: 'Payment ID and amount are required' });
    }

    const captureResponse = await razorpay.payments.capture(paymentId, amount, 'INR');

    return res.status(200).json({
      message: 'Payment captured successfully',
      data: captureResponse,
    });
  } catch (error: any) {
    console.error('Error capturing payment:', error);
    return res.status(500).json({
      message: 'Failed to capture payment',
      error: error.message,
    });
  }
}

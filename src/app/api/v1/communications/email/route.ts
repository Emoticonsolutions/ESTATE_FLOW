import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, html, text, type = 'notification' } = body;

    if (!to || !subject) {
      return NextResponse.json(
        { success: false, message: 'Missing recipient email (to) or subject' },
        { status: 400 }
      );
    }

    const emailContent =
      html ||
      `<div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2 style="color: #17324D;">EstateFlow Real Estate ERP</h2>
        <p>${text || 'You have received an automated notification from EstateFlow.'}</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">Delivered via Resend Cloud Delivery API</p>
      </div>`;

    const result = await sendEmail({
      to,
      subject,
      html: emailContent,
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Email dispatched successfully via Resend`,
        emailId: result.emailId,
        recipient: to,
        provider: 'Resend API',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.error || 'Email dispatch failed',
          details: result,
        },
        { status: 422 }
      );
    }
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Internal email service error', error: err.message },
      { status: 500 }
    );
  }
}

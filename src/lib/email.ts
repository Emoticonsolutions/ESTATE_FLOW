// Resend Transactional Email Helper for EstateFlow SaaS Platform

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  from = 'EstateFlow Real Estate ERP <onboarding@resend.dev>',
  replyTo,
}: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      simulated: true,
      message: 'RESEND_API_KEY not configured. Email logged to console in simulated mode.',
    };
  }

  try {
    const recipients = Array.isArray(to) ? to : [to];

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: data.message || 'Resend API call failed',
        data,
      };
    }

    return {
      success: true,
      emailId: data.id,
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message,
    };
  }
}

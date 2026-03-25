import { Resend } from 'resend';

let resendClient: Resend | null = null;

export function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is missing. Please add it in the AI Studio settings.');
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export async function sendEmail({ to, subject, html, from = 'Börsanalys.se <info@borsanalys.se>' }: { to: string | string[], subject: string, html: string, from?: string }) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend Error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return data;
}

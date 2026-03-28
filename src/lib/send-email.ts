import { reset } from './../../node_modules/yoctocolors/base.d';
import { Resend } from 'resend';
import ResetPasswordEmail from '../features/auth/components/resend-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);
interface Options {
  to: string;
  subject:string;
  resetPasswordLink:string;

}
export async function sendEmail({to,subject,resetPasswordLink}:Options) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject,
      react: ResetPasswordEmail({ resetPasswordLink }),
    });

    if (error) {
     throw new Error(`Failed to send email: ${error.message}`);
    }

  } catch (error: any) {
    throw new Error(`An error occurred while sending the email: ${error.message}`);
    }
}
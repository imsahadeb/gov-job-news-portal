import nodemailer from 'nodemailer';

// Use Ethereal for development if credentials are not provided
const createTransporter = async () => {
    if (process.env.EMAIL_SERVER_USER && process.env.EMAIL_SERVER_PASSWORD) {
        return nodemailer.createTransport({
            service: 'gmail', // Or configured host
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        });
    } else {
        // Fallback to console logging (safest for dev without ethereal setup)
        return {
            sendMail: async (mailOptions: any) => {
                console.log('---------------------------------------------------');
                console.log('📧 [DEV MODE] Sending Email');
                console.log('To:', mailOptions.to);
                console.log('Subject:', mailOptions.subject);
                console.log('Text:', mailOptions.text);
                console.log('Link found in text:', mailOptions.text.match(/http:\/\/[^\s]+/)?.[0]);
                console.log('---------------------------------------------------');
                return { messageId: 'dev-mock-id' };
            },
        };
    }
};

export const sendVerificationEmail = async (email: string, token: string) => {
    const transporter = await createTransporter();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const verificationUrl = `${appUrl}/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Govt Jobs" <noreply@example.com>',
        to: email,
        subject: 'Verify your email address - Govt Jobs Portal',
        text: `Welcome to Govt Jobs! Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #F3F4F6; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F3F4F6; padding: 40px 0;">
                    <tr>
                        <td align="center">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                                <!-- Header -->
                                <tr>
                                    <td style="background-color: #DC2626; padding: 30px 40px; text-align: center;">
                                        <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">GOVT JOBS</h1>
                                        <p style="color: #FECACA; margin: 5px 0 0 0; font-size: 16px;">Your Gateway to Government Opportunities</p>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 40px 20px 40px;">
                                        <h2 style="color: #1F2937; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Verify your email address</h2>
                                        <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                            Thanks for signing up for Govt Jobs! We're excited to have you on board.
                                        </p>
                                        <p style="color: #4B5563; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                            Please verify your email address to get access to the latest government job updates, admit cards, and results delivered straight to you.
                                        </p>
                                        
                                        <!-- Button -->
                                        <div style="text-align: center; margin: 35px 0;">
                                            <a href="${verificationUrl}" style="background-color: #DC2626; color: #ffffff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.3);">
                                                Verify Email Address
                                            </a>
                                        </div>

                                        <p style="color: #6B7280; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                                            If the button doesn't work, copy and paste this link into your browser:
                                        </p>
                                        <p style="color: #DC2626; font-size: 14px; line-height: 1.5; margin: 5px 0 0 0; word-break: break-all;">
                                            <a href="${verificationUrl}" style="color: #DC2626; text-decoration: none;">${verificationUrl}</a>
                                        </p>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #F9FAFB; padding: 30px 40px; border-top: 1px solid #E5E7EB;">
                                        <p style="color: #9CA3AF; font-size: 12px; line-height: 1.5; margin: 0 0 10px 0; text-align: center;">
                                            If you didn't create an account, you can safely ignore this email.
                                        </p>
                                        <p style="color: #9CA3AF; font-size: 12px; line-height: 1.5; margin: 0; text-align: center;">
                                            &copy; ${new Date().getFullYear()} Govt Jobs Portal. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
    const transporter = await createTransporter();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Govt Jobs" <noreply@example.com>',
        to: email,
        subject: 'Welcome to Govt Jobs!',
        text: `Hi ${name},\n\nWelcome to Govt Jobs! We are excited to have you on board. Explore the latest government job notifications and stay updated.\n\nBest Regards,\nGovt Jobs Team`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #DC2626;">Welcome to Govt Jobs!</h2>
                <p>Hi <strong>${name}</strong>,</p>
                <p>We are excited to have you on board! Explore the latest government job notifications, admit cards, and results.</p>
                <div style="margin: 20px 0;">
                    <a href="${appUrl}" style="background-color: #DC2626; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
                </div>
                <p>Best Regards,<br>Govt Jobs Team</p>
            </div>
        `,
    });
};

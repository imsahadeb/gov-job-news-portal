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
        subject: 'Verify your email address',
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
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

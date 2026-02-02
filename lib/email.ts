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
    const verificationUrl = `http://localhost:3000/verify-email?token=${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"Govt Jobs" <noreply@example.com>',
        to: email,
        subject: 'Verify your email address',
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">${verificationUrl}</a></p>`,
    });
};

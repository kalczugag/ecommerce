import nodemailer from "nodemailer";

interface EmailProps {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

export const sendEmail = async ({
    to,
    subject,
    text,
    html,
}: EmailProps): Promise<{ status: number; message: string }> => {
    const message = {
        from: "Ecommerce <notification@ecommerce.com>",
        to,
        subject,
        text,
        html,
    };

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail(message);
        return {
            status: 200,
            message: `Email sent successfully: ${info.response}`,
        };
    } catch (error: any) {
        return {
            status: 500,
            message: `Failed to send email: ${error.message}`,
        };
    }
};

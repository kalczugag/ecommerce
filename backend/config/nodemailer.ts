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
            user: "kalczugag@gmail.com",
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail(message);
        console.log("Email sent: ", info.response);
        return {
            status: 200,
            message: `Email sent successfully: ${info.response}`,
        };
    } catch (error: any) {
        console.error("Error sending email: ", error);
        return {
            status: 500,
            message: `Failed to send email: ${error.message}`,
        };
    }
};

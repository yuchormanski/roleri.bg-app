import nodemailer from "nodemailer";

export async function sendMail(email, htmlTemplate) {
    // Send an email with the reset link
    const transporter = nodemailer.createTransport({
        // Configure email provider
        host: 'mail.roleri.bg',
        port: 465, // SMTP port
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    // Create send options
    const mailOptions = {
        from: `Училище за кънки Vertigo ${process.env.EMAIL_USER}`,
        to: email,
        subject: "DO NOT REPLY: roleri.bg",
        html: htmlTemplate,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            // Handle error
            console.error('Error sending email:', error);
        } else {
            // Email sent successfully
            console.log('Email sent to:', email);
        }
    });
}
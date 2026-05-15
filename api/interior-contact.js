const nodemailer = require('nodemailer');

const validateFormData = (data) => {
    const requiredFields = ['name', 'email', 'service', 'message'];

    for (const field of requiredFields) {
        if (!data[field] || !String(data[field]).trim()) {
            return { valid: false, error: `Missing required field: ${field}` };
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    return { valid: true };
};

const escapeHtml = (text) => {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

const formatEmailBody = (data) => {
    const submittedAt = new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin' });

    return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9f6f3; padding: 30px;">
        <h2 style="color: #40393f; border-bottom: 2px solid #b499c8; padding-bottom: 10px;">
            New Ceire Dunne Interiors Inquiry
        </h2>

        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #40393f; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #6b6470; width: 38%;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #6b6470;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #6b6470;">Service:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.service)}</td></tr>
            </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
            <h3 style="color: #40393f; margin-top: 0;">Project Notes</h3>
            <p style="margin: 0; color: #4b4450; line-height: 1.7;">${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
        </div>

        <div style="background: #f2ebf7; padding: 15px; border-radius: 10px; border-left: 4px solid #8f759d;">
            <p style="margin: 0; font-size: 13px; color: #5b5460;">
                Submitted: ${escapeHtml(submittedAt)}<br>
                Source: ${escapeHtml(data.page_url || '')}
            </p>
        </div>
    </div>
    `;
};

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed' });
    }

    try {
        const data = req.body || {};

        if (data.website) {
            return res.status(200).json({ success: true });
        }

        const validation = validateFormData(data);
        if (!validation.valid) {
            return res.status(400).json({ success: false, error: validation.error });
        }

        if (process.env.EMAIL_SERVICE === 'resend') {
            const { Resend } = require('resend');
            const resend = new Resend(process.env.RESEND_API_KEY);

            await resend.emails.send({
                from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
                to: process.env.INTERIOR_FORM_RECIPIENT_EMAIL || 'ceiredunneinteriors@gmail.com',
                subject: `New Interiors Inquiry: ${data.service}`,
                html: formatEmailBody(data),
                replyTo: data.email
            });
        } else {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT, 10) || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_FROM || `"Ryder Web Solutions" <${process.env.SMTP_USER}>`,
                to: process.env.INTERIOR_FORM_RECIPIENT_EMAIL || 'ceiredunneinteriors@gmail.com',
                subject: `New Interiors Inquiry: ${data.service}`,
                html: formatEmailBody(data),
                replyTo: data.email
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Inquiry received. We will be in touch shortly.'
        });
    } catch (error) {
        console.error('Interior contact submission error:', error.message);
        return res.status(500).json({
            success: false,
            error: 'Unable to process submission. Please try again.'
        });
    }
};
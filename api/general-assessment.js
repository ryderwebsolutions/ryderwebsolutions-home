const nodemailer = require('nodemailer');

const validateFormData = (data) => {
    const requiredFields = [
        'business_name',
        'your_name',
        'work_email',
        'phone_number',
        'business_location',
        'service_interest'
    ];

    for (const field of requiredFields) {
        if (!data[field] || !String(data[field]).trim()) {
            return { valid: false, error: `Missing required field: ${field}` };
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.work_email)) {
        return { valid: false, error: 'Invalid email format' };
    }

    const phoneDigits = String(data.phone_number).replace(/\D/g, '');
    if (phoneDigits.length < 6) {
        return { valid: false, error: 'Invalid phone number' };
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
    const submittedAt = data.submission_date
        ? new Date(data.submission_date).toLocaleString('en-IE', { timeZone: 'Europe/Dublin' })
        : new Date().toLocaleString('en-IE', { timeZone: 'Europe/Dublin' });

    return `
    <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #f9f9f9; padding: 30px;">
        <h2 style="color: #0f172a; border-bottom: 2px solid #22c55e; padding-bottom: 10px;">
            New General Consultation Request
        </h2>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #111827; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #4b5563; width: 42%;">Business Name:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.business_name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #4b5563;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.your_name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #4b5563;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.work_email)}">${escapeHtml(data.work_email)}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #4b5563;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(data.phone_number)}</td></tr>
                <tr><td style="padding: 8px 0; color: #4b5563;">Location:</td><td style="padding: 8px 0;">${escapeHtml(data.business_location)}</td></tr>
            </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #111827; margin-top: 0;">Project Context</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #4b5563; width: 42%;">Looking For:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.service_interest)}</td></tr>
                <tr><td style="padding: 8px 0; color: #4b5563;">Problems Facing:</td><td style="padding: 8px 0;">${escapeHtml(data.problems_facing) || 'Not provided'}</td></tr>
            </table>
        </div>

        <div style="background: #ecfdf3; padding: 15px; border-radius: 8px; border-left: 4px solid #22c55e;">
            <p style="margin: 0; font-size: 13px; color: #334155;">
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
                to: process.env.FORM_RECIPIENT_EMAIL || 'dylan@ryderwebsolutions.com',
                subject: `New Consultation Request: ${data.business_name} — ${data.service_interest}`,
                html: formatEmailBody(data),
                replyTo: data.work_email
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
                from: `"Ryder Web Solutions" <${process.env.SMTP_USER}>`,
                to: process.env.FORM_RECIPIENT_EMAIL || 'dylan@ryderwebsolutions.com',
                subject: `New Consultation Request: ${data.business_name} — ${data.service_interest}`,
                html: formatEmailBody(data),
                replyTo: data.work_email
            });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('General assessment submission error:', error.message);
        return res.status(500).json({ success: false, error: 'Unable to process submission. Please try again.' });
    }
};

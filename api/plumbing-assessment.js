const nodemailer = require('nodemailer');

const validateFormData = (data) => {
    const requiredFields = [
        'business_name', 'your_name', 'work_email', 'phone_number',
        'business_location', 'business_type', 'main_goal', 'biggest_challenge', 'timeline'
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
    const phoneDigits = data.phone_number.replace(/\D/g, '');
    if (phoneDigits.length < 8) {
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
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px;">
        <h2 style="color: #7b2cbf; border-bottom: 2px solid #9d4edd; padding-bottom: 10px;">
            New Plumbing Lead Assessment
        </h2>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Contact Information</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 40%;">Business Name:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.business_name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Owner Name:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.your_name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.work_email)}">${escapeHtml(data.work_email)}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Phone:</td><td style="padding: 8px 0;">${escapeHtml(data.phone_number)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Location:</td><td style="padding: 8px 0;">${escapeHtml(data.business_location)}</td></tr>
            </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Business &amp; Goals</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 40%;">Business Type:</td><td style="padding: 8px 0; font-weight: bold;">${escapeHtml(data.business_type)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Main Goal:</td><td style="padding: 8px 0;">${escapeHtml(data.main_goal)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Biggest Challenge:</td><td style="padding: 8px 0;">${escapeHtml(data.biggest_challenge)}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Timeline:</td><td style="padding: 8px 0; font-weight: bold; color: #7b2cbf;">${escapeHtml(data.timeline)}</td></tr>
            </table>
        </div>

        <div style="background: #f0e8ff; padding: 15px; border-radius: 8px; border-left: 4px solid #9d4edd;">
            <p style="margin: 0; font-size: 13px; color: #555;">
                Submitted: ${new Date(data.submission_date).toLocaleString('en-IE', { timeZone: 'Europe/Dublin' })}<br>
                Source: ${escapeHtml(data.page_url)}
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
        const data = req.body;

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
                subject: `New Plumbing Lead: ${data.business_name} — ${data.business_type}`,
                html: formatEmailBody(data),
                replyTo: data.work_email
            });
        } else {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: parseInt(process.env.SMTP_PORT) || 587,
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            await transporter.sendMail({
                from: `"Ryder Web Solutions" <${process.env.SMTP_USER}>`,
                to: process.env.FORM_RECIPIENT_EMAIL || 'dylan@ryderwebsolutions.com',
                subject: `New Plumbing Lead: ${data.business_name} — ${data.business_type}`,
                html: formatEmailBody(data),
                replyTo: data.work_email
            });
        }

        console.log(`Plumbing assessment submitted: ${data.business_name} <${data.work_email}>`);
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Plumbing form submission error:', error.message);
        return res.status(500).json({ success: false, error: 'Unable to process submission. Please try again.' });
    }
};

const nodemailer = require('nodemailer');

const validateFormData = (data) => {
    const requiredFields = ['business_name', 'your_name', 'work_email', 'phone_number'];
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
    const source = data.page_url
        ? (data.page_url.includes('free-review') ? 'Free Review Page' : 'Plumbing Page')
        : 'Website';

    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f4f6fb; padding: 30px;">
        <div style="background: #1e40af; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 1.2rem;">New Free Review Request</h2>
        </div>

        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; margin-bottom: 16px; border: 1px solid #e2e8f0; border-top: none;">
            <h3 style="color: #1e40af; margin-top: 0; font-size: 1rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 40%; font-size: 0.9rem;">Business:</td><td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${escapeHtml(data.business_name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 0.9rem;">Name:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${escapeHtml(data.your_name)}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 0.9rem;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(data.work_email)}" style="color: #1e40af;">${escapeHtml(data.work_email)}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b; font-size: 0.9rem;">Phone:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a; font-size: 1rem;">${escapeHtml(data.phone_number)}</td></tr>
            </table>
        </div>

        <div style="background: #eff6ff; padding: 14px 18px; border-radius: 8px; border-left: 4px solid #1e40af;">
            <p style="margin: 0; font-size: 0.8rem; color: #475569;">
                Submitted: ${new Date(data.submission_date || Date.now()).toLocaleString('en-IE', { timeZone: 'Europe/Dublin' })}<br>
                Source: ${escapeHtml(source)} — ${escapeHtml(data.page_url || '')}
            </p>
        </div>

        <p style="margin: 16px 0 0; font-size: 0.8rem; color: #94a3b8; text-align: center;">
            Follow up promptly — this lead just submitted a review request.
        </p>
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
                subject: `New Review Request: ${data.business_name} (${data.your_name})`,
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
                subject: `New Review Request: ${data.business_name} (${data.your_name})`,
                html: formatEmailBody(data),
                replyTo: data.work_email
            });
        }

        console.log(`Free review submitted: ${data.business_name} <${data.work_email}>`);
        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Form submission error:', error.message);
        return res.status(500).json({ success: false, error: 'Unable to process submission. Please try again.' });
    }
};

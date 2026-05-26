const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const generalAssessmentHandler = require('./api/general-assessment');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Template routes with explicit paths
const interiorDistPath = path.join(__dirname, 'templates/interior/dist');
const arcscaffoldingDistPath = path.join(__dirname, 'templates/arcscaffolding/dist');
const constructionPath = path.join(__dirname, 'templates/construction');

// Serve static assets from dist folders
app.use('/templates/interior/assets', express.static(path.join(interiorDistPath, 'assets')));
app.use('/templates/interior/images', express.static(path.join(interiorDistPath, 'images')));
app.use('/templates/arcscaffolding/assets', express.static(path.join(arcscaffoldingDistPath, 'assets')));
app.use('/templates/arcscaffolding/images', express.static(path.join(arcscaffoldingDistPath, 'images')));
app.use('/templates/construction', express.static(constructionPath));

// Serve root static files  
app.use(express.static(__dirname));

// SPA routes - serve index.html for all paths under these templates
app.get(['/templates/interior', '/templates/interior/*'], (req, res) => {
    res.sendFile(path.join(interiorDistPath, 'index.html'));
});

app.get(['/templates/arcscaffolding', '/templates/arcscaffolding/*'], (req, res) => {
    res.sendFile(path.join(arcscaffoldingDistPath, 'index.html'));
});

app.get(['/templates/construction', '/templates/construction/'], (req, res) => {
    res.sendFile(path.join(constructionPath, 'index.html'));
});

// Email configuration
const createEmailTransporter = () => {
    // Support for Resend API or Nodemailer with SMTP
    const emailService = process.env.EMAIL_SERVICE || 'smtp';
    
    if (emailService === 'resend') {
        // Resend API integration (if using Resend)
        return {
            send: async (mailOptions) => {
                try {
                    const { Resend } = require('resend');
                    const resend = new Resend(process.env.RESEND_API_KEY);
                    
                    return resend.emails.send({
                        from: process.env.EMAIL_FROM || 'forms@ryderwebsolutions.com',
                        to: mailOptions.to,
                        subject: mailOptions.subject,
                        html: mailOptions.html,
                        replyTo: mailOptions.replyTo || mailOptions.from
                    });
                } catch (error) {
                    console.error('Resend error:', error);
                    throw error;
                }
            }
        };
    }
    
    // Default: Nodemailer with SMTP
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });
};

const sendEmail = async (transporter, mailOptions) => {
    if (process.env.EMAIL_SERVICE === 'resend') {
        return transporter.send(mailOptions);
    }

    return transporter.sendMail(mailOptions);
};

// Validate required fields
const validateFormData = (data) => {
    const requiredFields = [
        'clinic_name',
        'your_name',
        'work_email',
        'phone_number',
        'clinic_location',
        'business_type',
        'main_goal',
        'biggest_challenge',
        'timeline'
    ];
    
    for (let field of requiredFields) {
        if (!data[field] || !String(data[field]).trim()) {
            return {
                valid: false,
                error: `Missing required field: ${field}`
            };
        }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.work_email)) {
        return {
            valid: false,
            error: 'Invalid email format'
        };
    }
    
    // Validate phone format (basic check)
    const phoneDigits = data.phone_number.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
        return {
            valid: false,
            error: 'Invalid phone number'
        };
    }
    
    return { valid: true };
};

// Format form data for email
const formatEmailBody = (data) => {
    return `
    <h2>Cosmetic Clinic Assessment Submission</h2>
    
    <h3>Lead Information:</h3>
    <ul>
        <li><strong>Clinic Name:</strong> ${escapeHtml(data.clinic_name)}</li>
        <li><strong>Owner Name:</strong> ${escapeHtml(data.your_name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.work_email)}</li>
        <li><strong>Phone:</strong> ${escapeHtml(data.phone_number)}</li>
        <li><strong>Location:</strong> ${escapeHtml(data.clinic_location)}</li>
    </ul>
    
    <h3>Business & Goals:</h3>
    <ul>
        <li><strong>Business Type:</strong> ${escapeHtml(data.business_type)}</li>
        <li><strong>Main Goal:</strong> ${escapeHtml(data.main_goal)}</li>
        <li><strong>Biggest Challenge:</strong> ${escapeHtml(data.biggest_challenge)}</li>
        <li><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</li>
    </ul>
    
    <h3>Submission Details:</h3>
    <ul>
        <li><strong>Date:</strong> ${new Date(data.submission_date).toLocaleString()}</li>
        <li><strong>Page URL:</strong> ${escapeHtml(data.page_url)}</li>
    </ul>
    
    <p style="font-size: 12px; color: #666; margin-top: 30px;">
        This is an automated email. Please follow up with the lead promptly.
    </p>
    `;
};

const validateInteriorContactData = (data) => {
    const requiredFields = ['name', 'email', 'service', 'message'];

    for (const field of requiredFields) {
        if (!data[field] || !String(data[field]).trim()) {
            return {
                valid: false,
                error: `Missing required field: ${field}`
            };
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return {
            valid: false,
            error: 'Invalid email format'
        };
    }

    return { valid: true };
};

const formatInteriorContactEmailBody = (data) => {
    return `
    <h2>New Ceire Dunne Interiors Inquiry</h2>

    <h3>Contact Details</h3>
    <ul>
        <li><strong>Name:</strong> ${escapeHtml(data.name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
        <li><strong>Service:</strong> ${escapeHtml(data.service)}</li>
    </ul>

    <h3>Project Notes</h3>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>

    <h3>Submission Details</h3>
    <ul>
        <li><strong>Date:</strong> ${new Date().toLocaleString()}</li>
        <li><strong>Page URL:</strong> ${escapeHtml(data.page_url || '')}</li>
    </ul>

    <p style="font-size: 12px; color: #666; margin-top: 30px;">
        This inquiry was sent from the Ceire Dunne Interiors website.
    </p>
    `;
};

// Escape HTML to prevent injection
const escapeHtml = (text) => {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// API Route: Cosmetic Clinic Assessment
app.post('/api/cosmetic-clinic-assessment', async (req, res) => {
    try {
        // Validate form data
        const validation = validateFormData(req.body);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error
            });
        }
        
        // Check honeypot (should be empty)
        if (req.body.website) {
            console.warn('Honeypot field filled - spam detected');
            // Return success anyway to confuse bots
            return res.status(200).json({ success: true });
        }
        
        // Rate limiting check (optional - can be implemented with Redis)
        // For now, we'll trust the frontend validation
        
        // Prepare email
        const transporter = createEmailTransporter();
        const emailBody = formatEmailBody(req.body);
        
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'forms@ryderwebsolutions.com',
            to: process.env.FORM_RECIPIENT_EMAIL || 'dylan@ryderwebsolutions.com',
            subject: `New Cosmetic Clinic Assessment: ${req.body.clinic_name}`,
            html: emailBody,
            replyTo: req.body.work_email
        };
        
        // Send email
        await sendEmail(transporter, mailOptions);
        
        console.log('Email sent successfully:', {
            clinic: req.body.clinic_name,
            email: req.body.work_email,
            timestamp: new Date().toISOString()
        });
        
        // Return success
        return res.status(200).json({
            success: true,
            message: 'Assessment received. We will contact you within 24 hours.'
        });
        
    } catch (error) {
        console.error('Form submission error:', error);
        
        return res.status(500).json({
            success: false,
            error: 'Unable to process submission. Please try again later.'
        });
    }
});

app.post('/api/interior-contact', async (req, res) => {
    try {
        const validation = validateInteriorContactData(req.body);
        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                error: validation.error
            });
        }

        if (req.body.website) {
            console.warn('Interior contact honeypot triggered');
            return res.status(200).json({ success: true });
        }

        const transporter = createEmailTransporter();
        const emailBody = formatInteriorContactEmailBody(req.body);
        const mailOptions = {
            from: process.env.EMAIL_FROM || 'forms@ryderwebsolutions.com',
            to: process.env.INTERIOR_FORM_RECIPIENT_EMAIL || 'ceiredunneinteriors@gmail.com',
            subject: `New Interior Inquiry: ${req.body.service}`,
            html: emailBody,
            replyTo: req.body.email
        };

        await sendEmail(transporter, mailOptions);

        console.log('Interior inquiry sent successfully:', {
            name: req.body.name,
            email: req.body.email,
            service: req.body.service,
            timestamp: new Date().toISOString()
        });

        return res.status(200).json({
            success: true,
            message: 'Inquiry received. We will be in touch shortly.'
        });
    } catch (error) {
        console.error('Interior contact submission error:', error);

        return res.status(500).json({
            success: false,
            error: 'Unable to send your inquiry right now. Please try again later.'
        });
    }
});

// API Route: General Consultation Assessment
app.post('/api/general-assessment', (req, res) => {
    return generalAssessmentHandler(req, res);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Ryder Web Solutions - Form Handler'
    });
});

// Serve static files for cosmetic clinic
app.use('/cosmetic-clinic', express.static(__dirname + '/cosmetic-clinic'));

// Serve static files for general consultation page
app.use('/general-consultation', express.static(__dirname + '/general-consultation'));

// Serve cosmetic clinic index
app.get('/cosmetic-clinic/', (req, res) => {
    res.sendFile(__dirname + '/cosmetic-clinic/index.html');
});

// Serve general consultation index
app.get('/general-consultation/', (req, res) => {
    res.sendFile(__dirname + '/general-consultation/index.html');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found'
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
    ========================================
    Ryder Web Solutions - Form Handler
    ========================================
    Server running on port ${PORT}
    Environment: ${process.env.NODE_ENV || 'development'}
    Email Service: ${process.env.EMAIL_SERVICE || 'SMTP'}
    ========================================
    `);
});

module.exports = app;

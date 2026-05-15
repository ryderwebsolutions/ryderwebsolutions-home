# Cosmetic Clinic Landing Page - Setup & Deployment Guide

## Overview

This is a premium, conversion-focused landing page designed for Meta ad traffic targeting cosmetic clinics, aesthetic clinics, and med spas.

**URL:** `ryderwebsolutions.com/cosmetic-clinic/`

**Purpose:** Generate consultation booking leads through a streamlined assessment form and Calendly integration.

---

## Project Structure

```
cosmetic-clinic/
├── index.html                 # Main landing page
├── cosmetic-clinic.css        # Premium dark styling
├── cosmetic-clinic.js         # Multi-step form logic
└── assets/                    # Future: images, logos

Root Level:
├── server.js                  # Express backend for form handling
├── package.json               # Node dependencies
└── .env.example               # Environment variables template
```

---

## Features

✅ **Premium Dark Aesthetic**
- Black background with white typography
- Subtle purple accent colors (#9d4edd)
- No cheap gradients, clean and modern
- Mobile-first, fully responsive

✅ **Multi-Step Form**
- One question visible at a time
- Smooth transitions between questions
- Progress indicator (progress bar + question counter)
- Back and Next button navigation
- Form validation on each step
- Honeypot spam protection

✅ **Form Questions**
1. Clinic name
2. Your full name
3. Work email
4. Best phone number
5. Clinic location
6. Business type (radio: Cosmetic Clinic, Aesthetic Clinic, Med Spa, Skin Clinic, Cosmetic Dentistry, Other)
7. Main goal (radio: More consultations, Better conversion, Meta ads, Cleaner booking, Better presence)
8. Biggest challenge (radio: Few enquiries, Poor conversion, Instagram DMs, Weak website, No system, Other)
9. Timeline (radio: Immediately, 30 days, 1-3 months, Just exploring)

✅ **Form Submission**
- Server-side validation
- Email sent to: `dylan@ryderwebsolutions.com`
- Uses Nodemailer (SMTP) or Resend API
- Environment variables for secure credential storage
- Loading state on submit button

✅ **Success Screen**
- Premium confirmation message
- Embedded Calendly widget with prefilled name/email
- Fallback button to open Calendly in new window
- Smooth animations

✅ **SEO Optimized**
- Title: "Cosmetic Clinic Lead Generation | Ryder Web Solutions"
- Meta description optimized for conversion
- Proper semantic HTML structure

---

## Installation & Setup

### 1. Install Dependencies

```bash
cd c:\ryderwebsolutions-home
npm install
```

This installs:
- `express` - Web framework
- `cors` - Cross-origin handling
- `dotenv` - Environment variables
- `nodemailer` - Email sending
- `resend` - Alternative email service

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=production
PORT=3000

# Email Service: 'smtp' or 'resend'
EMAIL_SERVICE=smtp

# For SMTP (e.g., Gmail, SendGrid, etc.)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# For Resend (optional)
RESEND_API_KEY=re_xxxxxxxxxx

# Email settings
EMAIL_FROM=forms@ryderwebsolutions.com
FORM_RECIPIENT_EMAIL=dylan@ryderwebsolutions.com
```

### 3. Email Configuration Options

#### Option A: Gmail SMTP
1. Enable 2-factor authentication
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the app password in `.env`

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

#### Option B: Resend Email Service
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Set in `.env`:

```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_your_api_key_here
```

#### Option C: SendGrid / Mailgun / Other SMTP
Update `SMTP_HOST` and credentials accordingly.

### 4. Test the Setup

```bash
npm start
```

Visit: `http://localhost:3000/cosmetic-clinic/`

Check server health:
```bash
curl http://localhost:3000/api/health
```

---

## API Endpoint

### POST `/api/cosmetic-clinic-assessment`

**Request Format:**
```json
{
  "clinic_name": "Glow Cosmetics Dublin",
  "your_name": "John Smith",
  "work_email": "john@glowclinics.ie",
  "phone_number": "+353 87 1234567",
  "clinic_location": "Dublin, Ireland",
  "business_type": "Cosmetic Clinic",
  "main_goal": "More consultation bookings",
  "biggest_challenge": "Enquiries not converting",
  "timeline": "Immediately",
  "submission_date": "2026-05-15T10:30:00Z",
  "page_url": "https://ryderwebsolutions.com/cosmetic-clinic/"
}
```

**Response on Success:**
```json
{
  "success": true,
  "message": "Assessment received. We will contact you within 24 hours."
}
```

**Response on Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Status Codes:**
- `200` - Success
- `400` - Validation failed
- `500` - Server error

---

## Deployment

### Option 1: Heroku

```bash
# Install Heroku CLI
# Login and create app
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_SECURE=false
heroku config:set SMTP_USER=your-email@gmail.com
heroku config:set SMTP_PASSWORD=your-app-password
heroku config:set EMAIL_FROM=forms@ryderwebsolutions.com
heroku config:set FORM_RECIPIENT_EMAIL=dylan@ryderwebsolutions.com

# Deploy
git push heroku main
```

### Option 2: Vercel

Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}
```

Then:
```bash
vercel --prod
```

Set environment variables in Vercel dashboard.

### Option 3: DigitalOcean App Platform / AWS / Azure

Most platforms support Node.js directly. Set environment variables in the platform's dashboard.

### Option 4: Traditional VPS (Ubuntu/Debian)

```bash
# SSH to your server
ssh user@your-vps.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone your repo
git clone your-repo-url
cd your-repo

# Install dependencies
npm install

# Create .env file with production values
nano .env

# Use PM2 to manage the process
npm install -g pm2
pm2 start server.js --name "cosmetic-clinic"
pm2 startup
pm2 save

# Set up reverse proxy with Nginx
```

---

## Customization

### Change the Recipient Email
Edit `.env`:
```env
FORM_RECIPIENT_EMAIL=your-email@ryderwebsolutions.com
```

### Change the Calendly Link
Edit `cosmetic-clinic.js`:
```javascript
// Find this line and update the URL:
url: 'https://calendly.com/dylan-ryderwebsolutions/30min'
```

Also update in `index.html`:
```html
<button class="cta-button success-cta" id="calendly-button">
    Book Your Consultation on Calendly
</button>
```

### Customize Colors
Edit `cosmetic-clinic.css` CSS variables:
```css
:root {
    --color-accent: #9d4edd;        /* Purple */
    --color-accent-light: #c77dff;  /* Light purple */
    --color-accent-dark: #7b2cbf;   /* Dark purple */
    /* ... etc */
}
```

### Change Form Questions
Edit the form structure in `index.html` and update `cosmetic-clinic.js` validation logic accordingly.

---

## Security Notes

✅ **Implemented:**
- Server-side validation of all required fields
- Email format validation
- Phone number format validation
- Honeypot spam protection (hidden field)
- Environment variables for secrets (never hardcoded)
- CORS properly configured
- No sensitive data in console logs
- HTML escaping to prevent injection attacks

⚠️ **Recommendations:**
- Add rate limiting to prevent form spam (use package like `express-rate-limit`)
- Add reCAPTCHA for additional bot protection
- Use HTTPS in production
- Regularly update dependencies: `npm audit`
- Monitor form submissions for suspicious patterns
- Consider adding email verification for leads

---

## Performance & Mobile Testing

The landing page is:
- ✅ Mobile-first design
- ✅ Responsive on all breakpoints (480px, 768px, 1200px+)
- ✅ Lightweight CSS (no bloat)
- ✅ Minimal JavaScript (no dependencies)
- ✅ Calendly widget optimized for mobile
- ✅ Smooth animations with reduced-motion preferences respected

**Test on mobile:**
1. Use Chrome DevTools device emulation
2. Test on actual iOS and Android devices
3. Check form on small screens
4. Verify Calendly widget renders properly

---

## Troubleshooting

### Form submissions not sending emails

**Check:**
1. Is server running? `npm start`
2. Is `.env` properly configured?
3. Check server logs for error messages
4. Test SMTP credentials with telnet or online tools
5. Check firewall/port blocking (port 587 for SMTP)

**For Gmail:**
- Make sure 2FA is enabled and you're using an App Password
- Check if "Less secure app access" needs to be enabled (if not using App Password)

**For Resend:**
- Verify API key is correct
- Check Resend dashboard for bounced emails
- Ensure sender email is verified in Resend

### Calendly widget not showing

- Clear browser cache
- Check Calendly URL is correct
- Verify Calendly account is active
- Check browser console for errors

### Form buttons not working on mobile

- Check CSS media queries are working
- Verify touch events aren't being blocked
- Test on actual device, not just emulation

---

## Monitoring & Analytics

### Track form submissions:

Add Google Analytics to `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Then track form submission in `cosmetic-clinic.js`:
```javascript
// In the showSuccess() method:
gtag('event', 'form_submission', {
  'clinic_name': this.formData.clinic_name,
  'business_type': this.formData.business_type
});
```

---

## SEO Optimization

Already included:
- ✅ SEO title and meta description
- ✅ Semantic HTML (h1, h2, section, etc.)
- ✅ Mobile-friendly viewport meta tag
- ✅ No duplicate content
- ✅ Fast load time
- ✅ No JavaScript blocking critical content

**Next steps:**
- Add schema markup (structured data)
- Create XML sitemap
- Set up Google Search Console
- Add Open Graph tags for social sharing
- Create proper robots.txt

---

## Support & Next Steps

For questions or issues:
1. Check the troubleshooting section above
2. Review server logs: `npm start` shows detailed errors
3. Check browser console for frontend errors (F12)
4. Verify environment variables are set correctly

---

**Built by Ryder Web Solutions** ✨
Premium conversion systems for cosmetic clinics.

# Cosmetic Clinic Landing Page - Quick Start Guide

## 🚀 Quick Start (5 Minutes)

### 1. Install & Run Locally

```bash
# Navigate to project
cd c:\ryderwebsolutions-home

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your email settings
# (Use Gmail App Password, Resend, or other SMTP provider)

# Start server
npm start

# Visit http://localhost:3000/cosmetic-clinic/
```

### 2. Email Configuration (Choose One)

**Gmail:**
```env
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password
```

**Resend (Recommended for Production):**
```env
EMAIL_SERVICE=resend
RESEND_API_KEY=re_your_key_here
```

### 3. Deploy to Production

**Vercel (Easiest):**
```bash
npm install -g vercel
vercel --prod
# Set env vars in Vercel dashboard
```

**Heroku:**
```bash
heroku create your-app-name
heroku config:set SMTP_HOST=smtp.gmail.com
# ... set other env vars ...
git push heroku main
```

---

## 📁 File Structure

```
cosmetic-clinic/
├── index.html              # Landing page (all sections)
├── cosmetic-clinic.css    # Premium dark styling
├── cosmetic-clinic.js     # Form logic & Calendly
└── README.md              # Full documentation

Root:
├── server.js              # Express backend
├── package.json           # Dependencies
├── .env                   # Secrets (don't commit!)
├── .env.example          # Template
└── vercel.json           # Vercel deployment config
```

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Premium Dark Theme** | Black background, white text, purple accents |
| **Multi-Step Form** | One question at a time, smooth transitions |
| **Form Validation** | Server + client side, spam protection |
| **Email Notifications** | Submissions sent to dylan@ryderwebsolutions.com |
| **Calendly Integration** | Embedded booking widget on success screen |
| **Mobile Responsive** | Works perfectly on all devices |
| **SEO Optimized** | Title, meta, semantic HTML |
| **Smooth Animations** | Subtle, professional, respects prefers-reduced-motion |

---

## 🔧 Customization

### Change Recipient Email
`.env`:
```env
FORM_RECIPIENT_EMAIL=your-email@example.com
```

### Change Calendly Link
`cosmetic-clinic.js`:
```javascript
url: 'https://calendly.com/your-link/30min'
```

### Update Form Questions
Edit `.form-question` divs in `index.html` and update validation in `cosmetic-clinic.js`.

### Change Colors
`cosmetic-clinic.css`:
```css
:root {
    --color-accent: #your-color;
}
```

---

## 🧪 Testing

**Local Testing:**
```bash
npm start
# Visit http://localhost:3000/cosmetic-clinic/
```

**Mobile Testing:**
- Use Chrome DevTools device emulation
- Test on real phone
- Check form works on small screens
- Verify Calendly widget loads

**Form Testing:**
1. Fill out all fields
2. Check validation errors
3. Verify email is received at FORM_RECIPIENT_EMAIL
4. Confirm success screen and Calendly widget appear

---

## 🚨 Common Issues

| Issue | Solution |
|-------|----------|
| Emails not sending | Check `.env` config, verify SMTP credentials, check firewall |
| Calendly not showing | Clear cache, verify URL, check console for errors |
| Form button stuck | Reload page, check server logs |
| Mobile form broken | Check breakpoints in CSS, test on real device |

---

## 📊 Form Flow Diagram

```
User Visit Landing Page
         ↓
    [Hero Section]
         ↓
    Click "Start Assessment"
         ↓
    [Multi-Step Form]
    Q1: Clinic Name
    Q2: Your Name
    Q3: Email
    Q4: Phone
    Q5: Location
    Q6: Business Type
    Q7: Main Goal
    Q8: Biggest Challenge
    Q9: Timeline
         ↓
    Submit Form
         ↓
    [Server Validation]
         ↓
    [Send Email to Dylan]
         ↓
    [Show Success Screen]
         ↓
    [Display Calendly Widget]
         ↓
    User Books Consultation
```

---

## 📧 Email Received Content

When a user submits, Dylan receives an email with:
- ✅ All clinic information
- ✅ Contact details
- ✅ Business type
- ✅ Main goal & challenges
- ✅ Timeline
- ✅ Submission timestamp
- ✅ Source URL

---

## 🔐 Security

✅ **Implemented:**
- Environment variables for secrets
- Server-side validation
- Honeypot spam protection
- HTML escaping
- CORS configured

⚠️ **Recommended for Production:**
- Enable HTTPS
- Add rate limiting
- Add reCAPTCHA
- Monitor spam patterns
- Keep dependencies updated

---

## 🎯 Conversion Optimization

**Currently Optimized For:**
- 📱 Mobile-first design
- ⏱️ Fast form completion (2 minutes)
- 🎨 Premium aesthetic matching brand
- 🎯 Clear value proposition
- 📍 Specific CTA buttons
- ✨ Smooth animations (not distracting)
- 📞 Calendly booking immediately after submission

---

## 📞 Support

**Check these first:**
1. Server logs: `npm start` output
2. Browser console: F12 → Console tab
3. `.env` file: All required variables set?
4. Network tab: Any failed requests?

**Common Causes:**
- Missing `.env` file
- SMTP credentials wrong
- Port 587/465 blocked by firewall
- Node.js version too old (use 16+)

---

## ✅ Pre-Launch Checklist

- [ ] `.env` configured with email settings
- [ ] Test form submission locally
- [ ] Verify email is received
- [ ] Test on mobile device
- [ ] Check Calendly link is correct
- [ ] Deploy to production
- [ ] Set env vars in production platform
- [ ] Test form on production URL
- [ ] Check SEO title/description
- [ ] Monitor spam submissions
- [ ] Set up analytics/tracking

---

## 📈 Next Steps

1. **Deploy:** Follow deployment guide above
2. **Monitor:** Set up email alerts for form submissions
3. **Analyze:** Track which clinics convert
4. **Optimize:** Test different headlines, CTA text
5. **Scale:** Run Meta ads campaigns

---

**Ready to launch? Start with `npm install && npm start`!** 🚀

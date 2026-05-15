class GeneralConsultationForm {
    constructor() {
        this.form = document.getElementById('assessment-form');
        this.formSection = document.getElementById('form-section');
        this.successSection = document.getElementById('success-section');
        this.submitButton = document.getElementById('submit-button');
        this.errorDisplay = document.getElementById('form-error');
        this.isSubmitting = false;

        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }

    validateForm(formData) {
        const requiredFields = [
            'business_name',
            'your_name',
            'work_email',
            'phone_country_code',
            'phone_number',
            'business_location',
            'service_interest'
        ];

        for (const field of requiredFields) {
            const value = (formData.get(field) || '').toString().trim();
            if (!value) {
                return { valid: false, error: 'Please complete all required fields.' };
            }
        }

        const emailValue = String(formData.get('work_email') || '').trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            return { valid: false, error: 'Please enter a valid email address.' };
        }

        const phoneDigits = String(formData.get('phone_number') || '').replace(/\D/g, '');
        if (phoneDigits.length < 6) {
            return { valid: false, error: 'Please enter a valid phone number.' };
        }

        return { valid: true };
    }

    showError(message) {
        this.errorDisplay.textContent = message;
    }

    clearError() {
        this.errorDisplay.textContent = '';
    }

    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;
        this.submitButton.disabled = isSubmitting;
        this.submitButton.textContent = isSubmitting
            ? 'Submitting...'
            : 'Submit And Continue To Booking';
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.isSubmitting) return;

        const formData = new FormData(this.form);

        if ((formData.get('website') || '').toString().trim()) {
            this.showSuccess({ your_name: formData.get('your_name') || '', work_email: formData.get('work_email') || '' });
            return;
        }

        const validation = this.validateForm(formData);
        if (!validation.valid) {
            this.showError(validation.error);
            return;
        }

        this.clearError();
        this.setSubmittingState(true);

        const payload = {
            business_name: String(formData.get('business_name') || '').trim(),
            your_name: String(formData.get('your_name') || '').trim(),
            work_email: String(formData.get('work_email') || '').trim(),
            phone_country_code: String(formData.get('phone_country_code') || '').trim(),
            phone_number: `${String(formData.get('phone_country_code') || '').trim()} ${String(formData.get('phone_number') || '').trim()}`.trim(),
            business_location: String(formData.get('business_location') || '').trim(),
            service_interest: String(formData.get('service_interest') || '').trim(),
            problems_facing: String(formData.get('problems_facing') || '').trim(),
            submission_date: new Date().toISOString(),
            page_url: window.location.href
        };

        try {
            const response = await fetch('/api/general-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Submission failed');
            }

            this.showSuccess(payload);
        } catch (error) {
            console.error('General consultation form submission error:', error);
            this.showError('Unable to submit right now. Please try again in a moment.');
            this.setSubmittingState(false);
        }
    }

    showSuccess(payload) {
        this.formSection.style.display = 'none';
        this.successSection.style.display = 'block';
        this.initCalendly(payload);

        setTimeout(() => {
            this.successSection.scrollIntoView({ behavior: 'smooth' });
        }, 200);
    }

    initCalendly(payload) {
        const calendlyContainer = document.getElementById('calendly-container');
        const embedHeight = window.matchMedia('(max-width: 768px)').matches ? 1180 : 1300;

        if (!calendlyContainer) return;

        calendlyContainer.innerHTML = '';

        const enforceHeight = () => {
            calendlyContainer.style.setProperty('min-height', `${embedHeight}px`, 'important');

            const widget = calendlyContainer.querySelector('.calendly-inline-widget');
            if (widget) {
                widget.style.setProperty('height', `${embedHeight}px`, 'important');
            }

            const iframe = calendlyContainer.querySelector('iframe');
            if (iframe) {
                iframe.style.setProperty('height', `${embedHeight}px`, 'important');
            }
        };

        if (window.Calendly) {
            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/dylan-ryderwebsolutions/30min',
                parentElement: calendlyContainer,
                prefill: {
                    name: payload.your_name || '',
                    email: payload.work_email || ''
                }
            });

            enforceHeight();
            setTimeout(enforceHeight, 300);
            setTimeout(enforceHeight, 1000);

            const observer = new MutationObserver(() => enforceHeight());
            observer.observe(calendlyContainer, { childList: true, subtree: true });
            setTimeout(() => observer.disconnect(), 5000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new GeneralConsultationForm();
});

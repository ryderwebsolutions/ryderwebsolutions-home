class GeneralConsultationForm {
    constructor() {
        this.form = document.getElementById('assessment-form');
        this.questions = Array.from(document.querySelectorAll('.form-question'));
        this.totalQuestions = this.questions.length;
        this.currentQuestion = 0;
        this.formData = {};

        this.backButton = document.getElementById('back-button');
        this.nextButton = document.getElementById('next-button');
        this.submitButton = document.getElementById('submit-button');
        this.errorDisplay = document.getElementById('form-error');

        this.formSection = document.getElementById('form-section');
        this.successSection = document.getElementById('success-section');
        this.isSubmitting = false;

        this.init();
    }

    init() {
        if (!this.form || !this.questions.length) return;

        this.updateProgressBar();
        this.updateNavigationButtons();

        this.nextButton.addEventListener('click', () => this.handleNext());
        this.backButton.addEventListener('click', () => this.handleBack());
        this.submitButton.addEventListener('click', (event) => this.handleSubmit(event));
        this.form.addEventListener('submit', (event) => event.preventDefault());

        this.form.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && event.target.tagName !== 'TEXTAREA') {
                event.preventDefault();
                if (this.currentQuestion < this.totalQuestions - 1) {
                    this.handleNext();
                } else {
                    this.handleSubmit();
                }
            }
        });
    }

    handleNext() {
        if (!this.validateCurrentQuestion()) {
            this.showError('Please fill in this field');
            return;
        }

        this.clearError();
        this.saveCurrentQuestion();

        if (this.currentQuestion < this.totalQuestions - 1) {
            this.moveToQuestion(this.currentQuestion + 1);
        }
    }

    handleBack() {
        if (this.currentQuestion === 0) return;

        this.clearError();
        this.saveCurrentQuestion();
        this.moveToQuestion(this.currentQuestion - 1);
    }

    moveToQuestion(questionNumber) {
        this.questions[this.currentQuestion].classList.remove('active');
        this.questions[this.currentQuestion].classList.add('previous');

        this.currentQuestion = questionNumber;

        this.questions[this.currentQuestion].classList.remove('previous');
        this.questions[this.currentQuestion].classList.add('active');

        this.updateProgressBar();
        this.updateNavigationButtons();

        setTimeout(() => {
            const firstField = this.questions[this.currentQuestion].querySelector('input, select, textarea');
            if (firstField) firstField.focus();
        }, 100);
    }

    validateCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        const requiredInputs = question.querySelectorAll('input[required], select[required], textarea[required]');

        for (const input of requiredInputs) {
            if (input.type === 'radio') {
                const selected = this.form.querySelector(`input[name="${input.name}"]:checked`);
                if (!selected) return false;
                continue;
            }

            const value = (input.value || '').trim();

            if (!value) return false;

            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return false;
            }

            if (input.type === 'tel') {
                const phoneDigits = value.replace(/\D/g, '');
                if (phoneDigits.length < 6) return false;
            }
        }

        return true;
    }

    saveCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        const inputs = question.querySelectorAll('input, select, textarea');

        inputs.forEach((input) => {
            if (input.name === 'website') return;

            if (input.type === 'radio') {
                if (input.checked) this.formData[input.name] = input.value;
                return;
            }

            this.formData[input.name] = (input.value || '').trim();
        });
    }

    updateProgressBar() {
        const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
        const progressFill = document.querySelector('.progress-fill');
        const currentQuestionText = document.querySelector('.current-question');
        const totalQuestionText = document.querySelector('.total-questions');

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (currentQuestionText) currentQuestionText.textContent = String(this.currentQuestion + 1);
        if (totalQuestionText) totalQuestionText.textContent = String(this.totalQuestions);
    }

    updateNavigationButtons() {
        this.backButton.disabled = this.currentQuestion === 0;

        if (this.currentQuestion === this.totalQuestions - 1) {
            this.nextButton.style.display = 'none';
            this.submitButton.style.display = 'block';
        } else {
            this.nextButton.style.display = 'block';
            this.submitButton.style.display = 'none';
        }
    }

    showError(message) {
        this.errorDisplay.textContent = message;
        this.errorDisplay.style.opacity = '1';
    }

    clearError() {
        this.errorDisplay.textContent = '';
        this.errorDisplay.style.opacity = '0';
    }

    async handleSubmit(event) {
        if (event) event.preventDefault();
        if (this.isSubmitting) return;

        if (!this.validateCurrentQuestion()) {
            this.showError('Please fill in this field');
            return;
        }

        this.saveCurrentQuestion();

        const honeypot = this.form.querySelector('input[name="website"]');
        if (honeypot && honeypot.value.trim()) {
            this.showSuccess({ your_name: this.formData.your_name || '', work_email: this.formData.work_email || '' });
            return;
        }

        this.clearError();
        this.setSubmittingState(true);

        const countryCode = (this.formData.phone_country_code || '').trim();
        const localPhone = (this.formData.phone_number || '').trim();

        const payload = {
            business_name: (this.formData.business_name || '').trim(),
            your_name: (this.formData.your_name || '').trim(),
            work_email: (this.formData.work_email || '').trim(),
            phone_country_code: countryCode,
            phone_number: `${countryCode} ${localPhone}`.trim(),
            business_location: (this.formData.business_location || '').trim(),
            service_interest: (this.formData.service_interest || '').trim(),
            problems_facing: (this.formData.problems_facing || '').trim(),
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

    setSubmittingState(isSubmitting) {
        this.isSubmitting = isSubmitting;
        this.submitButton.disabled = isSubmitting;
        this.submitButton.innerHTML = isSubmitting
            ? '<span class="loading-spinner"></span>Submitting...'
            : 'Submit And Continue To Booking';
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

/* ============================================
   PLUMBING FORM - JAVASCRIPT LOGIC
   ============================================ */

class MultiStepForm {
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
        this.updateProgressBar();
        this.updateNavigationButtons();

        this.nextButton.addEventListener('click', () => this.handleNext());
        this.backButton.addEventListener('click', () => this.handleBack());
        this.submitButton.addEventListener('click', (e) => this.handleSubmit(e));
        this.form.addEventListener('submit', (e) => e.preventDefault());

        this.form.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.type !== 'textarea') {
                e.preventDefault();
                if (this.currentQuestion < this.totalQuestions - 1) {
                    this.handleNext();
                } else {
                    this.handleSubmit();
                }
            }
        });

        // Listen for Calendly booking completion → redirect to landing page
        window.addEventListener('message', (e) => {
            if (e.origin !== 'https://calendly.com') return;
            if (e.data && e.data.event === 'calendly.event_scheduled') {
                window.location.href = '/plumbing/landing/';
            }
        });

        window.addEventListener('load', () => {
            const params = new URLSearchParams(window.location.search);
            if (params.get('focus') === 'form') {
                setTimeout(() => {
                    this.formSection.scrollIntoView({ behavior: 'smooth' });
                }, 500);
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
        } else {
            this.nextButton.style.display = 'none';
            this.submitButton.style.display = 'block';
        }
    }

    handleBack() {
        if (this.currentQuestion > 0) {
            this.clearError();
            this.saveCurrentQuestion();
            this.moveToQuestion(this.currentQuestion - 1);

            if (this.submitButton.style.display === 'block') {
                this.nextButton.style.display = 'block';
                this.submitButton.style.display = 'none';
            }
        }
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
            const input = this.questions[this.currentQuestion].querySelector('input');
            if (input) input.focus();
        }, 100);
    }

    validateCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        const inputs = question.querySelectorAll('input[required], select[required]');

        for (let input of inputs) {
            if (input.type === 'radio') {
                const name = input.name;
                const isChecked = this.form.querySelector(`input[name="${name}"]:checked`);
                if (!isChecked) return false;
            } else if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) return false;
            } else if (input.type === 'tel') {
                const phoneValue = input.value.replace(/\D/g, '');
                if (phoneValue.length < 6) return false;
            } else {
                if (!input.value.trim()) return false;
            }
        }

        return true;
    }

    saveCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        const inputs = question.querySelectorAll('input, select');

        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else if (input.type !== 'hidden' && input.name !== 'website') {
                this.formData[input.name] = input.value.trim();
            }
        });
    }

    updateProgressBar() {
        const progress = ((this.currentQuestion + 1) / this.totalQuestions) * 100;
        const progressFill = document.querySelector('.progress-fill');
        const currentText = document.querySelector('.current-question');

        progressFill.style.width = progress + '%';
        currentText.textContent = this.currentQuestion + 1;
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

    async handleSubmit(e) {
        if (e) e.preventDefault();

        if (!this.validateCurrentQuestion()) {
            this.showError('Please fill in this field');
            return;
        }

        this.saveCurrentQuestion();

        const honeypot = this.form.querySelector('input[name="website"]');
        if (honeypot.value) {
            this.showSuccess();
            return;
        }

        this.submitButton.disabled = true;
        this.submitButton.innerHTML = '<span class="loading-spinner"></span>Submitting...';
        this.isSubmitting = true;

        try {
            const response = await this.submitForm();

            if (response.ok) {
                this.showSuccess();
            } else {
                this.showError('Submission failed. Please try again.');
                this.resetSubmitButton();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('An error occurred. Please try again.');
            this.resetSubmitButton();
        }
    }

    async submitForm() {
        const countryCode = (this.formData.phone_country_code || '').trim();
        const localPhone = (this.formData.phone_number || '').trim();

        const payload = {
            ...this.formData,
            phone_number: `${countryCode} ${localPhone}`.trim(),
            submission_date: new Date().toISOString(),
            page_url: window.location.href
        };

        const response = await fetch('/api/plumbing-assessment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        return response;
    }

    resetSubmitButton() {
        this.submitButton.disabled = false;
        this.submitButton.innerHTML = 'Submit Assessment';
        this.isSubmitting = false;
    }

    showSuccess() {
        this.formSection.style.display = 'none';
        this.successSection.style.display = 'block';
        this.initCalendly();

        setTimeout(() => {
            this.successSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }

    initCalendly() {
        const calendlyContainer = document.getElementById('calendly-container');
        const embedHeight = window.matchMedia('(max-width: 768px)').matches ? 1320 : 1700;

        if (!calendlyContainer) return;

        calendlyContainer.innerHTML = '';

        const enforceCalendlyHeight = () => {
            if (!calendlyContainer) return;

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
                    name: this.formData.your_name || '',
                    email: this.formData.work_email || ''
                }
            });

            enforceCalendlyHeight();
            setTimeout(enforceCalendlyHeight, 300);
            setTimeout(enforceCalendlyHeight, 1000);

            const observer = new MutationObserver(() => enforceCalendlyHeight());
            observer.observe(calendlyContainer, { childList: true, subtree: true });
            setTimeout(() => observer.disconnect(), 5000);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MultiStepForm();
});

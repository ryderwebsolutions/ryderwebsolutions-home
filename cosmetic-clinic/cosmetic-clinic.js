/* ============================================
   COSMETIC CLINIC FORM - JAVASCRIPT LOGIC
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
        
        this.nextButton.addEventListener('click', (e) => this.handleNext(e));
        this.backButton.addEventListener('click', (e) => this.handleBack(e));
        this.submitButton.addEventListener('click', (e) => this.handleSubmit(e));
        this.form.addEventListener('submit', (e) => e.preventDefault());
        
        // Allow Enter key to proceed to next question
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
        
        // Scroll to form on page load if coming from hero CTA
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
            // Show submit button on last question
            this.nextButton.style.display = 'none';
            this.submitButton.style.display = 'block';
        }
    }
    
    handleBack() {
        if (this.currentQuestion > 0) {
            this.clearError();
            this.saveCurrentQuestion();
            this.moveToQuestion(this.currentQuestion - 1);
            
            // Hide submit button when going back
            if (this.submitButton.style.display === 'block') {
                this.nextButton.style.display = 'block';
                this.submitButton.style.display = 'none';
            }
        }
    }
    
    moveToQuestion(questionNumber) {
        // Mark current question as previous (for animation)
        this.questions[this.currentQuestion].classList.remove('active');
        this.questions[this.currentQuestion].classList.add('previous');
        
        // Update current question
        this.currentQuestion = questionNumber;
        
        // Activate new question
        this.questions[this.currentQuestion].classList.remove('previous');
        this.questions[this.currentQuestion].classList.add('active');
        
        // Update UI
        this.updateProgressBar();
        this.updateNavigationButtons();
        
        // Focus on first input in new question
        setTimeout(() => {
            const input = this.questions[this.currentQuestion].querySelector('input');
            if (input) input.focus();
        }, 100);
    }
    
    validateCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        const inputs = question.querySelectorAll('input[required]');
        
        for (let input of inputs) {
            if (input.type === 'radio') {
                // For radio buttons, check if any in the group is selected
                const name = input.name;
                const isChecked = this.form.querySelector(`input[name="${name}"]:checked`);
                if (!isChecked) {
                    return false;
                }
            } else if (input.type === 'email') {
                // Validate email
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value.trim())) {
                    return false;
                }
            } else if (input.type === 'tel') {
                // Validate phone - at least 10 characters
                const phoneValue = input.value.replace(/\D/g, '');
                if (phoneValue.length < 10) {
                    return false;
                }
            } else {
                // Text input
                if (!input.value.trim()) {
                    return false;
                }
            }
        }
        
        return true;
    }
    
    saveCurrentQuestion() {
        const question = this.questions[this.currentQuestion];
        const inputs = question.querySelectorAll('input');
        
        inputs.forEach(input => {
            if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else if (input.type !== 'hidden' && input.name !== 'website') {
                // Skip honeypot
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
        // Back button
        this.backButton.disabled = this.currentQuestion === 0;
        
        // Next button
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
        
        // Final validation
        if (!this.validateCurrentQuestion()) {
            this.showError('Please fill in this field');
            return;
        }
        
        // Save last question data
        this.saveCurrentQuestion();
        
        // Check honeypot
        const honeypot = this.form.querySelector('input[name="website"]');
        if (honeypot.value) {
            // Honeypot filled - likely a bot
            console.warn('Honeypot field filled - spam detected');
            // Still show success to confuse bots
            this.showSuccess();
            return;
        }
        
        // Show loading state
        this.submitButton.disabled = true;
        this.submitButton.innerHTML = '<span class="loading-spinner"></span>Submitting...';
        this.isSubmitting = true;
        
        try {
            // Submit form
            const response = await this.submitForm();
            
            if (response.ok) {
                // Success
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
        const payload = {
            ...this.formData,
            submission_date: new Date().toISOString(),
            page_url: window.location.href
        };
        
        try {
            const response = await fetch('/api/cosmetic-clinic-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });
            
            return response;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    
    resetSubmitButton() {
        this.submitButton.disabled = false;
        this.submitButton.innerHTML = 'Submit Assessment';
        this.isSubmitting = false;
    }
    
    showSuccess() {
        // Hide form section
        this.formSection.style.display = 'none';
        
        // Show success section
        this.successSection.style.display = 'block';
        
        // Initialize Calendly widget
        this.initCalendly();
        
        // Scroll to success section
        setTimeout(() => {
            this.successSection.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    }
    
    initCalendly() {
        // Initialize Calendly embed
        if (window.Calendly) {
            window.Calendly.initInlineWidget({
                url: 'https://calendly.com/dylan-ryderwebsolutions/30min',
                parentElement: document.getElementById('calendly-container'),
                prefill: {
                    name: this.formData.your_name || '',
                    email: this.formData.work_email || ''
                }
            });
        }
        
        // Set up button fallback
        const calendlyButton = document.getElementById('calendly-button');
        if (calendlyButton) {
            calendlyButton.addEventListener('click', () => {
                // Open Calendly in new window
                window.open('https://calendly.com/dylan-ryderwebsolutions/30min', '_blank');
            });
        }
    }
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const form = new MultiStepForm();
    
    // Hero CTA button scroll functionality
    const scrollButtons = document.querySelectorAll('[data-scroll-to]');
    scrollButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetId = button.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Smooth scroll behavior for hash navigation
window.addEventListener('hashchange', () => {
    const element = document.querySelector(window.location.hash);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
});

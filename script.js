document.addEventListener('DOMContentLoaded', function () {
  // Show current time in ms if element exists
  const timeEl = document.getElementById('time');
  if (timeEl) {
    const updateTime = () => { timeEl.textContent = String(Date.now()); };
    updateTime();
    setInterval(updateTime, 1000);
  }

  // Contact form validation and submission handling
  const form = document.getElementById('contact-form');
  if (!form) return;

  const els = {
    name: form.querySelector('#contact-name'),
    email: form.querySelector('#contact-email'),
    subject: form.querySelector('#contact-subject'),
    message: form.querySelector('#contact-message'),
    success: document.getElementById('contact-success'),
    errors: {
      name: document.getElementById('contact-error-name'),
      email: document.getElementById('contact-error-email'),
      subject: document.getElementById('contact-error-subject'),
      message: document.getElementById('contact-error-message'),
    }
  };

  function clearErrors() {
    Object.values(els.errors).forEach(e => { if (e) e.textContent = ''; });
    if (els.success) els.success.hidden = true;
  }

  function validate() {
    clearErrors();
    let valid = true;

    if (!els.name.value.trim()) {
      els.errors.name.textContent = 'Full name is required.';
      els.name.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      els.name.removeAttribute('aria-invalid');
    }

    const emailVal = els.email.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      els.errors.email.textContent = 'Email is required.';
      els.email.setAttribute('aria-invalid', 'true');
      valid = false;
    } else if (!emailRe.test(emailVal)) {
      els.errors.email.textContent = 'Enter a valid email (name@example.com).';
      els.email.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      els.email.removeAttribute('aria-invalid');
    }

    if (!els.subject.value.trim()) {
      els.errors.subject.textContent = 'Subject is required.';
      els.subject.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      els.subject.removeAttribute('aria-invalid');
    }

    const msg = els.message.value.trim();
    if (!msg) {
      els.errors.message.textContent = 'Message is required.';
      els.message.setAttribute('aria-invalid', 'true');
      valid = false;
    } else if (msg.length < 10) {
      els.errors.message.textContent = 'Message must be at least 10 characters.';
      els.message.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      els.message.removeAttribute('aria-invalid');
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (validate()) {
      // on success: show success message and reset form
      if (els.success) {
        els.success.hidden = false;
      }
      form.reset();
      // move focus to success message for screen readers
      if (els.success) els.success.focus();
    }
  });

  // Live validation on blur for better UX
  ['name','email','subject','message'].forEach(field => {
    const input = els[field];
    if (!input) return;
    input.addEventListener('blur', validate);
  });
});

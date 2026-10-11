/* ==========================================
   NMIT REDESIGN - ADMISSIONS ENQUIRY FORM
   ========================================== */

const FormModule = (function() {
  function init() {
    setupEnquiryForm();
    setupWhatsAppButton();
  }

  function setupEnquiryForm() {
    const form = document.getElementById('admissions-enquiry-form');
    if (!form) return;

    const fields = form.querySelectorAll('input, select');

    fields.forEach(field => {
      field.addEventListener('blur', () => {
        validateField(field);
      });

      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      fields.forEach(field => {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        const name = form.querySelector('#field-name').value.trim();
        const phone = form.querySelector('#field-phone').value.trim();
        const email = form.querySelector('#field-email').value.trim();
        const course = form.querySelector('#field-course').value;
        const city = form.querySelector('#field-city').value.trim();
        const state = form.querySelector('#field-state').value.trim();

        // Build mailto URL
        const subject = encodeURIComponent(`Admissions Enquiry 2026-27: ${name} (${course})`);
        const body = encodeURIComponent(
          `Admissions Enquiry Details:\n\n` +
          `Name: ${name}\n` +
          `Phone: ${phone}\n` +
          `Email: ${email}\n` +
          `Course of Interest: ${course}\n` +
          `City: ${city}\n` +
          `State: ${state}\n\n` +
          `Submitted via NMIT Redesign Portal.`
        );

        const mailtoUrl = `mailto:admissions.nmit@nitte.edu.in?subject=${subject}&body=${body}`;

        showToast('Opening your email app with your enquiry...');
        
        setTimeout(() => {
          window.location.href = mailtoUrl;
        }, 1200);

        form.reset();
        clearErrors(form);
      }
    });
  }

  function validateField(field) {
    const val = field.value.trim();
    let isValid = true;

    if (field.hasAttribute('required') && !val) {
      isValid = false;
    } else if (field.type === 'tel') {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(val)) isValid = false;
    } else if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) isValid = false;
    }

    if (!isValid) {
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.setAttribute('aria-invalid', 'false');
    }

    return isValid;
  }

  function clearErrors(form) {
    form.querySelectorAll('[aria-invalid="true"]').forEach(el => {
      el.setAttribute('aria-invalid', 'false');
    });
  }

  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;

    const msgSpan = toast.querySelector('.toast-msg');
    if (msgSpan) msgSpan.textContent = message;

    toast.classList.add('is-show');

    setTimeout(() => {
      toast.classList.remove('is-show');
    }, 4500);
  }

  function setupWhatsAppButton() {
    const waBtn = document.getElementById('whatsapp-enquiry-btn');
    const form = document.getElementById('admissions-enquiry-form');

    if (!waBtn || !form) return;

    waBtn.addEventListener('click', () => {
      const name = form.querySelector('#field-name').value.trim() || 'Student';
      const course = form.querySelector('#field-course').value || 'B.Tech Program';
      const city = form.querySelector('#field-city').value.trim() || 'Bengaluru';

      const text = encodeURIComponent(`Hello NMIT Admissions Team! My name is ${name}. I am interested in inquiring about ${course} from ${city}.`);
      window.open(`https://wa.me/918147354951?text=${text}`, '_blank', 'noopener,noreferrer');
    });
  }

  return { init, showToast };
})();

document.addEventListener('DOMContentLoaded', FormModule.init);

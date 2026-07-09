const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const isOpen = siteNav.classList.toggle('is-open');
		navToggle.setAttribute('aria-expanded', String(isOpen));
	});

	siteNav.addEventListener('click', (event) => {
		const target = event.target;

		if (target instanceof HTMLAnchorElement && siteNav.classList.contains('is-open')) {
			siteNav.classList.remove('is-open');
			navToggle.setAttribute('aria-expanded', 'false');
		}
	});
}

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm instanceof HTMLFormElement) {
	contactForm.addEventListener('submit', (event) => {
		event.preventDefault();

		if (!contactForm.checkValidity()) {
			contactForm.reportValidity();
			return;
		}

		const nameInput = contactForm.querySelector('#contact-name');
		const emailInput = contactForm.querySelector('#contact-email');
		const phoneInput = contactForm.querySelector('#contact-phone');
		const messageInput = contactForm.querySelector('#contact-message');

		const name = nameInput instanceof HTMLInputElement ? nameInput.value.trim() : '';
		const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : '';
		const phone = phoneInput instanceof HTMLInputElement ? phoneInput.value.trim() : '';
		const message = messageInput instanceof HTMLTextAreaElement ? messageInput.value.trim() : '';

		const subject = encodeURIComponent('Solicitud de primera cita');
		const body = encodeURIComponent(
			'Nombre: ' + name + '\n' +
			'Email: ' + email + '\n' +
			'Telefono: ' + phone + '\n\n' +
			'Mensaje:\n' + message
		);

		window.location.href = 'mailto:armoniaplenaguzman@gmail.com?subject=' + subject + '&body=' + body;
	});
}

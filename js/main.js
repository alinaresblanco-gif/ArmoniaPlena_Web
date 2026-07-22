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

const accordions = document.querySelectorAll('[data-accordion]');

if (accordions.length > 0) {
	const setupAccordion = (accordion) => {
		const items = Array.from(accordion.querySelectorAll('.service-accordion-item'));

		const setItemState = (item, shouldOpen) => {
			const trigger = item.querySelector('.service-accordion-trigger');
			const panel = item.querySelector('.service-accordion-panel');

			if (!(trigger instanceof HTMLButtonElement) || !(panel instanceof HTMLElement)) {
				return;
			}

			item.classList.toggle('is-open', shouldOpen);
			trigger.setAttribute('aria-expanded', String(shouldOpen));
			panel.setAttribute('aria-hidden', String(!shouldOpen));
			panel.style.maxHeight = shouldOpen ? panel.scrollHeight + 'px' : '0px';
		};

		let hasOpenItem = false;

		items.forEach((item) => {
			const trigger = item.querySelector('.service-accordion-trigger');
			const isOpen = item.classList.contains('is-open');

			if (isOpen && !hasOpenItem) {
				hasOpenItem = true;
				setItemState(item, true);
			} else {
				setItemState(item, false);
			}

			if (!(trigger instanceof HTMLButtonElement)) {
				return;
			}

			trigger.addEventListener('click', () => {
				const alreadyOpen = item.classList.contains('is-open');

				items.forEach((otherItem) => {
					setItemState(otherItem, false);
				});

				if (!alreadyOpen) {
					setItemState(item, true);
				}
			});
		});

		window.addEventListener('resize', () => {
			items.forEach((item) => {
				if (item.classList.contains('is-open')) {
					setItemState(item, true);
				}
			});
		});
	};

	accordions.forEach((accordion) => {
		if (accordion instanceof HTMLElement) {
			setupAccordion(accordion);
		}
	});
}

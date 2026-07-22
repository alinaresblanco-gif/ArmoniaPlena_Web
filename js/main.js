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

const syncOpenAccordionHeights = () => {
	const openPanels = document.querySelectorAll('.service-accordion-item.is-open .service-accordion-panel');

	openPanels.forEach((panel) => {
		if (panel instanceof HTMLElement) {
			panel.style.maxHeight = panel.scrollHeight + 'px';
		}
	});
};

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

			syncOpenAccordionHeights();
		});
	};

	accordions.forEach((accordion) => {
		if (accordion instanceof HTMLElement) {
			setupAccordion(accordion);
		}
	});
}

const specialtyButtons = document.querySelectorAll('[data-specialty-button]');
const specialtyModal = document.querySelector('[data-specialty-modal]');
const specialtyModalTitle = document.querySelector('[data-specialty-title]');
const specialtyModalDescription = document.querySelector('[data-specialty-description]');
const specialtyWhatsappLink = document.querySelector('[data-specialty-whatsapp]');
const specialtyCloseButtons = document.querySelectorAll('[data-specialty-close]');

if (
	specialtyButtons.length > 0 &&
	specialtyModal instanceof HTMLElement &&
	specialtyModalTitle instanceof HTMLElement &&
	specialtyModalDescription instanceof HTMLElement &&
	specialtyWhatsappLink instanceof HTMLAnchorElement
) {
	let lastFocusedElement = null;

	const closeSpecialtyModal = () => {
		specialtyModal.hidden = true;
		document.body.classList.remove('modal-open');
		document.body.style.paddingRight = '';
		syncOpenAccordionHeights();

		if (lastFocusedElement instanceof HTMLElement) {
			lastFocusedElement.focus();
		}
	};

	const openSpecialtyModal = (button) => {
		const specialtyTitle = button.getAttribute('data-specialty-title') || 'Especialidad';
		const specialtyDescription = button.getAttribute('data-specialty-description') || 'Especialidad terapéutica personalizada.';
		const whatsappMessage = 'Me gustaría recibir información detallada de la especialidad: "' + specialtyTitle + '"';

		specialtyModalTitle.textContent = specialtyTitle;
		specialtyModalDescription.textContent = specialtyDescription;
		specialtyWhatsappLink.href = 'https://wa.me/34627739587?text=' + encodeURIComponent(whatsappMessage);

		lastFocusedElement = button;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		document.body.style.paddingRight = scrollbarWidth > 0 ? scrollbarWidth + 'px' : '';
		specialtyModal.hidden = false;
		document.body.classList.add('modal-open');
		syncOpenAccordionHeights();
	};

	specialtyButtons.forEach((button) => {
		if (button instanceof HTMLButtonElement) {
			button.addEventListener('click', () => {
				openSpecialtyModal(button);
			});
		}
	});

	specialtyCloseButtons.forEach((closeButton) => {
		if (closeButton instanceof HTMLElement) {
			closeButton.addEventListener('click', closeSpecialtyModal);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !specialtyModal.hidden) {
			closeSpecialtyModal();
		}
	});
}

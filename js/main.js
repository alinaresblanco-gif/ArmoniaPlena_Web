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

document.addEventListener('DOMContentLoaded', () => {
	// --- Dark Mode Toggle ---
	const themeToggle = document.getElementById('theme-toggle');
	const htmlElement = document.documentElement;
	const icon = themeToggle.querySelector('i');

	// Check for saved user preference
	const savedTheme = localStorage.getItem('theme');
	const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

	if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
		htmlElement.setAttribute('data-theme', 'dark');
		icon.classList.remove('fa-moon');
		icon.classList.add('fa-sun');
	}

	themeToggle.addEventListener('click', () => {
		const currentTheme = htmlElement.getAttribute('data-theme');
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

		htmlElement.setAttribute('data-theme', newTheme);
		localStorage.setItem('theme', newTheme);

		// Toggle icon
		if (newTheme === 'dark') {
			icon.classList.remove('fa-moon');
			icon.classList.add('fa-sun');
		} else {
			icon.classList.remove('fa-sun');
			icon.classList.add('fa-moon');
		}
	});

	// --- Scroll Animations (Intersection Observer) ---
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px"
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('active');
				observer.unobserve(entry.target); // Only animate once
			}
		});
	}, observerOptions);

	const revealElements = document.querySelectorAll('.reveal');
	revealElements.forEach(el => observer.observe(el));

	// --- Mobile Menu Toggle ---
	const menuToggle = document.querySelector('.menu-toggle');
	const navLinks = document.querySelector('.nav-links');
	const navLinksItems = document.querySelectorAll('.nav-link');

	if (menuToggle) {
		menuToggle.addEventListener('click', () => {
			navLinks.classList.toggle('active');

			// Change icon
			const menuIcon = menuToggle.querySelector('i');
			if (navLinks.classList.contains('active')) {
				menuIcon.classList.remove('fa-bars');
				menuIcon.classList.add('fa-times');
			} else {
				menuIcon.classList.remove('fa-times');
				menuIcon.classList.add('fa-bars');
			}
		});
	}

	// Close mobile menu when clicking a link
	navLinksItems.forEach(link => {
		link.addEventListener('click', () => {
			if (navLinks.classList.contains('active')) {
				navLinks.classList.remove('active');
				const menuIcon = menuToggle.querySelector('i');
				menuIcon.classList.remove('fa-times');
				menuIcon.classList.add('fa-bars');
			}
		});
	});

	// --- Smooth Scrolling ---
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			if (targetId === '#') return;

			const targetElement = document.querySelector(targetId);
			if (targetElement) {
				// Account for fixed header
				const headerOffset = 80;
				const elementPosition = targetElement.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: "smooth"
				});
			}
		});
	});

	// --- Active Link Highlighting ---
	const sections = document.querySelectorAll('section');

	window.addEventListener('scroll', () => {
		let current = '';
		const scrollY = window.scrollY;

		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;

			if (scrollY >= (sectionTop - 300)) {
				current = section.getAttribute('id');
			}
		});

		navLinksItems.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href').includes(current)) {
				link.classList.add('active');
			}
		});
	});
	// --- Dynamic Year in Footer ---
	const yearSpan = document.getElementById('current-year');
	if (yearSpan) {
		yearSpan.textContent = new Date().getFullYear();
	}
});

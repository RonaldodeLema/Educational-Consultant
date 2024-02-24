import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as bootstrap from 'bootstrap';

import { useAuth } from '../../hooks/useAuth';

export const Navigation = () => {
	const navbarRef = useRef(null);
	const navbarTogglerRef = useRef(null);
	const { user } = useAuth();
	console.log(typeof user);

	useEffect(() => {
		const navbarShrink = () => {
			const navbarCollapsible = navbarRef.current;
			if (!navbarCollapsible) {
				return;
			}
			if (window.scrollY === 0) {
				navbarCollapsible.classList.remove('navbar-shrink');
			} else {
				navbarCollapsible.classList.add('navbar-shrink');
			}
		};
		navbarShrink();
		document.addEventListener('scroll', navbarShrink);
		new bootstrap.ScrollSpy(document.body, {
			target: '#mainNav',
			rootMargin: '0px 0px -40%',
		});
		const navbarToggler = navbarTogglerRef.current;
		const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
		responsiveNavItems.forEach((responsiveNavItem) => {
			responsiveNavItem.addEventListener('click', () => {
				if (window.getComputedStyle(navbarToggler).display !== 'none') {
					navbarToggler.click();
				}
			});
		});
		return () => {
			document.removeEventListener('scroll', navbarShrink);
		};
	}, []);

	return (
		<nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav" ref={navbarRef}>
			<div className="container">
				<a className="navbar-brand" href="#root">
					<img src="/images/navbar-logo.svg" alt="" />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarResponsive"
					aria-controls="navbarResponsive"
					aria-expanded="false"
					aria-label="Toggle navigation"
					ref={navbarTogglerRef}
				>
					Menu
					<i className="fas fa-bars ms-1" />
				</button>
				<div className="collapse navbar-collapse" id="navbarResponsive">
					<ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
						<li className="nav-item">
							<a className="nav-link" href="#services">
								Services
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#portfolio">
								Portfolio
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#about">
								About
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#team">
								Team
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#contact">
								Contact
							</a>
						</li>

						{user === null ? (
							<li className="nav-item">
								<Link to={'/signin'}>
									<button className="btn btn-outline-light btn-login">Đăng nhập</button>
								</Link>
							</li>
						) : (
							<Link to={'/user/details'}>
								<img
									src="https://bootdey.com/img/Content/avatar/avatar6.png"
									alt="Admin"
									className="rounded-circle p-1 bg-primary"
									width="40"
								/>
							</Link>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

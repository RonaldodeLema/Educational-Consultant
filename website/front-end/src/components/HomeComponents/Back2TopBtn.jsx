import React, { useState, useEffect } from 'react';

const Back2TopBtn = () => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	const scrollToTop = () => {
		window.scrollTo(
			{
				top: 0,
				behavior: 'smooth',
			},
			{ passive: true },
		);
	};

	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility, { passive: true });
		return () => window.removeEventListener('scroll', toggleVisibility, { passive: true });
	}, []);

	return (
		<>
			{isVisible && (
				<a
					onClick={scrollToTop}
					className={`btn btn-lg btn-primary btn-lg-square back-to-top ${isVisible ? 'show' : ''}`}
				>
					<i className="bi bi-arrow-up" />
				</a>
			)}
		</>
	);
};

export default Back2TopBtn;

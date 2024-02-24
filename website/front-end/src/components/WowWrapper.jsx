import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import WOW from 'wowjs';

const WowWrapper = ({ children }) => {
	const location = useLocation();

	useEffect(() => {
		const wow = new WOW.WOW({ live: false });
		wow.init();

		const observer = new MutationObserver((mutationsList, observer) => {
			// If new nodes are added, re-initialize WOW.js
			for (const mutation of mutationsList) {
				if (mutation.type === 'childList') {
					wow.sync();
				}
			}
		});

		// Start observing the document with the configured parameters
		observer.observe(document, { childList: true, subtree: true });

		return () => {
			wow.sync();
			observer.disconnect();
		};
	}, [location]);

	return <>{children}</>;
};

export default WowWrapper;

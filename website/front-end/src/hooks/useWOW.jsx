import { useEffect } from 'react';
import WOW from 'wowjs';

const useWOW = () => {
	useEffect(() => {
		const wow = new WOW.WOW({ live: false });
		wow.init();
		return () => wow.sync();
	}, []);
};

export default useWOW;

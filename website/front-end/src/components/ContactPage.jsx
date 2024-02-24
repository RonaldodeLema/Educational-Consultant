import Navigation from './HomeComponents/Navigation';
import Header from './Partials/Header';
import Contact from './Contact';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';

import useWOW from '../hooks/useWOW';

const ContactPage = ({ fixedData }) => {
	useWOW;

	return (
		<>
			<Navigation data={fixedData.Header} />
			<Header currentPath={'/contact'} currentTitle={'Contact'} headerTitle={'Liên hệ'} />
			<Contact />
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default ContactPage;

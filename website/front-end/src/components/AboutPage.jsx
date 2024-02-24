import Header from './Partials/Header';
import Navigation from './HomeComponents/Navigation';
import Services from './HomeComponents/Services';
import About from './HomeComponents/About';
import Team from './HomeComponents/Team';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';

import useWOW from '../hooks/useWOW';

const AboutPage = ({ fixedData }) => {
	useWOW();
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Header currentPath={'/about'} currentTitle={'About'} headerTitle={'Về chúng tôi'} />
			<Services data={fixedData.Services} />
			<About data={fixedData.About} />
			<Team data={fixedData.Team} />
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default AboutPage;

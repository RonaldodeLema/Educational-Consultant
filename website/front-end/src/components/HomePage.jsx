import Navigation from './HomeComponents/Navigation';
import Carousel from './HomeComponents/Carousel';
import Services from './HomeComponents/Services';
import About from './HomeComponents/About';
import Categories from './HomeComponents/Categories';
import Courses from './HomeComponents/Courses';
import Team from './HomeComponents/Team';
import Testimonial from './HomeComponents/Testimonial';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';

import useWOW from '../hooks/useWOW';

const HomePage = ({ fixedData }) => {
	useWOW();
	
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Carousel data={fixedData.Carousel} />
			<Services data={fixedData.Services} />
			<About data={fixedData.About} />
			<Categories data={fixedData.Categories} />
			<Courses data={fixedData.Courses} />
			<Team data={fixedData.Team} />
			<Testimonial data={fixedData.Testimonial} />
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default HomePage;

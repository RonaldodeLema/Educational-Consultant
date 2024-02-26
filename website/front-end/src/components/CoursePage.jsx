import Header from './Partials/Header';
import Navigation from './HomeComponents/Navigation';
import Categories from './HomeComponents/Categories';
import Courses from './HomeComponents/Courses';
import Testimonial from './HomeComponents/Testimonial';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';

import useWOW from '../hooks/useWOW';
import useAutoTopPage from '../hooks/useAutoTopPage';
const CoursePage = ({ fixedData }) => {
	useWOW();
	useAutoTopPage();
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Header currentPath={'/courses'} currentTitle={'Courses'} headerTitle={'Các khóa học'} />
			<Categories data={fixedData.Categories} />
			<Courses data={fixedData.Courses} />
			<Testimonial data={fixedData.Testimonial} />
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default CoursePage;

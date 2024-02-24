import Navigation from './HomeComponents/Navigation';
import Header from './Partials/Header';
import Testimonial from './HomeComponents/Testimonial';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';

import useWOW from '../hooks/useWOW';

const TestimonialPage = ({ fixedData }) => {
	useWOW();

	return (
		<>
			<Navigation data={fixedData.Header} />
			<Header
				currentPath={['/pages', '/testimonial']}
				currentTitle={['Page', 'Testimonial']}
				headerTitle={'Nhận xét'}
			/>
			<Testimonial data={fixedData.Testimonial} />
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default TestimonialPage;

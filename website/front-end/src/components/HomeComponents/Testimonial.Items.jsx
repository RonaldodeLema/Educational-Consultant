import OwlCarousel from 'react-owl-carousel';
import Item from './Testimonial.Item';

const Items = ({ data }) => {
	const options = {
		autoplay: true,
		smartSpeed: 1000,
		center: true,
		margin: 24,
		dots: true,
		loop: true,
		nav: false,
		responsive: {
			0: {
				items: 1,
			},
			768: {
				items: 2,
			},
			992: {
				items: 3,
			},
		},
	};

	return (
		<OwlCarousel className="owl-theme owl-carousel testimonial-carousel position-relative" {...options}>
			{data.map((d, i) => (
				<Item d={d} key={i} />
			))}
		</OwlCarousel>
	);
};

export default Items;

import OwlCarousel from 'react-owl-carousel';
import CarouselItem from './CarouselItem';

const Carousel = (props) => {
	const options = {
		autoplay: true,
		smartSpeed: 1500,
		items: 1,
		dots: false,
		loop: true,
		nav: true,
		navText: ['<i class="bi bi-chevron-left"></i>', '<i class="bi bi-chevron-right"></i>'],
	};


	return (
		<div className="container-fluid p-0 mb-5">
			<OwlCarousel className="owl-theme header-carousel position-relative" {...options}>
				{props.data
					? props.data?.map((carousel, index) => <CarouselItem key={index} Carousel={carousel} />)
					: 'Loading...'}
			</OwlCarousel>
		</div>
	);
};

export default Carousel;

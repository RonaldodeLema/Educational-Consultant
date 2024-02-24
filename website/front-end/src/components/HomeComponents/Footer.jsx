import FirstContainer from './Footer.FirstContainer';
import SecondContainer from './Footer.SecondContainer';

const Footer = ({ data }) => {
	return (
		<div
			className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
			data-wow-delay={data.dataWowDelay}
		>
			{data.FirstContainer ? <FirstContainer data={data.FirstContainer} /> : 'Loading...'}
			{data.SecondContainer ? <SecondContainer data={data.SecondContainer} /> : 'Loading...'}
		</div>
	);
};

export default Footer;

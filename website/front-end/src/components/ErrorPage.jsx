import Navigation from './HomeComponents/Navigation';
import Body from './Error.Body';
import Footer from './HomeComponents/Footer';

import useWOW from '../hooks/useWOW';

const ErrorPage = ({ fixedData }) => {
	useWOW();

	return (
		<>
			<Navigation data={fixedData.Header} />
			<Body />
			<Footer data={fixedData.Footer} />
		</>
	);
};

export default ErrorPage;

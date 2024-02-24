import { Link } from 'react-router-dom';
import Scroll2EleWithId from './../Scroll2EleWithId';

const SecondContainer = ({ data }) => {
	return (
		<div className="container">
			<div className="copyright">
				<div className="row">
					<div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
						&copy;
						<Link to={'/'} className="border-bottom">
							{data.dns}
						</Link>
					</div>
					<div className="col-md-6 text-center text-md-end">
						<div className="footer-menu">
							{data.menus
								? data.menus.map((name, i) => (
										<a key={i} onClick={() => Scroll2EleWithId('root')}>
											{name}
										</a>
								  ))
								: 'Loading...'}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecondContainer;

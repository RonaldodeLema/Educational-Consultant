import UserDetailsLeftSide from './User.Details.LeftSide';
import UserDetailsRightSide from './User.Details.RightSide';
import { Link } from 'react-router-dom';

export const Details = () => {
	return (
		<section>
			<nav
				className="navbar navbar-expand-lg navbar-dark fixed-top"
				id="mainNav"
				style={{ backgroundColor: '#212529' }}
			>
				<div className="container">
					<Link to={'/'}>
							<img src="/images/navbar-logo.svg" alt="" />
					</Link>
				</div>
			</nav>
			<div className="container">
				<div className="main-body">
					<div className="row">
						<UserDetailsLeftSide />
						<UserDetailsRightSide />
					</div>
				</div>
			</div>
		</section>
	);
};

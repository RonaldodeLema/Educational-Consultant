import { Link } from 'react-router-dom';

const Header = ({ currentPath, currentTitle, headerTitle }) => {
	return (
		<div className="container-fluid bg-primary py-5 mb-5 page-header">
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-lg-10 text-center">
						<h1 className="display-3 text-white animated slideInDown">{headerTitle}</h1>
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb justify-content-center">
								<li className="breadcrumb-item">
									<Link to={'/'} className="text-white">
										Home
									</Link>
								</li>
								{(Array.isArray(currentPath) ? currentPath : [currentPath])
									.reduce((acc, path, index) => {
										const newPath = `${acc.length > 0 ? acc[index - 1] : ''}${path}`;
										acc.push(newPath);
										return acc;
									}, [])
									.map((path, index) => (
										<li key={index} className="breadcrumb-item">
											<Link to={path} className="text-white">
												{Array.isArray(currentTitle) ? currentTitle[index] : currentTitle}
											</Link>
										</li>
									))}
							</ol>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;

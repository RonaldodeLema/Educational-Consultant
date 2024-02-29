import { Link } from 'react-router-dom';

export const Error = ({ errCode, errMsg, errStack }) => {
	return (
		<section className="error-page">
			<div className="main">
				<h1>
					{errCode}: {errMsg}
				</h1>
				<h5>{errStack}</h5>
				<Link to={'/'}>
					<button type="button" className="btn btn-outline-secondary mt-5">
						Quay về trang chủ
					</button>
				</Link>
			</div>
		</section>
	);
};

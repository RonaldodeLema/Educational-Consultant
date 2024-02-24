import { Link } from 'react-router-dom';

const Body = () => {
	return (
		<div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
			<div className="container text-center">
				<div className="row justify-content-center">
					<div className="col-lg-6">
						<i className="bi bi-exclamation-triangle display-1 text-primary" />
						<h1 className="display-1">404</h1>
						<h1 className="mb-4">Không tìm thấy trang này</h1>
						<p className="mb-4">Rất tiếc, trang bạn tìm kiếm không tồn tại trên trang web của chúng tôi!</p>
						<Link to={'/'} className="btn btn-primary rounded-pill py-3 px-5">
							{' '}
							Trang chủ
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Body;

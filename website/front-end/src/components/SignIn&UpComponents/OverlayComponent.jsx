import { Link } from 'react-router-dom';

export const OverlayComponent = ({ isLoginPage, data }) => {
	return (
		<div className="overlay-container" style={isLoginPage ? {} : { left: '0%' }}>
			<div className="overlay">
				<div className="overlay-panel overlay-right">
					<h1 style={{ color: 'white' }}>{data.title}</h1>
					<p>
						<i>
							{isLoginPage ? (
								<>
									Chưa có tài khoản ? <Link to="/signup">Đăng ký</Link>
								</>
							) : (
								<>
									Đã có tài khoản ?{' '}
									<Link to="/signin">
										<i>Đăng nhập</i>{' '}
									</Link>
								</>
							)}
						</i>
					</p>
				</div>
			</div>
		</div>
	);
};

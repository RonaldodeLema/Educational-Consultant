import { Link } from 'react-router-dom';

export const OverlayComponent = ({ isLoginPage }) => {
	return (
		<div className="overlay-container" style={isLoginPage ? {} : { left: '0%' }}>
			<div className="overlay">
				<div className="overlay-panel overlay-right">
					<h1>Web name</h1>
					<p>Describe text.</p>
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

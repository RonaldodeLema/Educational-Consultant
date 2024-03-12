import makeAxiosReq from '../../apis/makeAxiosReq';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpBodyForm } from './SignUpBodyForm';
import { OverlayComponent } from './OverlayComponent';
import Navigation from '../HomeComponents/Navigation';
import Footer from '../HomeComponents/Footer';

export const SignUp = ({ fixedData }) => {
	const [error, setError] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (username.trim() === '' || password.trim() === '' || repassword.trim() === '') {
			return setError('Vui lòng điền tất cả các ô!');
		}
		if (password.trim() !== repassword.trim()) {
			setPassword('');
			setRepassword('');
			return setError('Xác nhận mật khẩu và mật khẩu không khớp!');
		}
		const signUpObj = { username: username.trim(), password: password.trim() };
		await makeAxiosReq
			.post('/register', signUpObj)
			.then(
				(res) =>
					res.data.ok &&
					navigate('/signin', {
						state: { alert: { msg: 'Đăng ký tài khoản thành công', type: 'success' } },
					}),
			)
			.catch((err) => {
				return setError(err.response.data.message);
			});
	};

	return (
		<>
			<Navigation data={fixedData.Header} />
			<section className="signin-page">
				<div className="container" id="container">
					<div className="form-container log-in-container" style={{ left: '50%' }}>
						<form onSubmit={handleSubmit}>
							<h1 style={{ marginBottom: '4rem' }}>Đăng ký</h1>
							<SignUpBodyForm
								setUsername={setUsername}
								password={password}
								setPassword={setPassword}
								repassword={repassword}
								setRepassword={setRepassword}
								error={error}
							/>
						</form>
					</div>
					<OverlayComponent isLoginPage={false} data={fixedData.Header} />
				</div>
			</section>
			<Footer data={fixedData.Footer} />
		</>
	);
};

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
			setError('Vui lòng điền tất cả các ô!');
			return;
		}

		if (password.trim() !== repassword.trim()) {
			setPassword('');
			setRepassword('');
			setError('Xác nhận mật khẩu và mật khẩu không khớp!');
			return;
		}
		// add the other logics & your sign up logic here.

		const signUpObj = { username: username.trim(), password: password.trim() };
		await makeAxiosReq
			.post('/users', signUpObj)
			.then((res) => res.status === 201 && navigate('/signin'))
			.catch((err) => console.error(err));
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

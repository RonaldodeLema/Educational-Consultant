import makeAxiosReq from '../../apis/makeAxiosReq';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navigation from '../HomeComponents/Navigation';
import Footer from '../HomeComponents/Footer';
import { SocialContainer } from './SocialContainer';
import { SignInBodyForm } from './SignInBodyForm';
import { OverlayComponent } from './OverlayComponent';
import { useAuth } from '../../hooks/useAuth';

export const SignIn = ({ fixedData }) => {
	const [error, setError] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (username.trim() === '' || password.trim() === '')
			return setError('Tài khoản hoặc mật khẩu không được để trống!');
		const signInObj = { username: username.trim(), password: password.trim() };
		// const match = testDatas.some((user) => user.username === username.trim());
		// if (!match) return setError('Tài khoản hoặc mật khẩu không đúng!');
		await makeAxiosReq
			.post('/login', signInObj)
			.then(async (res) => res.data.ok && login(res.data.user))
			.catch((err) => {
				// if (err.response && err.response.status === 404) {
				// 	err.code && setErrorCode(err.response.status);
				// 	err.name && setErrorStack(err.response.statusText);
				// 	err.message && setErrorMessage(err.response.data.message);
				// } else {
				// 	console.error(err);
				// }
				navigate('/error');
			});
	};

	return (
		<>
			<Navigation data={fixedData.Header} />
			<section className="signin-page">
				<div className="container" id="container">
					<div className="form-container log-in-container">
						<form onSubmit={handleSubmit}>
							<h1>Đăng nhập</h1>
							<SocialContainer />
							<SignInBodyForm setUsername={setUsername} setPassword={setPassword} error={error} />
						</form>
					</div>
					<OverlayComponent isLoginPage={true} data={fixedData.Header} />
				</div>
			</section>
			<Footer data={fixedData.Footer} />
		</>
	);
};
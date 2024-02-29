import makeAxiosReq from '../../apis/makeAxiosReq';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAlert } from 'react-alert';

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

	const alert = useAlert();
	const navigate = useNavigate();
	const location = useLocation();

	const msg = location.state?.alert?.msg;
	const type = location.state?.alert?.type;

	useEffect(() => {
		if (msg && type) {
			alert.show(msg, { type });
		}
		navigate(location.pathname, { replace: true, state: {} });
	}, [msg, type, alert]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (username.trim() === '' || password.trim() === '')
			return setError('Tài khoản hoặc mật khẩu không được để trống!');
		const signInObj = { username: username.trim(), password: password.trim() };
		await makeAxiosReq
			.post('/login', signInObj)
			.then(async (res) => res.data.ok && login(res.data.user))
			.catch((err) => {
				if (err.response && err.response.status === 404) {
					return setError(err.response.data.message);
				}
				// navigate('/error');
			});
	};

	return (
		<>
			<Navigation data={fixedData.Header} />
			<section className="signin-page">
				<div className="container" id="container">
					<div className="form-container log-in-container">
						<form onSubmit={handleSubmit}>
							<h1 style={{ marginBottom: '4rem' }}>Đăng nhập</h1>
							{/* <SocialContainer /> */}
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

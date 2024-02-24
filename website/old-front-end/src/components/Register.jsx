import { useState } from 'react';
import makeAxiosReq from '../apis/makeAxiosReq';
import { useAlert } from 'react-alert';

import { useNavigate } from 'react-router-dom';

const Register = ({ setErrorMessage, setErrorCode, setErrorStack, setApiKey }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showRePassword, setShowRePassword] = useState(false);

	const handleTogglePassword = () => setShowPassword(!showPassword);
	const handleToggleshowRePassword = () => setShowRePassword(!showRePassword);

	const navigate = useNavigate();
	const alert = useAlert();

	const handleRegister = async (e) => {
		e.preventDefault();
		if (password !== repassword) alert.error(`Xác nhận lại mật khẩu và mật khẩu không khớp`);

		await makeAxiosReq
			.post('/register', { username, password })
			.then((res) => res.data.ok && navigate('/login'))
			.catch((err) => {
				if (!err.response) console.error(err);

				const errStatus = err.response.status;

				switch (errStatus) {
					case 404:
						err.code && setErrorCode(err.response.status);
						err.name && setErrorStack(err.response.statusText);
						err.message && setErrorMessage(err.response.data.message);
						break;
					case 409:
						alert.error(err.response.data.message);
						break;
					default:
						err.code && setErrorCode(err.response.status);
						err.name && setErrorStack(err.response.statusText);
						err.message && setErrorMessage(err.response.data.message);
						break;
				}

				if (errStatus !== 409) navigate('/error');
			});
	};

	return (
		<div className="loginform">
			<h2>Register Form</h2>
			<form onSubmit={handleRegister}>
				<input
					id="username"
					type="text"
					name="username"
					placeholder="Username (Tên tài khoản)"
					aria-label="username"
					autoFocus
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<div className="pwd-group">
					<input
						id="password"
						type={showPassword ? 'text' : 'password'}
						value={password}
						placeholder="Mật khẩu"
						aria-label="password"
						onChange={(e) => setPassword(e.target.value)}
						name="password"
					/>
					<span onClick={handleTogglePassword} className={showPassword ? '' : 'hidden-style'}>
						Hiện
					</span>
				</div>
				<div className="pwd-group">
					<input
						id="repassword"
						type={showRePassword ? 'text' : 'password'}
						value={repassword}
						placeholder="Xác nhận lại mật khẩu"
						aria-label="Xác nhận lại mật khẩu"
						onChange={(e) => setRepassword(e.target.value)}
						name="repassword"
					/>
					<span onClick={handleToggleshowRePassword} className={showRePassword ? '' : 'hidden-style'}>
						Hiện
					</span>
				</div>
				<input type="submit" name="login-btn" value="Đăng ký" aria-label="login-btn" />
			</form>
		</div>
	);
};

export default Register;

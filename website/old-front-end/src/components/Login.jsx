import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import makeAxiosReq from '../apis/makeAxiosReq';
import { useNavigate } from 'react-router-dom';

const Login = ({ setErrorMessage, setErrorCode, setErrorStack, setApiKey }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		await makeAxiosReq
			.post('/login', { username, password })
			.then(async (res) => res.data.ok && login(res.data.user))
			.catch((err) => {
				if (err.response && err.response.status === 404) {
					err.code && setErrorCode(err.response.status);
					err.name && setErrorStack(err.response.statusText);
					err.message && setErrorMessage(err.response.data.message);
				} else {
					// Handle other types of errors
					console.error(err);
				}

				navigate('/error');
			});
	};

	return (
		<div className="loginform">
			<h2>Login Form</h2>
			<form onSubmit={handleLogin}>
				<input
					id="username"
					type="text"
					name="username"
					placeholder="Username"
					aria-label="username"
					autoFocus
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					id="password"
					type="password"
					value={password}
					placeholder="Password"
					aria-label="password"
					onChange={(e) => setPassword(e.target.value)}
					name="password"
				/>
				<input type="submit" name="login-btn" value="Login" aria-label="login-btn" />
			</form>
		</div>
	);
};

export default Login;

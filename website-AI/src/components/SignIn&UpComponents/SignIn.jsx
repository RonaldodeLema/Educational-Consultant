import makeAxiosReq from '../../apis/makeAxiosReq';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { SocialContainer } from './SocialContainer';
import { SignInBodyForm } from './SignInBodyForm';
import { OverlayComponent } from './OverlayComponent';
import { useAuth } from '../../hooks/useAuth';

export const SignIn = ({ setUser }) => {
	const [error, setError] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { signin } = useAuth();

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (username.trim() === '' || password.trim() === '') {
		  setError('Tài khoản hoặc mật khẩu không được để trống!');
		  return;
		}
	
		try {
		  const response = await makeAxiosReq.post('/api/login', { username: username.trim(), password: password.trim() });
		  if (response.status === 200) {
			signin(response.data.user); 
			navigate('/');
		  } else {
			// Login failed
			setError('Tài khoản hoặc mật khẩu không đúng!');
		  }
		} catch (error) {
			console.log(error.response.status)
			if (error.response.status === 401){
				setError('Tài khoản hoặc mật khẩu không đúng!');
				}
			else{
				console.error(error);
				setError('Đã xảy ra lỗi. Vui lòng thử lại.');
			}
		}
	};

	return (
		<section className="signin-page">
			<div className="container" id="container">
				<div className="form-container log-in-container">
					<form onSubmit={handleSubmit}>
						<h1>Đăng nhập</h1>
						<SocialContainer />
						<SignInBodyForm setUsername={setUsername} setPassword={setPassword} error={error} />
					</form>
				</div>
				<OverlayComponent isLoginPage={true} />
			</div>
		</section>
	);
};

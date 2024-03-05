import { registerUser } from '../../apis/makeAxiosReq';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignUpBodyForm } from './SignUpBodyForm';
import { OverlayComponent } from './OverlayComponent';
import api from '../../apis/makeAxiosReq';

export const SignUp = () => {
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
		await api
			.post('/api/register', {
				username: username.trim(),
				password: password.trim(),
				repassword: repassword.trim(),
			})
			.then((res) => (res.status === 200 || res.statusText === 'OK') && navigate('/signin'))
			.catch((err) => {
				if (err.response.status === 400) {
					return setError(err.response.data.message);
				}
				return setError(`Oops! Đã có lỗi xảy ra!`);
			});
		// try {
		// 	// Call the registerUser function from your API module
		// 	const result = await registerUser(username.trim(), password.trim(), repassword.trim());
		// 	console.log(result);
		// 	// Check if the registration was successful
		// 	if (result.status === 200) {
		// 		navigate('/signin');
		// 	} else {
		// 		setError('Đăng ký không thành công. Vui lòng thử lại.');
		// 	}
		// } catch (error) {
		// 	setError('Đã xảy ra lỗi. Vui lòng thử lại.');
		// 	console.error(error);
		// }

		try {
			// Call the registerUser function from your API module
			const result = await registerUser(username.trim(), password.trim(), repassword.trim());
			console.log(result);
			// Check if the registration was successful
			if (result.status === 200) {
			  navigate('/signin');
			} else {
			  setError('Đăng ký không thành công. Vui lòng thử lại.');
			}
		  } catch (error) {
			setError('Đã xảy ra lỗi. Vui lòng thử lại.');
			console.error(error);
		  }
	};

	return (
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
				<OverlayComponent isLoginPage={false} />
			</div>
		</section>
	);
};

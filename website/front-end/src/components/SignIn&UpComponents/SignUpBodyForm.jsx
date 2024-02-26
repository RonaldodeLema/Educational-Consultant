import { useState } from 'react';

export const SignUpBodyForm = ({ setUsername, password, setPassword, repassword, setRepassword, error }) => {
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
		<>
			<label htmlFor="username" />
			<input
				id="username"
				type="text"
				className="username"
				placeholder="Tên tài khoản"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<label htmlFor="password" />
			<input
				id="password"
				type="password"
				className="password"
				placeholder="Mật khẩu"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<label htmlFor="repassword" />
			<input
				id="repassword"
				type="password"
				className="password"
				placeholder="Xác nhận mật khẩu"
				value={repassword}
				onChange={(e) => setRepassword(e.target.value)}
			/>
			{error && (
				<p
					className="text-danger m-0 mb-3"
					style={{ alignSelf: 'flex-start', textAlign: 'start', fontSize: '14px', marginBottom: '2rem' }}
				>
					<i>{error}</i>
				</p>
			)}
			<button className={`submitBtn`} {...(error ? {} : { style: { marginTop: '2rem' } })}>
				Đăng ký
			</button>
		</>
	);
};

import { Link } from 'react-router-dom';

export const SignInBodyForm = ({ setUsername, setPassword, error }) => {
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
				onChange={(e) => setPassword(e.target.value)}
				autoComplete="off"
			/>
			{error && (
				<p
					className="text-danger"
					style={{ alignSelf: 'flex-start', textAlign: 'start', fontSize: '14px', marginBottom: '2rem' }}
				>
					<i>{error}</i>
				</p>
			)}
			{/* <Link to="/">
				<span>Quên mật khẩu?</span>
			</Link> */}
			<button className={`submitBtn`} {...(error ? {} : { style: { marginTop: '2rem' } })}>
				Đăng nhập
			</button>
		</>
	);
};

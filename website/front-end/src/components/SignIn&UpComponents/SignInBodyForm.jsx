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
			/>
			{error && (
				<p className="text-danger mb-3" style={{ alignSelf: 'flex-start', fontSize: '11px' }}>
					<i>{error}</i>
				</p>
			)}
			{/* <Link to="/">
				<span>Quên mật khẩu?</span>
			</Link> */}
			<button className={`submitBtn ${error ? '' : 'mt-3'}`}>Đăng nhập</button>
		</>
	);
};

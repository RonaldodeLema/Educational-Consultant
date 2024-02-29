export const SignUpBodyForm = ({ setUsername, password, setPassword, repassword, setRepassword, error }) => {
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
				<p className="text-danger m-0" style={{ alignSelf: 'flex-start', fontSize: '11px' }}>
					<i>{error}</i>
				</p>
			)}
			<button className="submitBtn" style={{ marginTop: '2rem' }}>
				Đăng ký
			</button>
		</>
	);
};

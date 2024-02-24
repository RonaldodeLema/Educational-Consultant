const Error = ({ errorMessage, errorCode, errorStack }) => {
	return (
		<>
			<h1>
				{errorCode}: {errorMessage}
			</h1>
			<p>{errorStack}</p>
		</>
	);
};

export default Error;

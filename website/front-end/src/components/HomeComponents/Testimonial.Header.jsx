const Header = ({ data }) => {
	return (
		<div className="text-center">
			<h6 className="section-title bg-white text-center text-primary px-3">{data.title}</h6>
			<h1 className="mb-5">{data.paragraph}</h1>
		</div>
	);
};

export default Header;

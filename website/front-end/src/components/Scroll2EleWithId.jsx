const Scroll2EleWithId = (id) => {
	console.log(id);
	const element = document.getElementById(id);
	if (element) {
		element.scrollIntoView({ behavior: 'smooth' });
	}
};

export default Scroll2EleWithId;

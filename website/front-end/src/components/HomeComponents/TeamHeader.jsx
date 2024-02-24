import React from 'react';

const TeamHeader = ({ Header }) => {
	return (
		<div className="text-center wow fadeInUp" data-wow-delay="0.1s">
			<h6 className="section-title bg-white text-center text-primary px-3">{Header.title}</h6>
			<h1 className="mb-5">{Header.paragraph}</h1>
		</div>
	);
};

export default TeamHeader;

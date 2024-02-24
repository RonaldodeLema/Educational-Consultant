import React from 'react';

const LeftSide = ({ data }) => {
	return (
		<div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s" style={{ minHeight: '400px' }}>
			<div className="position-relative h-100">
				<img
					className="img-fluid position-absolute w-100 h-100"
					src={data.thumbnail_img}
					alt=""
					style={{ objectFit: 'cover' }}
				/>
			</div>
		</div>
	);
};

export default LeftSide;

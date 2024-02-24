import React from 'react';

const Item = ({ d }) => {
	return (
		<div className="testimonial-item text-center">
			<img
				className="border rounded-circle p-2 mx-auto mb-3"
				src={d.userImage}
				style={{ width: '80px', height: '80px' }}
				alt=""
			/>
			<h5 className="mb-0">{d.userFullName}</h5>
			<p>{d.userLevel}</p>
			<div className="testimonial-text bg-light text-center p-4">
				<p className="mb-0">{d.userComment}</p>
			</div>
		</div>
	);
};

export default Item;

import React from 'react';

const RightSide = ({ data }) => {
	return (
		<div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
			<h6 className="section-title bg-white text-start text-primary pe-3">Về chúng tôi</h6>
			<h1 className="mb-4">{data.title}</h1>
			<p className="mb-4">{data.para1}</p>
			<p className="mb-4">{data.para2}</p>
			<div className="row gy-2 gx-4 mb-4">
				{data.features
					? data.features?.map((d, i) => (
							<div className="col-sm-6" key={i}>
								<p className="mb-0">
									<i className="fa fa-arrow-right text-primary me-2" />
									{d.name}
								</p>
							</div>
					  ))
					: 'Loading'}
			</div>
		</div>
	);
};

export default RightSide;

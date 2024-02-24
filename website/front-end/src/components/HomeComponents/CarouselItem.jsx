import React from 'react';
import Scroll2EleWithId from '../Scroll2EleWithId';

const CarouselItem = ({ Carousel }) => {
	return (
		<div className="owl-carousel-item position-relative">
			<img className="img-fluid" src={Carousel.thumbnail_img} alt="" />
			<div
				className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center"
				style={{ background: 'rgba(24, 29, 56, .7)' }}
			>
				<div className="container">
					<div className="row justify-content-start">
						<div className="col-sm-10 col-lg-8">
							<h5 className="text-primary text-uppercase mb-3 animated slideInDown">{Carousel.title}</h5>
							<h1 className="display-3 text-white animated slideInDown">{Carousel.sub_title}</h1>
							<p className="fs-5 text-white mb-4 pb-2">{Carousel.describe_text}</p>
							<a
								onClick={() => Scroll2EleWithId(Carousel.path_1)}
								className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"
							>
								Đọc thêm
							</a>
							<a
								onClick={() => Scroll2EleWithId(Carousel.path_2)}
								className="btn btn-light py-md-3 px-md-5 animated slideInRight"
							>
								Tham gia ngay
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CarouselItem;

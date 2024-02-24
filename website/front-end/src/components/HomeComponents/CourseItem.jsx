import React from 'react';

const CourseItem = ({
	dataWowDelay,
	coursePrice,
	courseMentor,
	courseTitle,
	courseQuantity,
	courseHour,
	courseThumbnail,
}) => {
	return (
		<div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={dataWowDelay}>
			<div className="course-item bg-light">
				<div className="position-relative overflow-hidden">
					<img className="img-fluid" src={courseThumbnail} alt="" />
					<div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
						<a
							href="#"
							className="flex-shrink-0 btn btn-sm btn-primary px-3 border-end"
							style={{ borderRadius: '30px 0 0 30px' }}
						>
							Đọc thêm
						</a>
						<a
							href="#"
							className="flex-shrink-0 btn btn-sm btn-primary px-3"
							style={{ borderRadius: '0 30px 30px 0' }}
						>
							Tham gia ngay
						</a>
					</div>
				</div>
				<div className="text-center p-4 pb-0">
					<h3 className="mb-0">{coursePrice}</h3>
					<div className="mb-3">
						<small className="fa fa-star text-primary" />
						<small className="fa fa-star text-primary" />
						<small className="fa fa-star text-primary" />
						<small className="fa fa-star text-primary" />
						<small className="fa fa-star text-primary" />
						<small>(123)</small>
					</div>
					<h5 className="mb-4">{courseTitle}</h5>
				</div>
				<div className="d-flex border-top">
					<small className="flex-fill text-center border-end py-2">
						<i className="fa fa-user-tie text-primary me-2" />
						{courseMentor}
					</small>
					<small className="flex-fill text-center border-end py-2">
						<i className="fa fa-clock text-primary me-2" />
						{courseHour} Giờ
					</small>
					<small className="flex-fill text-center py-2">
						<i className="fa fa-user text-primary me-2" />
						{courseQuantity} Học viên
					</small>
				</div>
			</div>
		</div>
	);
};

export default CourseItem;

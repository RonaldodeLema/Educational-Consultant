import React from 'react';
import useWOW from '../hooks/useWOW';
const Contact = ({ data }) => {
	useWOW();
	return (
		<div className="container-xxl py-5">
			<div className="container">
				<div className="text-center wow fadeInUp" data-wow-delay="0.1s">
					<h6 className="section-title bg-white text-center text-primary px-3">Contact Us</h6>
					<h1 className="mb-5">Hãy liên hệ với chúng tôi</h1>
				</div>
				<div className="row g-4">
					<div className="col-lg col-md-6 wow fadeInUp" data-wow-delay="0.1s">
						<h2>Thông tin liên hệ</h2>
						<div className="d-flex align-items-center mb-3">
							<div
								className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
								style={{ width: '50px', height: '50px' }}
							>
								<i className="fa fa-map-marker-alt text-white" />
							</div>
							<div className="ms-3">
								<h5 className="text-primary">Địa chỉ văn phòng</h5>
								<p className="mb-0">{data.FirstContainer.Contact.address}</p>
							</div>
						</div>
						<div className="d-flex align-items-center mb-3">
							<div
								className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
								style={{ width: '50px', height: '50px' }}
							>
								<i className="fa fa-phone-alt text-white" />
							</div>
							<div className="ms-3">
								<h5 className="text-primary">Số điện thoại</h5>
								<p className="mb-0">{data.FirstContainer.Contact.phone}</p>
							</div>
						</div>
						<div className="d-flex align-items-center">
							<div
								className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
								style={{ width: '50px', height: '50px' }}
							>
								<i className="fa fa-envelope-open text-white" />
							</div>
							<div className="ms-3">
								<h5 className="text-primary">Email</h5>
								<p className="mb-0">{data.FirstContainer.Contact.email}</p>
							</div>
						</div>
					</div>
					{/* <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
						<iframe
							className="position-relative rounded w-100 h-100"
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001156.4288297426!2d-78.01371936852176!3d42.72876761954724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ccc4bf0f123a5a9%3A0xddcfc6c1de189567!2sNew%20York%2C%20USA!5e0!3m2!1sen!2sbd!4v1603794290143!5m2!1sen!2sbd"
							frameborder="0"
							style={{ minHeight: '300px', border: '0' }}
							allowfullscreen=""
							aria-hidden="false"
							tabindex="0"
						/>
					</div> */}
					<div className="col-lg col-md-12 wow fadeInUp" data-wow-delay="0.3s">
						<form>
							<div className="row g-3">
								<div className="col-md-6">
									<div className="form-floating">
										<input type="text" className="form-control" id="name" placeholder="Tên của bạn" />
										<label htmlFor="name">Tên của bạn</label>
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-floating">
										<input
											type="email"
											className="form-control"
											id="email"
											placeholder="Email của bạn"
										/>
										<label htmlFor="email">Email của bạn</label>
									</div>
								</div>
								<div className="col-12">
									<div className="form-floating">
										<input
											type="text"
											className="form-control"
											id="subject"
											placeholder="Chủ đề"
										/>
										<label htmlFor="subject">Chủ đề</label>
									</div>
								</div>
								<div className="col-12">
									<div className="form-floating">
										<textarea
											className="form-control"
											id="message"
											style={{ height: '150px' }}
										/>
										<label htmlFor="message">Nội dung tin nhắn</label>
									</div>
								</div>
								<div className="col-12">
									<button className="btn btn-primary w-100 py-3" type="submit">
										Gửi cho chúng tôi
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;

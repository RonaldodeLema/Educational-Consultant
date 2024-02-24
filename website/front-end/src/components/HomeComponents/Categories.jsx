import DefaultComponent from '../Partials/DefaultComponent';

const Categories = ({ data }) => {
	return (
		<DefaultComponent
		classNameComponent="category"
			body={
				<>
					{data.Header ? (
						<div className="text-center wow fadeInUp" data-wow-delay={data.Header.dataWowDelay}>
							<h6 className="section-title bg-white text-center text-primary px-3">
								{data.Header.title}
							</h6>
							<h1 className="mb-5">{data.Header.paragraph}</h1>
						</div>
					) : (
						'Loading'
					)}
					<div className="row g-3">
						<div className="col-lg-7 col-md-6">
							<div className="row g-3">
								{data.LeftSide
									? data.LeftSide?.map((d, i) => (
											<div
												className={`${d.pos} col-md-12 wow zoomIn`}
												data-wow-delay={d.dataWowDelay}
												key={i}
											>
												<a className="position-relative d-block overflow-hidden" href="">
													<img className="img-fluid" src={d.categoryThumbnail} alt="" />
													<div
														className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
														style={{ margin: '1px' }}
													>
														<h5 className="m-0">{d.categoryTitle}</h5>
														<small className="text-primary">
															{`${d.categoryCourseQuantity} Khóa`}
														</small>
													</div>
												</a>
											</div>
									  ))
									: 'Loading'}
							</div>
						</div>
						{data.RightSide ? (
							<div
								className={`${data.RightSide.pos} col-md-6 wow zoomIn`}
								data-wow-delay={data.RightSide.dataWowDelay}
								style={{ minHeight: '350px' }}
							>
								<a className="position-relative d-block h-100 overflow-hidden" href="">
									<img
										className="img-fluid position-absolute w-100 h-100"
										src={data.RightSide.categoryThumbnail}
										alt=""
										style={{ objectFit: 'cover' }}
									/>
									<div
										className="bg-white text-center position-absolute bottom-0 end-0 py-2 px-3"
										style={{ margin: '1px' }}
									>
										<h5 className="m-0">{data.RightSide.categoryTitle}</h5>
										<small className="text-primary">{`${data.RightSide.categoryCourseQuantity} Courses`}</small>
									</div>
								</a>
							</div>
						) : (
							'Loading'
						)}
					</div>
				</>
			}
		/>
	);
};

export default Categories;

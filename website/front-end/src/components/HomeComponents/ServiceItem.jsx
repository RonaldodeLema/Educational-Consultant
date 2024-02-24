const ServiceItem = ({ dataWowDelay, serviceIcon, serviceTitle, serviceSubTitle }) => {
	return (
		<div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay={dataWowDelay}>
			<div className="service-item text-center pt-3" style={{minHeight: '380px'}}>
				<div className="p-4">
					<i className={`text-primary mb-4 fa fa-3x ${serviceIcon}`} />
					<h5 className="mb-3">{serviceTitle}</h5>
					<p>{serviceSubTitle}</p>
				</div>
			</div>
		</div>
	);
};

export default ServiceItem;

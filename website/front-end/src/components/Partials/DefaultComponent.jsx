const DefaultComponent = ({ body, dataWowDelay, classNameComponent, idComponent }) => {
	return (
		<div
			{...(idComponent ? { 'id': idComponent } : {})}
			className={
				dataWowDelay && classNameComponent
					? `container-xxl py-5 wow fadeInUp ${classNameComponent}`
					: dataWowDelay
					? `container-xxl py-5 wow fadeInUp`
					: classNameComponent
					? `container-xxl py-5 ${classNameComponent}`
					: 'container-xxl py-5'
			}
			{...(dataWowDelay ? { 'data-wow-delay': dataWowDelay } : {})}
		>
			<div className="container">{body}</div>
		</div>
	);
};

export default DefaultComponent;

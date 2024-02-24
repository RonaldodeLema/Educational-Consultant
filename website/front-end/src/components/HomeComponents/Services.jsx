import ServiceItem from './ServiceItem';
import DefaultComponent from '../Partials/DefaultComponent';

const Services = ({ data }) => {
	return (
		<DefaultComponent
			body={
				<div className="row g-4">
					{data
						? data.map((d, i) => (
								<ServiceItem
									key={i}
									dataWowDelay={d.dataWowDelay}
									serviceIcon={d.serviceIcon}
									serviceTitle={d.serviceTitle}
									serviceSubTitle={d.serviceSubTitle}
								/>
						  ))
						: 'Loading...'}
				</div>
			}
		/>
	);
};

export default Services;

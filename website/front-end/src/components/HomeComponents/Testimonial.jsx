import React from 'react';
import Header from './Testimonial.Header';
import Items from './Testimonial.Items';
import DefaultComponent from '../Partials/DefaultComponent';

const Testimonial = ({ data }) => {
	return (
		<DefaultComponent
			dataWowDelay={data.dataWowDelay}
			body={
				<>
					{data.Header ? <Header data={data.Header} /> : 'Loading...'}
					{data.Body ? <Items data={data.Body} /> : 'Loading...'}
				</>
			}
		/>
	);
};

export default Testimonial;

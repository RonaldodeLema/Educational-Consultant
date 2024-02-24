import LeftSide from './About.LeftSide';
import RightSide from './About.RightSide';
import DefaultComponent from '../Partials/DefaultComponent';

const About = ({ data }) => {
	return (
		<DefaultComponent
			idComponent={'about'}
			body={
				<div className="row g-4">
					<LeftSide data={data.LeftSide} />
					<RightSide data={data.RightSide} />
				</div>
			}
		/>
	);
};

export default About;

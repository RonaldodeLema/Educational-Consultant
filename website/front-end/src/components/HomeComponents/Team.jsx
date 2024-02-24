import TeamHeader from './TeamHeader';
import TeamItems from './TeamItems';
import DefaultComponent from '../Partials/DefaultComponent';

const Team = ({ data }) => {
	return (
		<DefaultComponent
			idComponent={'team'}
			body={
				<>
					{data.Header ? <TeamHeader Header={data.Header} /> : 'Loading...'}
					{data.TeamItems ? <TeamItems TeamItems={data.TeamItems} /> : 'Loading...'}
				</>
			}
		/>
	);
};

export default Team;

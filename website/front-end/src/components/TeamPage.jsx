import Navigation from './HomeComponents/Navigation';
import Team from './HomeComponents/Team';
import Footer from './HomeComponents/Footer';
import Back2TopBtn from './HomeComponents/Back2TopBtn';
import Header from './Partials/Header';

import useWOW from '../hooks/useWOW';

const TeamPage = ({ fixedData }) => {
	useWOW();

	return (
		<>
			<Navigation data={fixedData.Header} />
			<Header
				currentPath={['/pages', '/our-team']}
				currentTitle={['Pages', 'Our Team']}
				headerTitle={'Đội ngũ giảng viên'}
			/>
			<Team data={fixedData.Team} />
			<Footer data={fixedData.Footer} />
			<Back2TopBtn />
		</>
	);
};

export default TeamPage;

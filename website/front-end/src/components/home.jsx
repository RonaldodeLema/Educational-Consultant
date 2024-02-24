import { Navigation } from './navigation';
import { Header } from './header';
import { Features } from './features';
import { About } from './about';
import { Services } from './services';
import { Gallery } from './gallery';
import { Testimonials } from './testimonials';
import { Team } from './Team';
import { Contact } from './contact';

const Home = ({ landingPageData }) => {
	return (
		<div>
			<Navigation data={landingPageData.Header} />
			<Header data={landingPageData.Header} />
			<Features data={landingPageData.Features} />
			<About data={landingPageData.About} />
			<Services data={landingPageData.Services} />
			<Gallery data={landingPageData.Gallery} />
			<Testimonials data={landingPageData.Testimonials} />
			<Team data={landingPageData.Team} />
			<Contact data={landingPageData.Contact} />
		</div>
	);
};

export default Home;
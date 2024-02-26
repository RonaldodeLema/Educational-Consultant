import { Navigation } from './HomeComponents/Navigation';
import { Header } from './partials/Header';
import { Services } from './HomeComponents/Services';
import { Portfolio } from './HomeComponents/Portfolio';
import { About } from './HomeComponents/About';
import { Team } from './HomeComponents/Team';
import { Clients } from './HomeComponents/Clients';
import { Contact } from './HomeComponents/Contact';
import { Footer } from './partials/Footer';

export const Home = ({ user, setUser }) => {
	return (
		<>
			<Navigation  />
			<Header />
			<Services />
			<Portfolio />
			<About />
			<Team />
			<Clients />
			<Contact />
			<Footer />
		</>
	);
};

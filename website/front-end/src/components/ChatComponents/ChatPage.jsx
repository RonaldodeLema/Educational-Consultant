import Navigation from '../HomeComponents/Navigation';
import Body from './Chat.Body';

const ChatPage = ({ fixedData, apiKey }) => {
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Body apiKey={apiKey} />
		</>
	);
};

export default ChatPage;

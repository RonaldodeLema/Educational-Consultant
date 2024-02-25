import Navigation from '../HomeComponents/Navigation';
import Body from './Chat.Body';

const ChatPage = ({ messages, setMessages, fixedData, apiKey }) => {
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Body messages={messages} setMessages={setMessages} apiKey={apiKey} />
		</>
	);
};

export default ChatPage;

import Navigation from '../HomeComponents/Navigation';
import Body from './Chat.Body';

const ChatPage = ({ messages, setMessages, fixedData }) => {
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Body messages={messages} setMessages={setMessages} />
		</>
	);
};

export default ChatPage;

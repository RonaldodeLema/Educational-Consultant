import Navigation from '../HomeComponents/Navigation';
import Body from './Chat.Body';

const ChatPage = ({ messages, setMessages, chatAble, setChatAble, fixedData }) => {
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Body messages={messages} setMessages={setMessages} chatAble={chatAble} setChatAble={setChatAble} />
		</>
	);
};

export default ChatPage;

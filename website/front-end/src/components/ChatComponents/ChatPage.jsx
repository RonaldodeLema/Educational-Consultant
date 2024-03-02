import Navigation from '../HomeComponents/Navigation';
import Body from './Chat.Body';

const ChatPage = ({ messages, setMessages, chatAble, setChatAble, fixedData, botType, setBotType, handleBotType }) => {
	return (
		<>
			<Navigation data={fixedData.Header} />
			<Body
				messages={messages}
				setMessages={setMessages}
				chatAble={chatAble}
				setChatAble={setChatAble}
				botType={botType}
				setBotType={setBotType}
				handleBotType={handleBotType}
			/>
		</>
	);
};

export default ChatPage;

import Navigation from '../HomeComponents/Navigation';
import Body from './Chat.Body';

const ChatPage = ({
	messages,
	setMessages,
	chatAble,
	setChatAble,
	fixedData,
	botType,
	setBotType,
	botType_v2,
	setBotType_v2,
	handleBotType,
}) => {
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
				botType_v2={botType_v2}
				setBotType_v2={setBotType_v2}
				handleBotType={handleBotType}
			/>
		</>
	);
};

export default ChatPage;

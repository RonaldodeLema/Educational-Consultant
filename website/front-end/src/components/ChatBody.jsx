import ChatForm from './ChatForm';

const ChatBody = ({ messages, setMessages, apiKey }) => {
	return (
		<>
			<main className="msger-chat">
				{messages?.map((message, index) => (
					<div key={index} className={`msg ${message.side}-msg`}>
						<div className="msg-bubble">
							<div className="msg-text" dangerouslySetInnerHTML={{ __html: message.text }} />
						</div>
					</div>
				))}
			</main>
			<ChatForm setMessages={setMessages} apiKey={apiKey} />
		</>
	);
};
export default ChatBody;

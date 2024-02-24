import ChatForm from './ChatForm';

const ChatBody = ({ messages, setMessages, apiKey, user }) => {
	const chatLimitation = user ? 20 : 10;
	const refreshPage = () => window.location.reload(false);

	return (
		<>
			<main className="msger-chat">
				{messages?.map((message, index) => (
					<div key={index} className={`msg ${message.side}-msg`}>
						{message.side === 'center' ? (
							<>
								<p key={`limit-exceeded-${index}`} className={`msg ${message.side}-msg`}>
									<span
										className="msg-alert-react2limit"
										dangerouslySetInnerHTML={{ __html: message.text }}
									/>
									<a href=" " onClick={refreshPage}>
										Khởi động lại
									</a>
								</p>
							</>
						) : (
							<div className="msg-bubble">
								<div className="msg-text" dangerouslySetInnerHTML={{ __html: message.text }} />
								{message.side === 'left' && message.chatAble && (
									<div className="msg-info">
										<div className="msg-chat-able">
											{message.chatAble}/{chatLimitation}
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				))}
			</main>
			<ChatForm setMessages={setMessages} apiKey={apiKey} chatLimitation={chatLimitation} user={user} />
		</>
	);
};
export default ChatBody;

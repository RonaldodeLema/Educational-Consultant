import { useState } from 'react';
import qaSys from '../apis/qaSys';

const ChatForm = ({ setMessages, apiKey }) => {
	const [msgText, setMsgText] = useState('');

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!msgText) return;
		appendMessage('right', msgText);
		setMsgText('');

		await botResponse(msgText);
	};

	const appendMessage = (side, text) => setMessages((prevMessages) => [...prevMessages, { side, text }]);

	const botResponse = async (msgTextInput) => {
		appendMessage('loading left', 'Đợi mình suy nghĩ chút nhé!');

		await qaSys
			.post('/test', { msgTextInput, apiKey })
			.then((res) => {
				setMessages((prevMessages) =>
					prevMessages.filter((message) => message.text !== 'Đợi mình suy nghĩ chút nhé!'),
				);

				const msgText = res.data.message;
				appendMessage('left', msgText);
			})
			.catch((err) => console.error(err.message));
	};

	return (
		<form className="msger-inputarea" onSubmit={handleSubmit}>
			<input
				type="text"
				aria-label="msger-input"
				className="msger-input"
				placeholder="Aa"
				autoFocus
				value={msgText}
				onChange={(e) => setMsgText(e.target.value)}
			/>
			<button type="submit" className="msger-send-btn">
				<span>Send</span>
			</button>
		</form>
	);
};

export default ChatForm;

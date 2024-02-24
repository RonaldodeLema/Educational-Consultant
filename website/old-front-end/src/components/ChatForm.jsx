import { useState } from 'react';
import qaSys from '../apis/qaSys';

const ChatForm = ({ setMessages, apiKey, chatLimitation, user }) => {
	const maxDigit = 200;
	const [msgText, setMsgText] = useState('');
	const [chatAble, setChatAble] = useState(1);
	const [disabledBtn, setDisabledBtn] = useState(false);
	const [disabledInput, setDisabledInput] = useState(false);
	console.info(`debug from chatform.jsx: ` + apiKey);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!msgText) return;
		appendMessage('right', msgText);
		setMsgText('');
		await botResponse(msgText);
	};

	const appendMessage = (side, text) => setMessages((prevMessages) => [...prevMessages, { side, text, chatAble }]);
	const botResponse = async (msgTextInput) => {
		setDisabledBtn(true);
		appendMessage('loading left', 'Đợi mình suy nghĩ chút nhé!');
		const postReq =
			user !== null && typeof user === 'object'
				? { _id: user._id, msgTextInput, apiKey }
				: { msgTextInput, apiKey };
		console.log(apiKey);
		await qaSys
			.post('/chat', postReq)
			.then((res) => {
				setDisabledBtn(false);
				setChatAble((prevChatAble) => prevChatAble + 1);
				setMessages((prevMessages) =>
					prevMessages.filter((message) => message.text !== 'Đợi mình suy nghĩ chút nhé!'),
				);
				const msgText = res.data.message;
				appendMessage('left', msgText);
				if (chatAble !== chatLimitation) return;
				setDisabledBtn(true);
				setDisabledInput(true);
				appendMessage(
					'center',
					`Bạn đã đạt giới hạn số lượng tin nhắn của mỗi phiên. Hãy khởi động lại phiên mới.`,
				);
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
				maxLength={maxDigit}
				disabled={disabledInput}
			/>
			<span className="char-count">
				{msgText.length}/{maxDigit}
			</span>
			<button type="submit" className="msger-send-btn" disabled={disabledBtn}>
				<span>Send</span>
			</button>
		</form>
	);
};

export default ChatForm;

import React, { useState } from 'react';
import makeAxiosReq from '../../apis/makeAxiosReq';

const Form = ({
	setMessages,
	chatLimitation,
	chatAble,
	setChatAble,
	botType,
	setBotType,
	botType_v2,
	setBotType_v2,
	handleBotType,
	user,
}) => {
	const maxDigit = 200;
	const [msgText, setMsgText] = useState('');
	const [disabledBtn, setDisabledBtn] = useState(false);
	const [disabledInput, setDisabledInput] = useState(false);
	const botTypes = ['GPT2', 'PhoBERT', 'BILSTM', 'VIMRC'];
	const botTypes_v2 = ['TFIDF', 'BM25'];

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
				? { _id: user._id, msgTextInput, receiver: botType.toLowerCase(), reader: botType_v2.toLowerCase() }
				: { msgTextInput, receiver: botType.toLowerCase(), reader: botType_v2.toLowerCase() };
		// Task: add the flag for req
		await makeAxiosReq
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
			.catch((err) => console.error('error of axios post req: ' + err.message));
	};

	return (
		<form className="msger-inputarea" onSubmit={handleSubmit}>
			<div className="input-group">
				<input
					type="text"
					aria-label="msger-input"
					className="form-control msger-input"
					placeholder="Aa"
					autoFocus
					value={msgText}
					onChange={(e) => setMsgText(e.target.value)}
					maxLength={maxDigit}
					disabled={disabledInput}
				/>
				<span className={`char-count input-group-text ${disabledInput ? 'disabled' : ''}`}>
					{msgText.length}/{maxDigit}
				</span>
				<button
					className={`btn btn-outline-secondary dropdown-toggle ${disabledInput ? 'disabled' : ''}`}
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{botType}
				</button>
				<ul className="dropdown-menu">
					{botTypes
						.filter((type) => type !== botType)
						.map((type, i, arr) => (
							<React.Fragment key={i}>
								<li>
									<a className="dropdown-item" onClick={(e) => handleBotType(e.target.text, true)}>
										{type}
									</a>
								</li>
								{i < arr.length - 1 && (
									<li>
										<hr className="dropdown-divider" />
									</li>
								)}
							</React.Fragment>
						))}
				</ul>
				<button
					className={`btn btn-outline-secondary dropdown-toggle ${disabledInput ? 'disabled' : ''}`}
					type="button"
					data-bs-toggle="dropdown"
					aria-expanded="false"
				>
					{botType_v2}
				</button>
				<ul className="dropdown-menu">
					{botTypes_v2
						.filter((type) => type !== botType_v2)
						.map((type, i, arr) => (
							<React.Fragment key={i}>
								<li>
									<a className="dropdown-item" onClick={(e) => handleBotType(e.target.text)}>
										{type}
									</a>
								</li>
								{i < arr.length - 1 && (
									<li>
										<hr className="dropdown-divider" />
									</li>
								)}
							</React.Fragment>
						))}
				</ul>
				<button type="submit" className="btn btn-outline-info msger-send-btn px-4" disabled={disabledBtn}>
					<span>Gửi</span>
				</button>
			</div>
		</form>
	);
};

export default Form;

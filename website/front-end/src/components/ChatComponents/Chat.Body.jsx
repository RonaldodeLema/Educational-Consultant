import React, { useState } from 'react';
import { useAuth } from './../../hooks/useAuth';
import Form from './Chat.Form';

const Body = ({ apiKey }) => {
	const [messages, setMessages] = useState([
		{
			side: `left`,
			text: `Chào bạn, mình là <b><i>5AceEdu</i></b> bot được huấn luyện để hỗ trợ trả lời cho bạn các vấn đề về tuyển sinh 😄`,
		},
	]);

	const { logout, user } = useAuth();

	const handleLogout = () => {
		logout();
	};

	const chatLimitation = user ? 20 : 10;
	const refreshPage = () => window.location.reload(false);

	return (
		<div className="chat-page container-fluid p-0 m-0 d-flex justify-content-center mt-2 mh-100">
			<div className="col-lg-3">{user && <button onClick={handleLogout}>Logout</button>}</div>
			<div className="col-lg-6">
				<section className="msger">
					<main className="msger-chat">
						{messages?.map((message, index) => (
							<div key={index} className={`msg ${message.side}-msg`}>
								{message.side === 'center' ? (
									<p
										key={`limit-exceeded-${index}`}
										className={`msg ${message.side}-msg`}
										style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
									>
										<span
											className="msg-alert-react2limit"
											dangerouslySetInnerHTML={{ __html: message.text }}
										/>
										<a className="btn btn-primary btnRefreshPage" onClick={refreshPage}>
											<i className="fas fa-sync-alt" /> Khởi động lại
										</a>
									</p>
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
					<Form setMessages={setMessages} apiKey={apiKey} chatLimitation={chatLimitation} user={user} />
				</section>
			</div>
			<div className="col-lg-3" />
		</div>
	);
};

export default Body;

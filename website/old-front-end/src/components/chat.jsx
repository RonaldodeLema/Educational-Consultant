import ChatBody from './ChatBody';
import { Navigation } from './navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import '../chat.css';

const Chat = ({ landingPageData, apiKey }) => {
	const [messages, setMessages] = useState([
		{
			side: `left`,
			text: `Chào bạn, mình là <b><i>FIVEACE EDU</i></b> bot được huấn luyện để hỗ trợ trả lời cho bạn các vấn đề về tuyển sinh 😄`,
		},
	]);

	const msgerRef = useRef(null);
	const navRef = useRef(null);
	const { logout, user } = useAuth();

	const handleLogout = () => {
		logout();
	};

	useEffect(() => {
		if (msgerRef.current && navRef.current) {
			msgerRef.current.style.marginTop = `calc(100vh - ${navRef.current.clientHeight}px - 80vh)`;
		}
	}, []);

	return (
		<div className="chat-page container-fluid p-0 m-0">
			<Navigation data={landingPageData.Header} ref={navRef} />
			{user && <button onClick={handleLogout}>Logout</button>}
			<section className="msger" ref={msgerRef}>
				<ChatBody messages={messages} setMessages={setMessages} apiKey={apiKey} user={user} />
			</section>
		</div>
	);
};

export default Chat;

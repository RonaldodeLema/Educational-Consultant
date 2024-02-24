import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import ErrorPage from './components/ErrorPage';
import CoursePage from './components/CoursePage';
import TeamPage from './components/TeamPage';
import ContactPage from './components/ContactPage';
import TestimonialPage from './components/TestimonialPage';
import ChatPage from './components/ChatComponents/ChatPage';
import { SignIn } from './components/SignIn&UpComponents/SignIn';
import { SignUp } from './components/SignIn&UpComponents/SignUp';

import { AuthProvider } from './hooks/useAuth';
import Spinner from './components/HomeComponents/Spinner';
import JsonData from './data/data.json';
import makeAxiosReq from './apis/makeAxiosReq';

import './index.css';

const App = () => {
	const [fixedData, setFixedData] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [apiKey, setApiKey] = useState('');
	const [errorMessage, setErrorMessage] = useState('Không tìm thấy');
	const [errorCode, setErrorCode] = useState(404);
	const [errorStack, setErrorStack] = useState('Oops! Đã có lỗi xảy ra');

	useEffect(() => {
		const fetchData = async () => {
			const startTime = performance.now();
			try {
				setFixedData(JsonData);
			} catch (error) {
				console.error(`Error: ${error}`);
			}
			makeAxiosReq
				.post('/get_api_key', { username: 'tdtu', password: '123456' })
				.then((response) => response.data.ok && setApiKey(response.data.apiKey))
				.catch((err) => console.error(err));
			const endTime = performance.now();
			const executionTime = endTime - startTime;
			if (1500 - executionTime > 0) {
				setTimeout(() => {
					setIsLoading(false);
				}, 1500 - executionTime);
			}
		};

		fetchData();
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<AuthProvider>
			<Routes>
				<Route exact path="/" element={<HomePage fixedData={fixedData} />} />
				<Route path="/about" element={<AboutPage fixedData={fixedData} />} />
				<Route path="/courses" element={<CoursePage fixedData={fixedData} />} />
				<Route path="/contact" element={<ContactPage fixedData={fixedData} />} />
				<Route path="/pages">
					<Route path="our-team" element={<TeamPage fixedData={fixedData} />} />
					<Route path="testimonial" element={<TestimonialPage fixedData={fixedData} />} />
					<Route path="chat-with-ai" element={<ChatPage fixedData={fixedData} apiKey={apiKey} />} />
				</Route>
				<Route path="/signin" element={<SignIn fixedData={fixedData} />} />
				<Route path="/signup" element={<SignUp fixedData={fixedData} />} />
				<Route path="/*" element={<ErrorPage fixedData={fixedData} />} />
			</Routes>
		</AuthProvider>
	);
};

export default App;

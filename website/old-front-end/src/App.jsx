import SmoothScroll from 'smooth-scroll';
import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import Chat from './components/chat';
import Error from './components/error';
import Home from './components/home';
import Register from './components/Register';
import Login from './components/Login';
import JsonData from './data/data.json';
import makeAxiosReq from './apis/makeAxiosReq';

import { AuthProvider } from './hooks/useAuth';

import './App.css';

// export const scroll = new SmoothScroll('a[href*="#"]', {
// 	speed: 1000,
// 	speedAsDuration: true,
// });

const App = () => {
	const [landingPageData, setLandingPageData] = useState({});
	const [errorMessage, setErrorMessage] = useState('Không tìm thấy');
	const [errorCode, setErrorCode] = useState(404);
	const [errorStack, setErrorStack] = useState('Oops! Đã có lỗi xảy ra');
	const [apiKey, setApiKey] = useState('');
	// const user = localStorage.getItem('user') || undefined;

	useEffect(() => {
		setLandingPageData(JsonData);
		// makeAxiosReq
		// 	.post('/get_api_key', { username: 'tdtu', password: '123456' })
		// 	.then((response) => response.data.ok && setApiKey(response.data.apiKey))
		// 	.catch((err) => console.error(err));
	}, []);

	return (
		<AuthProvider>
			<Routes>
				<Route exact path="/" element={<Home landingPageData={landingPageData} />} />
				<Route
					path="/login"
					element={
						<Login
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							errorCode={errorCode}
							setErrorCode={setErrorCode}
							errorStack={errorStack}
							setErrorStack={setErrorStack}
							apiKey={apiKey}
							setApiKey={setApiKey}
						/>
					}
				/>
				<Route
					path="/register"
					element={
						<Register
							errorMessage={errorMessage}
							setErrorMessage={setErrorMessage}
							errorCode={errorCode}
							setErrorCode={setErrorCode}
							errorStack={errorStack}
							setErrorStack={setErrorStack}
						/>
					}
				/>
				<Route path="/chat" element={<Chat landingPageData={landingPageData} apiKey={apiKey} />} />
				<Route
					path="/*"
					element={<Error errorMessage={errorMessage} errorCode={errorCode} errorStack={errorStack} />}
				/>
			</Routes>
		</AuthProvider>
	);
};

export default App;

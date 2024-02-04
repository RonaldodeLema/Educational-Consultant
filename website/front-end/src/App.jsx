import SmoothScroll from 'smooth-scroll';
import React, { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';
import Chat from './components/chat';
import Error from './components/error';
import Home from './components/home';
import { Login } from './components/Login';

import JsonData from './data/data.json';

import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';

import './App.css';

export const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1000,
	speedAsDuration: true,
});

const App = () => {
	const [landingPageData, setLandingPageData] = useState({});
	const [errorMessage, setErrorMessage] = useState('Không tìm thấy');
	const [errorCode, setErrorCode] = useState(404);
	const [errorStack, setErrorStack] = useState('Oops! Đã có lỗi xảy ra');
	const [apiKey, setApiKey] = useState('');

	useEffect(() => {
		setLandingPageData(JsonData);
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
					path="/chat"
					element={
						<ProtectedRoute>
							<Chat landingPageData={landingPageData} apiKey={apiKey}/>{' '}
						</ProtectedRoute>
					}
				/>
				<Route
					path="/*"
					element={<Error errorMessage={errorMessage} errorCode={errorCode} errorStack={errorStack} />}
				/>
			</Routes>
		</AuthProvider>
	);
};

export default App;

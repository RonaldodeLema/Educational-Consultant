import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import makeAxiosReq from '../apis/makeAxiosReq';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// get user here
	const [user, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();

	// call this function when you want to authenticate the user
	const login = async (data) => {
		await setUser(data);
		navigate('/');
	};

	// call this function to sign out logged in user
	const logout = async () => {
		await makeAxiosReq
			.get(`/logout?username=${user.username}`)
			.then(async (res) => {
				if (res.data.ok) {
					await setUser(null);
					navigate('/', { replace: true });
				}
			})
			.catch((err) => console.error(err));
	};

	const value = useMemo(
		() => ({
			user,
			login,
			logout,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[user],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

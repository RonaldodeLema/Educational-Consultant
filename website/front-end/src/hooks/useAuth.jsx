import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';
import makeAxiosReq from '../apis/makeAxiosReq';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useLocalStorage('user', null);
	const navigate = useNavigate();

	const login = async (data) => {
		await setUser(data);
		navigate('/');
	};

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
		[user],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};

import axios from 'axios';

export default axios.create({
	baseURL: 'http://localhost:1119',
	withCredentials: true,
});

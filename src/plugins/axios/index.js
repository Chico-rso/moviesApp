import axios from 'axios';
import interceptors from './interceptors'

const instance = axios.create({
	baseUrl: process.env.VUE_APP_API_URL,
});

interceptors(instance);

export default instance
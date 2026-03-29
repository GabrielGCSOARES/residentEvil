import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const getBaseURL = () => {
    if (Platform.OS === 'android') return 'http://10.0.2.2:8000/api';
    if (Platform.OS === 'ios') return 'http://127.0.0.1:8000/api';
    if (Platform.OS === 'web') return 'http://127.0.0.1:8000/api';

    return 'http://192.168.1.100:8000/api'; 
};

const api = axios.create({
    baseURL: getBaseURL(),
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;
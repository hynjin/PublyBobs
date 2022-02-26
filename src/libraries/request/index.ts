import axios, { AxiosRequestHeaders, AxiosRequestConfig } from 'axios';
import { success, error } from './respond';

const API_HOST_NAME = 'http://localhost:3000'; //process.env.PUBLY_NEWS_GATEWAY_DOMAIN;
const API_BASE_URL = `${API_HOST_NAME}/api`;

function createHeader(): AxiosRequestHeaders {
    return {
        'X-Platform': 'staging',
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
}

export default async function request(options: AxiosRequestConfig) {
    const headers = createHeader();

    try {
        const response = await axios({
            baseURL: API_BASE_URL,
            headers,
            ...options,
            withCredentials: true,
        });

        return success(response);
    } catch (err) {
        // throw error(err);
    }
}

// export async function serverSideRequest(options: AxiosRequestConfig, token = '') {
//   const headers = { Authorization: `Bearer ${token}`, ...createHeader() };
//   try {
//     const response = await axios({
//       baseURL: API_BASE_URL,
//       headers,
//       ...options,
//       withCredentials: true,
//     });
//     return success(response);
//   } catch (err) {
//     throw error(err);
//   }
// }

export async function originRequest(
    options: AxiosRequestConfig,
    customHeaders?: any
) {
    const headers = { ...createHeader(), ...customHeaders };
    try {
        const response = await axios({
            headers,
            ...options,
            withCredentials: true,
        });
        return success(response);
    } catch (err) {
        // throw error(err);
    }
}

import axios, { AxiosRequestConfig } from 'axios';
import request from '../libraries/request';

// export function getChef(
//     httpRequester: any,
//     param?: { weekNumber: any },
//     pagination?: { limit: number; page: number }
// ): Promise<AxiosResponse> {
//     return httpRequester({
//         method: 'GET',
//         url: `/api/chefs`,
//         params: { ...param, ...pagination },
//     });
// }

// export function addChef(
//     httpRequester: any,
//     param?: { date: any; chefs: any },
//     pagination?: { limit: number; page: number }
// ): Promise<AxiosResponse> {
//     return httpRequester({
//         method: 'POST',
//         url: `/api/chefs`,
//         data: { ...param, ...pagination },
//     });
// }

export function getChef(params?: { weekNumber: any }) {
    // const { subId, page } = params;

    return request({
        url: `/chefs`,
        method: 'GET',
        params,
    });
}

export function addChef(params?: { date: any; chefs: any }) {
    // const { subId, page } = params;

    return request({
        url: `/chefs`,
        method: 'POST',
        data: params,
    });
}

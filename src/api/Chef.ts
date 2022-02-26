import { AxiosResponse } from 'axios';

export function findAllCuratorCategories(
    httpRequester: any,
    param?: { id?: number; name?: string },
    pagination?: { limit: number; page: number }
): Promise<AxiosResponse> {
    return httpRequester({
        method: 'GET',
        url: `/api/news/curator-categories`,
        params: { ...param, ...pagination },
    });
}

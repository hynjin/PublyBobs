import { AxiosError, AxiosResponse } from 'axios';
import HttpStatus from 'http-status-codes';

function convertSuccess(success: AxiosResponse) {
  return {
    status: success.status,
    statusText: success.statusText,
    url: success.config.url || null,
    method: success.config.method || null,
    params: success.config.params,
    body: success.config.data,
    data: success.data,
  };
}

function convertError(error: AxiosError) {
  if (!error.isAxiosError) {
    throw error;
  }

  if (!error.response) {
    return {
      message: '인터넷에 연결되지 않았습니다.',
      status: -1,
      statusText: null,
      url: error.config.url || null,
      method: error.config.method || null,
      params: error.config.params || null,
      body: error.config.data || null,
      data: null,
    };
  }

  return {
    message: error.message || 'Axios ERROR',
    status: error.response.status || null,
    statusText: error.response.statusText || null,
    url: error.config.url || null,
    method: error.config.method || null,
    params: error.config.params || null,
    body: error.config.data || null,
    data: error.response.data || null,
  };
}

export function success(response: AxiosResponse): APIResponseType {
  const success = convertSuccess(response);

  return {
    statusCode: success.status ?? HttpStatus.OK,
    message:
      success.data?.message ||
      success.statusText ||
      HttpStatus.getStatusText(success.status ?? HttpStatus.OK),
    data:
      success.data?.success?.data ||
      success.data?.success ||
      success.data?.data ||
      success.data ||
      null,
  };
}

export function error(response: AxiosError): APIResponseType {
  const error = convertError(response);

  return {
    statusCode: error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || '',
    data: {
      status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      statusText: error.message || '',
      url: error.url || '',
      method: error.method || '',
      params: error.params || null,
      body: error.body || null,
      data: error.data || {},
    },
  };
}

import { AxiosResponse, AxiosError } from 'axios';

const handleApiRes = <T>(response: AxiosResponse<T>): T => {
  const { data, status } = response;
  if (!response.data) {
    throw new Error('Empty response data');
  }

  if (status >= 200 && status < 300) {
    const errorMessage = data && data.message ? data.message : 'Request failed';
    return errorMessage;
  } else {
    const errorMessage = response.data.message || 'Request failed';
    throw new Error(errorMessage);
  }
};

const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorMessage = error.response.data.message || 'Request failed';
    console.error(`Server responded with an error: ${errorMessage}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response received from the server');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(`Error setting up the request: ${error.message}`);
  }
};

export { handleApiRes, handleApiError };

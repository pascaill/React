import { getAccessToken } from './storage';

export default async function Fetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...(getAccessToken() && { Authorization: `Bearer ${getAccessToken()}` }),
        ...options.headers,
      },
    });
    const responseJson = await response.json();
    if (!response.ok) {
      throw (responseJson);
    }
    return responseJson;
  } catch (error) {
    return Promise.reject(error);
  }
}

export const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

export const getAccessToken = () => localStorage.getItem('accessToken');

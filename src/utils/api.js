import fetch from './fetch';

export const BASE_URL = 'https://forum-api.dicoding.dev/v1';

export const register = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return response;
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
};

export const getUserStatus = async () => {
  const response = await fetch(`${BASE_URL}/users/me`);
  return response;
};

export const createThreads = async ({ title, category, body }) => {
  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, category, body }),
  });
  return response;
};

export const commentThreads = async (id, { content }) => {
  const response = await fetch(`${BASE_URL}/threads/${id}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  return response;
};

export const getThreads = async () => {
  const response = await fetch(`${BASE_URL}/threads`);
  return response;
};

export const getThreadById = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}`);
  return response;
};

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response;
};

export const getLeaderBoards = async () => {
  const response = await fetch(`${BASE_URL}/leaderboards`);
  return response;
};

export const upVoteThread = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}/up-vote`, {
    method: 'POST',
  });
  return response;
};

export const downVoteThread = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}/down-vote`, {
    method: 'POST',
  });
  return response;
};

export const neutralVoteThread = async (id) => {
  const response = await fetch(`${BASE_URL}/threads/${id}/neutral-vote`, {
    method: 'POST',
  });
  return response;
};

export const upVoteComment = async (trheadId, commentId) => {
  const response = await fetch(`${BASE_URL}/threads/${trheadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
  });
  return response;
};

export const downVoteComment = async (trheadId, commentId) => {
  const response = await fetch(`${BASE_URL}/threads/${trheadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
  });
  return response;
};

export const neutralVoteComment = async (trheadId, commentId) => {
  const response = await fetch(`${BASE_URL}/threads/${trheadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
  });
  return response;
};

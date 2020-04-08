import { TOKEN_STORAGE_KEY } from './config';

export const getToken = () => {
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const saveToken = token => {
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const destroyToken = () => {
  window.localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export default { getToken, saveToken, destroyToken };

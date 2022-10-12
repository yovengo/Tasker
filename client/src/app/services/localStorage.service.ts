const TOKEN_KEY: string = 'jwt-token';
const REFRESH_KEY: string = 'jwt-refresh-token';
const EXPIRES_KEY: string = 'jwt-expires';
const USERID_KEY: string = 'user-local-id';

type Tokens = {
  refreshToken: string;
  accessToken: string;
  userId: string;
  expiresIn: number;
};

export const setTokens = ({ refreshToken, accessToken, userId, expiresIn = 3600 }: Tokens) => {
  const expiresDate: number = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, String(expiresDate));
};

export const getAccessToken = (): string => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = (): string => {
  return localStorage.getItem(REFRESH_KEY);
};

export const getTokenExpiresDate = (): string => {
  return localStorage.getItem(EXPIRES_KEY);
};

export const getUserId = (): string => {
  return localStorage.getItem(USERID_KEY);
};

export const removeAuthData = (): void => {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
};

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};

export default localStorageService;

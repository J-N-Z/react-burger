export const isTokenExists = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

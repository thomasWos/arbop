const isDevelopment = process.env.NODE_ENV === 'development';
const apiBaseUrl = isDevelopment ? 'http://localhost:3000' : '';

export default apiBaseUrl;

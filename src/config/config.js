const config = {
  development: {
    API_URL: 'http://localhost:5002/api',
    FRONTEND_URL: 'http://localhost:3000',
  },
  production: {
    API_URL: '/api', // This will be relative to your domain
    FRONTEND_URL: 'https://jayambeconstruction.com', // Replace with your actual domain
  }
};

const environment = import.meta.env.MODE || 'development';
export const { API_URL, FRONTEND_URL } = config[environment];


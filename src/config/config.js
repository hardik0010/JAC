const config = {
  development: {
    API_URL: 'http://localhost:5002/api',
    FRONTEND_URL: 'http://localhost:3000',
  },
  production: {
    API_URL: 'https://jay-ambe-construction-api.onrender.com/api',
    FRONTEND_URL: 'https://your-domain-will-go-here.com',
  }
};

const environment = import.meta.env.MODE || 'development';
export const { API_URL, FRONTEND_URL } = config[environment];


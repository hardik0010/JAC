// Keep backend alive by pinging it every 10 minutes
const API_URL = 'https://jay-ambe-construction-api.onrender.com/api/status';

let keepAliveInterval = null;

export const startKeepAlive = () => {
  // Don't start multiple intervals
  if (keepAliveInterval) return;
  
  console.log('🔄 Starting backend keep-alive service');
  
  // Ping immediately
  pingBackend();
  
  // Then ping every 10 minutes (600,000 ms)
  keepAliveInterval = setInterval(pingBackend, 10 * 60 * 1000);
};

export const stopKeepAlive = () => {
  if (keepAliveInterval) {
    clearInterval(keepAliveInterval);
    keepAliveInterval = null;
    console.log('⏹️ Stopped backend keep-alive service');
  }
};

const pingBackend = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (response.ok) {
      console.log('✅ Backend is awake');
    } else {
      console.log('⚠️ Backend responded with error:', response.status);
    }
  } catch (error) {
    console.log('❌ Failed to ping backend:', error.message);
  }
};

// Start keep-alive when this module is imported
if (typeof window !== 'undefined') {
  startKeepAlive();
}

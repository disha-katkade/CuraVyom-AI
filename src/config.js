const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000';

export const config = {
  API_URL,
  WS_URL,
  endpoints: {
    chat: `${WS_URL}/ws/chat`,
    upload: `${API_URL}/api/upload`,
    contact: `${API_URL}/api/contact`,
    subscribe: `${API_URL}/subscribe`
  }
};

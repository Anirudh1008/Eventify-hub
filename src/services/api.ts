
const API_BASE_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  
  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.access_token) {
      localStorage.setItem('authToken', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  register: async (email: string, password: string, username?: string, college_id?: number) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, college_id }),
    });
    
    if (response.access_token) {
      localStorage.setItem('authToken', response.access_token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }
    
    return response;
  },

  getCurrentUser: async () => {
    return apiRequest('/auth/me');
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

// Colleges API
export const collegesAPI = {
  getAll: () => apiRequest('/colleges'),
  getById: (id: number) => apiRequest(`/colleges/${id}`),
  getEvents: (id: number) => apiRequest(`/colleges/${id}/events`),
};

// Events API
export const eventsAPI = {
  getAll: () => apiRequest('/events'),
  getById: (id: number) => apiRequest(`/events/${id}`),
};

// Challenges API
export const challengesAPI = {
  getAll: () => apiRequest('/challenges'),
};

// Payments API
export const paymentsAPI = {
  createSession: (eventId?: number, challengeId?: number) => {
    return apiRequest('/payments/create-session', {
      method: 'POST',
      body: JSON.stringify({ event_id: eventId, challenge_id: challengeId }),
    });
  },

  registerForEvent: (eventId?: number, challengeId?: number) => {
    return apiRequest('/register-event', {
      method: 'POST',
      body: JSON.stringify({ event_id: eventId, challenge_id: challengeId }),
    });
  }
};

// Admin API
export const adminAPI = {
  getPendingColleges: () => apiRequest('/admin/colleges/pending'),
  approveCollege: (id: number) => apiRequest(`/admin/colleges/${id}/approve`, { method: 'POST' }),
};

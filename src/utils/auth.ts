// Auth utility functions for managing authentication state

export const authTokenKey = 'auth_token';
export const userDataKey = 'user_data';

export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem(authTokenKey);
    return !!token;
  },

  // Get auth token
  getToken: (): string | null => {
    return localStorage.getItem(authTokenKey);
  },

  // Get user data
  getUserData: (): { fullName?: string; username?: string; email?: string } | null => {
    const userData = localStorage.getItem(userDataKey);
    if (userData) {
      try {
        return JSON.parse(userData) as { fullName?: string; username?: string; email?: string };
      } catch {
        return null;
      }
    }
    return null;
  },

  // Set auth token
  setToken: (token: string): void => {
    localStorage.setItem(authTokenKey, token);
  },

  // Set user data
  setUserData: (userData: { fullName?: string; username?: string; email?: string }): void => {
    localStorage.setItem(userDataKey, JSON.stringify(userData));
  },

  // Clear auth data (logout)
  clearAuth: (): void => {
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(userDataKey);
  },

  // Get headers for API requests
  getAuthHeaders: (): Record<string, string> => {
    const token = authUtils.getToken();
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    };
  }
};
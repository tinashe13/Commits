const BASE_URL = 'http://localhost:5000/auth';

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const verifySession = async () => {
    const res = await fetch('http://localhost:5000/auth/verify', {
      method: 'GET',
      credentials: 'include',
    });
  
    const data = await res.json();
  
    if (!res.ok) throw new Error(data.message || 'Not authenticated');
  
    return data; // includes status, message, and user data
  };
  

  export const verify = async () => {
    const res = await fetch("http://localhost:5000/auth/verify", {
      credentials: "include",
    });
  
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
  
    const data = await res.json();
    return data.user?.role;
  };
  
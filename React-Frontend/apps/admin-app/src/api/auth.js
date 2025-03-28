export const logout = async () => {
    const res = await fetch("http://localhost:5000/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  };
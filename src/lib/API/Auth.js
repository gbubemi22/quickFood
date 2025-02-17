export const signupUser = async (userData) => {
    const response = await fetch("https://app.quickfoodshop.co.uk/v1/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Signup failed.");
  
    return { success: true, message: "Signup successful" }; // ✅ Ensures response structure
  };

  export const loginUser = async (credentials) => {
    try {
      const res = await fetch("https://app.quickfoodshop.co.uk/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
  
      return data; // This should contain token/user data
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  
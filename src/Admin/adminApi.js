const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://vaidya-backend-0lhd.onrender.com";
export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const responseText = await response.text();

  let data;

  try {
    data = JSON.parse(responseText);
  } catch {
    console.error("Non-JSON API response:", responseText);

    throw new Error(
      `Backend returned HTML instead of JSON. HTTP Status: ${response.status}. Check Render deployment and API URL.`
    );
  }

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
};

export const getAdminToken = () => {
  return sessionStorage.getItem("adminToken");
};

export const adminLogout = () => {
  sessionStorage.removeItem("adminToken");
  sessionStorage.removeItem("adminEmail");
};
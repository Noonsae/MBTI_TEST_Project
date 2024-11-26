import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    if (response.data.success) {
      localStorage.setItem(response.data.accessToken);
      return response.data;
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인을 먼저 해주세요.");

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("로그인을 먼저 해주세요.");
  try {
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

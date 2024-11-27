import axios from "axios";

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 회원가입 함수
export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signUp`, userData);
    return response.data;
  } catch (error) {
    console.error("회원가입 오류:", error);
    throw new Error("회원가입에 실패했습니다. 다시 시도해 주세요.");
  }
};

// 로그인 함수
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("로그인 오류:", error);
    throw new Error(
      "로그인에 실패했습니다. 아이디와 비밀번호를 확인해 주세요."
    );
  }
};

// 사용자 프로필 가져오기 함수
export const getUserProfile = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("로그인을 먼저 해주세요.");
  }

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("프로필 가져오기 오류:", error);
    if (error.response && error.response.status === 401) {
      throw new Error("인증에 실패했습니다. 다시 로그인해 주세요.");
    } else {
      throw new Error(
        "프로필 정보를 가져오는 데 실패했습니다. 다시 시도해 주세요."
      );
    }
  }
};

// 프로필 업데이트 함수
export const updateProfile = async (formData) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("로그인을 먼저 해주세요.");
  }

  try {
    const response = await axios.patch(`${API_URL}/profile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("프로필 업데이트 오류:", error);
    if (error.response && error.response.status === 401) {
      throw new Error("인증에 실패했습니다. 다시 로그인해 주세요.");
    } else {
      throw new Error("프로필 업데이트에 실패했습니다. 다시 시도해 주세요.");
    }
  }
};

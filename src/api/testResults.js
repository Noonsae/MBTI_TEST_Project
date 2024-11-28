import axios from "axios";

const API_URL = "";

// API 호출 함수 모듈화
const apiRequest = async (method, url, data = null) => {
  try {
    const response = await axios({ method, url, data });
    return response.data;
  } catch (error) {
    console.error(
      `Error with API request (${method.toUpperCase()} ${url}):`,
      error
    );
    throw error;
  }
};

// 테스트 결과를 가져오는 함수
export const getTestResults = () => apiRequest("get", API_URL);

// 새로운 테스트 결과를 생성하는 함수
export const createTestResult = (resultData) =>
  apiRequest("post", API_URL, resultData);

// 특정 테스트 결과를 삭제하는 함수
export const deleteTestResult = (id) =>
  apiRequest("delete", `${API_URL}/${id}`);

// 테스트 결과의 visibility 속성을 업데이트하는 함수
export const updateTestResultVisibility = (id, visibility) =>
  apiRequest("patch", `${API_URL}/${id}`, { visibility });

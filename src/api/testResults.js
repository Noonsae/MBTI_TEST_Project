import axios from "axios";

const API_URL = "https://succinct-ajar-eoraptor.glitch.me/testResults";

// 테스트 결과를 가져오는 함수
export const getTestResults = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching test results:", error);
    throw error;
  }
};

// 새로운 테스트 결과를 생성하는 함수
export const createTestResult = async (resultData) => {
  try {
    const response = await axios.post(API_URL, resultData);
    return response.data;
  } catch (error) {
    console.error("Error creating test result:", error);
    throw error;
  }
};

// 특정 테스트 결과를 삭제하는 함수
export const deleteTestResult = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting test result:", error);
    throw error;
  }
};

// 테스트 결과의 visibility 속성을 업데이트하는 함수
export const updateTestResultVisibility = async (id, visibility) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, { visibility });
    return response.data;
  } catch (error) {
    console.error("Error updating test result visibility:", error);
    throw error;
  }
};

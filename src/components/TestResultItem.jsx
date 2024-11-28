import {
  updateTestResultVisibility,
  deleteTestResult,
} from "../api/testResults";

const TestResultItem = ({ result, currentUserId, onUpdate }) => {
  const { id, userid, username, mbti, description, createdAt, visibility } =
    result;

  const handleToggleVisibility = async () => {
    try {
      const updatedResult = await updateTestResultVisibility(id, !visibility);
      onUpdate(id, updatedResult); // 상태 갱신
    } catch (error) {
      console.error("Error toggling visibility:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTestResult(id);
      onUpdate(id, null); // 상태 갱신: null은 삭제된 결과 의미
    } catch (error) {
      console.error("Error deleting test result:", error);
    }
  };

  return (
    <div>
      <div>
        <h2>{username}</h2>
        <p>{new Date(createdAt).toLocaleString()}</p>
      </div>
      <h3>{mbti}</h3>
      <p>{description}</p>
      {currentUserId === userid && (
        <div>
          <button onClick={handleToggleVisibility}>
            {visibility ? "비공개 전환" : "공개 전환"}
          </button>
          <button onClick={handleDelete}>삭제</button>
        </div>
      )}
    </div>
  );
};

export default TestResultItem;

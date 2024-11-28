import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import TestResultItem from "./TestResultItem";

const TestResultList = ({ testResults, setTestResults }) => {
  const { user } = useContext(AuthContext);
  const currentUserId = user.userId;
  const handleUpdate = (id, updatedResult) => {
    if (updatedResult === null) {
      // 삭제된 결과 제거
      setTestResults((prevResults) =>
        prevResults.filter((result) => result.id !== id)
      );
    } else {
      // 상태 갱신
      setTestResults((prevResults) =>
        prevResults.map((result) => (result.id === id ? updatedResult : result))
      );
    }
  };

  return (
    <div>
      {testResults
        .filter(
          (result) => result.visibility || result.userid === currentUserId
        ) // 공개된 결과 + 본인 결과만 표시
        .map((result) => (
          <TestResultItem
            key={result.id}
            result={result}
            currentUserId={currentUserId}
            onUpdate={handleUpdate}
          />
        ))}
    </div>
  );
};

export default TestResultList;

import React, { useContext, useState } from "react";
import { questions } from "../data/questions";
import styled from "styled-components";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { AuthContext } from "../context/AuthContext";

const TestForm = () => {
  const [result, setResult] = useState(null);
  const [answers, setAnswers] = useState({});
  const { isLoggedIn, user } = useContext(AuthContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (question_Id, data) => {
    setAnswers((prev) => ({
      ...prev,
      [question_Id]: data,
    }));
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      console.error("User is not logged in");
      alert("로그인 후 테스트를 진행해 주세요.");
      return;
    }

    // answers 객체를 배열로 변환 [{type, answer}]
    const answersArray = Object.entries(answers).map(([questionId, answer]) => {
      const question = questions.find((q) => q.id === Number(questionId));
      return {
        type: question.type,
        answer: answer,
      };
    });

    const mbtiResult = calculateMBTI(answersArray);
    setResult(mbtiResult); // 상태에 결과 저장

    try {
      const resultPayload = {
        userid: user.Id, // 여기서 user가 undefined일 가능성 확인
        username: user.nickname,
        mbti: mbtiResult,
        description: mbtiDescriptions[mbtiResult],
        createdAt: new Date().toISOString(),
        visibility: true, // 기본값: 공개
      };

      await createTestResult(resultPayload);
      navigate("/results");
    } catch (error) {
      console.error("Error saving test result:", error);
    }
  };

  return (
    <>
      <QuestionCard>
        <p>{questions[currentQuestionIndex].id}. </p>
        <span>{questions[currentQuestionIndex].question}</span>
        <OptionsContainer>
          {questions[currentQuestionIndex].options.map((option) => (
            <OptionButton
              key={option}
              onClick={() =>
                handleAnswer(questions[currentQuestionIndex].id, option)
              }
              selected={answers[questions[currentQuestionIndex].id] === option}
            >
              {option}
            </OptionButton>
          ))}
        </OptionsContainer>
      </QuestionCard>
      <TestBtnContainer>
        {currentQuestionIndex > 0 && (
          <NavButton onClick={handlePrevious}>이전</NavButton>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <NavButton
            onClick={handleNext}
            disabled={!answers[questions[currentQuestionIndex].id]}
          >
            다음
          </NavButton>
        ) : (
          <NavButton
            onClick={handleSubmit}
            disabled={!answers[questions[currentQuestionIndex].id]}
          >
            제출하기
          </NavButton>
        )}
      </TestBtnContainer>
    </>
  );
};

export default TestForm;

// 스타일 컴포넌트 정의
// (생략: 기존 코드 유지)

const QuestionCard = styled.div`
  background-color: #f9f9f9;
  padding: 50px 40px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  /* border: 1px solid red; */
  & p {
    font-size: 34px;
    text-align: center;
  }
  & span {
    display: block;
    font-size: 21px;
    line-height: 1.3;
    margin: 40px 0 30px;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OptionButton = styled.button`
  padding: 20px;
  background-color: ${(props) => (props.selected ? "#2286c9" : "#45acf1")};

  font-size: 16px;
  text-align: left;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#1b6aa8" : "#2286c9")};
  }
`;

const TestBtnContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-evenly;
  margin: 0 auto;
  margin-top: 30px;
`;

const NavButton = styled.button`
  width: 45%;
  height: 50px;

  background-color: #45acf1;

  border: none;
  border-radius: 10px;

  color: white;

  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2286c9;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

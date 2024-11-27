import React, { useState } from "react";
import { questions } from "../data/questions";
import styled from "styled-components";

const TestForm = () => {
  const [answers, setAnswers] = useState({});
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

  const handleSubmit = () => {
    // 제출하기 로직 추가 (예: 서버로 결과 전송 또는 결과 페이지로 이동)
    console.log("제출된 답변: ", answers);
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

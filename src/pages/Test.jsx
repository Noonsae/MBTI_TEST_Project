import React, { useState } from "react";
import styled from "styled-components";
import TestForm from "../components/TestForm";

const Test = () => {
  
  return (
    <TestContainer>
      <QuestionContainer>
        <h2>MBTI 테스트</h2>
        <TestForm />
      </QuestionContainer>
    </TestContainer>
  );
};

export default Test;

// 스타일 컴포넌트 정의
const TestContainer = styled.div`
  width: 60%;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const QuestionContainer = styled.div`
  width: 100%;
  max-width: 700px;
  & h2 {
    display: none;
  }
`;



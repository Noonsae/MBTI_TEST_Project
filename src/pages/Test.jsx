import React, { useState } from "react";
import { questions } from "../data/questions";
import NavBtn from "../components/NavBtn";

const Test = () => {
  const [answer, setAnswer] = useState({});

  const handleAnswer = (question_Id, data) => {
    setAnswer((prev) => ({
      ...prev,
      [question_Id]: data,
    }));
  };

  return (
    <div>
      <h2>MBTI 테스트</h2>
      <div>
        {questions.map((item) => (
          <div key={item.id}>
            <p>
              {item.id}. {item.question}
            </p>
            {item.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(item.id, option)}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>
      <NavBtn to="/results">제출하기</NavBtn>
    </div>
  );
};

export default Test;

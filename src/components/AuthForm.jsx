import React, { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
import styled from "styled-components";

const AuthForm = ({ mode, onSubmit }) => {
  const { setUser } = useContext(MyContext);
  const [formData, setFormData] = useState({
    user_id: "",
    user_password: "",
    user_name: "",
  });

  const [errors, setErrors] = useState({});

  const validate = (name, value) => {
    let error = "";
    if (name === "user_id" && !value) {
      error = "아이디를 입력해주세요.";
    } else if (name === "user_password" && value.length < 6) {
      error = "비밀번호는 최소 6자 이상이어야 합니다.";
    } else if (name === "user_name" && mode === "signup" && !value) {
      error = "별명을 입력해주세요.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 실시간 유효성 검사 실행
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (validate(key, formData[key])) {
        alert("입력한 정보에 오류가 있습니다. 다시 확인해주세요.");
        return;
      }
    }

    // 유효성 검사를 통과하면 onSubmit 호출
    onSubmit(formData);
  };

  return (
    <LoginForm onSubmit={handleSubmit}>
      {mode === "signup" && (
        <InputField
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder="별명을 적어주세요."
          required
        />
      )}
      <InputField
        type="text"
        name="user_id"
        value={formData.user_id}
        onChange={handleChange}
        placeholder="아이디를 적어주세요."
        autoComplete="current-password"
        required
      />
      <InputField
        type="password"
        name="user_password"
        value={formData.user_password}
        onChange={handleChange}
        placeholder="비밀번호를 적어주세요."
        autoComplete="current-password"
        required
      />
      {errors && <ErrorMessage>errors</ErrorMessage>}
      <LoginBtn>{mode === "signup" ? "회원가입" : "로그인"}</LoginBtn>
    </LoginForm>
  );
};

export default AuthForm;

const LoginForm = styled.form`
  width: 100%;
  height: 70%;

  margin: 30px 0;
  padding: 30px;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  background-color: #f9f9f9;
  box-shadow: 0px 8px 8px rgba(0, 0, 0, 0.1);

  border-radius: 12px;
  text-align: center;
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border: 2px solid #45acf1;
  }
`;

const LoginBtn = styled.button`
  width: 100%;
  padding: 14px;
  background-color: #45acf1;
  color: #ffffff;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #1c7cbb;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 16px;
  margin-top: -10px;
  margin-bottom: 15px;
  text-align: left;
`;

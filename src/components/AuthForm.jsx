import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";

const AuthForm = ({ mode, onSubmit }) => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: "",
  });

  const [checkPassword, setCheckPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onChangeCheckPassword = (e) => {
    setCheckPassword(e.target.value);
  };

  const validate = (name, value) => {
    let error = "";
    if (name === "nickname" && mode === "signup" && !value) {
      error = "별명을 입력해주세요.";
    } else if (name === "id" && !value) {
      error = "아이디를 입력해주세요.";
    } else if (name === "password" && value.length < 6) {
      error = "비밀번호는 최소 6자 이상이어야 합니다.";
    } else if (name === "checkPassword" && mode === "signup") {
      error = "입력하신 비밀번호와 다릅니다. 다시 확인해주세요.";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 실시간 유효성 검사 실행
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

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
        <div>
          <InputField
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="별명을 입력해주세요."
            required
          />
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
        </div>
      )}
      <div>
        <InputField
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          placeholder="아이디를 입력해주세요."
          autoComplete="current-id"
          required
        />
        {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
      </div>
      <div>
        <InputField
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요."
          autoComplete="current-password"
          required
        />
        {errors.password && <ErrorMessage>{errors.password} </ErrorMessage>}
      </div>
      {mode === "signup" && (
        <div>
          <InputField
            type="password"
            name="checkPassword"
            value={checkPassword}
            onChange={onChangeCheckPassword}
            placeholder="비밀번호를 한번 더 입력해주세요."
            required
          />
          {errors.checkPassword && (
            <ErrorMessage>{errors.checkPassword}</ErrorMessage>
          )}
        </div>
      )}
      <LoginBtn>{mode === "signup" ? "회원가입" : "로그인"}</LoginBtn>
    </LoginForm>
  );
};

export default AuthForm;

const LoginForm = styled.form`
  width: 100%;

  margin: 30px 0 40px;
  padding: 50px 30px;

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
  margin-bottom: 30px;
  padding: 13px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
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
    background-color: #2286c9;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 13px;
  margin: -20px 5px 30px;
  text-align: left;
`;

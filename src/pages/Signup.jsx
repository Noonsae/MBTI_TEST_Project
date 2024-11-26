import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/auth";
import AuthForm from "../components/AuthForm";
import styled from "styled-components";

const Signup = () => {  
  const navigate = useNavigate();

const handleSignup = async (FormData) => {
  try {
    const data = await register(FormData);
    console.log(data); // 서버 응답 확인
    if (data.success) {
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } else {
      alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  } catch (error) {
    console.error(error); // 오류 출력
    alert("회원가입 중 문제가 발생했습니다.");
  }
};


  return (
    <SignupContainer>
      <SignupTitle>회원가입</SignupTitle>
      <AuthForm mode="signup" onSubmit={handleSignup} />
      <LoginText>이미 계정이 있으신가요?</LoginText>
      <LinkToLogin to="/login">로그인</LinkToLogin>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  width: 30%;
  max-width: 500px;
  height: 640px;
  margin: 0 auto;
  padding: 60px 50px;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);

  text-align: center;
`;

const SignupTitle = styled.h2`
  text-align: left;
  font-size: 1.8rem;
  color: #333;
  margin: 15px 0 20px;
`;

const LoginText = styled.span`
  margin-bottom: 10px;
  font-size: 16px;
  color: #777;
`;

const LinkToLogin = styled(Link)`
  color: #45acf1;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

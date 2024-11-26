import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import AuthForm from "../components/AuthForm";
import { MyContext } from "../context/MyContext";
import styled from "styled-components";

const Login = () => {
  const { setUser } = useContext(MyContext);

  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    
    try {
      const data = await login(formData);
      if (data.success) {
        console.log("test");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      alert("로그인 중 문제가 발생했습니다.");
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>로그인</LoginTitle>
      <AuthForm mode="login" onSubmit={handleLogin} />

      <SignupText>계정이 없으신가요?</SignupText>
      <LinkToSignup to="/signup">회원가입</LinkToSignup>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 30%;
  max-width: 500px;
  height: 540px;
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

const LoginTitle = styled.h2`
  text-align: left;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
`;

const SignupText = styled.span`
  margin-bottom: 10px;
  font-size: 16px;
  color: #777;
`;

const LinkToSignup = styled(Link)`
  color: #45acf1;
  text-decoration: none;
  font-weight: bold;
  padding: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

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
   const { nickname, ...userWithoutNickname } = formData;
   console.log(userWithoutNickname); // { id: "User ID", password: "User password" }
   console.log(nickname); // { nickname: "User nickname" }

   try {
     const data = await login(userWithoutNickname);
     console.log(data);

     // 성공 여부 검사 및 얼리 리턴 적용
     if (!data.success) {
       alert("로그인에 실패했습니다.");
       return; // 로그인 실패 시 함수 종료
     }

     // 로그인 성공 시 로직
     console.log(data.accessToken);
     setUser(data);
     localStorage.setItem("accessToken", data.accessToken);
     navigate("/");
   } catch (error) {
     alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
     return; // 오류 발생 시 함수 종료
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
  margin: 0 auto;
  padding: 60px 50px 80px;

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

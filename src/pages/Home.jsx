import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  const items = [
    {
      title: "성격 유형 검사",
      description:
        "자신의 성격 유형을 파악하고 삶의 여러 영역에서 어떤 영향을 미치는지 알아보세요.",
    },
    {
      title: "성격 유형 이해",
      description:
        "다른 사람들이 어떻게 행동하는지 이해하는 데 도움을 줄 수 있습니다.",
    },
    {
      title: "팀 평가",
      description:
        "팀 내에서 자신과 동료들의 성격을 이해하고 협력할 수 있는 방법을 배워보세요.",
    },
  ];

  return (
    <Container>
      <Title>무료 MBTI 테스트</Title>
      <Description>
        자신의 성격 유형을 확인할 수 있도록 솔직하게 답변해주세요.
      </Description>

      <div>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemTitle>{item.title}</ListItemTitle>
              <ListItemDescription>{item.description}</ListItemDescription>
            </ListItem>
          ))}
        </List>
      </div>
      {isLoggedIn ? (
        <StyledLink to="/test">테스트하러 가기</StyledLink>
      ) : (
        <StyledLink to="/login">로그인하기</StyledLink>
      )}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  font-family: "Arial", sans-serif;
  color: #333;
`;

const Title = styled.h1`
  font-size: 55px;
  font-weight: bolder;
  color: #333;
  margin: 100px 0 20px;
  text-align: center;
`;

const Description = styled.p`
  font-size: 21px;
  line-height: 21px;
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  height: 500px;
  flex-direction: column;
  justify-content: space-evenly;

  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 800px;
`;

const ListItem = styled.li`
  background-color: #fff;
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const ListItemTitle = styled.h2`
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
`;

const ListItemDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
  color: #666;
`;

const StyledLink = styled(Link)`
  display: inline-block;

  margin-top: 10px;
  padding: 20px 40px;
  font-size: 21px;

  color: #fff;
  font-weight: bolder;
  background-color: #45acf1;

  border-radius: 30px;
  text-decoration: none;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1c7cbb;
  }
`;

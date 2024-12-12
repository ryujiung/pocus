import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logoImage from "../assets/pocus.png"; // 로고 이미지를 import (경로를 실제 이미지 경로로 변경)

function MainPage() {
  const navigate = useNavigate();

  return (
    <MainPageContainer>
      <Logo src={logoImage} alt="pocus logo" />
      <Button onClick={() => navigate("/login")}>로그인</Button>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
    </MainPageContainer>
  );
}

export default MainPage;

// Styled Components 정의
const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

const Logo = styled.img`
  width: 283px;
  height: 124px;
  margin-top:50px;
  margin-bottom: 50px;
  margin-left: 10px;
`;


const Button = styled.button`
  width: 292px;
  height: 44px;
  background-color: #2727AD; /* 버튼 배경색 */
  color: white; /* 텍스트 색상 */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1a1a89; /* 호버 상태에서 약간 어두운 색 */
  }`
  ;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router에서 useNavigate 가져오기
import styled from "styled-components";

function LoginPage() {
  const [phone, setPhone] = useState(""); // 휴대폰 번호 상태
  const [password, setPassword] = useState(""); // 비밀번호 상태
  const navigate = useNavigate(); // navigate 훅 사용

  // POST 요청 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    const apiUrl = "https://localhost:8080/api/login"; // 실제 백엔드 URL로 변경

    // 요청에 보낼 데이터
    const requestData = {
      phone,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // JSON 형식으로 보내기
        },
        body: JSON.stringify(requestData), // 데이터를 JSON 문자열로 변환
      });

      if (response.ok) {
        // 성공적인 응답 처리
        const result = await response.json();
        console.log("로그인 성공:", result);
        alert("로그인 성공!");
        navigate("/homepage"); // 로그인 성공 시 /homepage로 이동
      } else {
        // 에러 응답 처리
        const errorData = await response.json();
        console.error("로그인 실패:", errorData);
        alert("로그인 실패: " + (errorData.message || "알 수 없는 에러"));
      }
    } catch (error) {
      // 네트워크 에러 처리
      console.error("요청 중 오류 발생:", error);
      alert("요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginPageContainer>
      <LoginTitle>로그인</LoginTitle>
      <LoginForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="휴대폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} // 휴대폰 번호 상태 업데이트
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
        />
        <SubmitButton type="submit">입장하기</SubmitButton>
      </LoginForm>
      <SignupLink>
        아직 회원이 아니신가요? <SignupLinkAnchor href="/signup">회원가입</SignupLinkAnchor>
      </SignupLink>
    </LoginPageContainer>
  );
}

export default LoginPage;

// Styled Components 정의
const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

const LoginTitle = styled.h2`
  font-size: 40px;
  margin-bottom: 20px;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  width: 100%; /* 부모 컨테이너의 전체 너비 사용 */
  padding-left: 10px; /* 왼쪽 여백 추가 (선택 사항) */
  font-family: 'Pretendard', Arial, sans-serif;
  
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  width: 80%;
  max-width: 400px;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
  width: 292px; /* 부모의 너비에 맞게 설정 */
  max-width: 292px; /* 최대 너비 제한 */
  height: 44px;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  text-align: left; /* 텍스트 가운데 정렬 */
`;

const SubmitButton = styled.button`
  background-color: #2727AD;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
  width: 292px; /* 부모의 너비에 맞게 설정 */
  max-width: 292px; /* 최대 너비 제한 */
  height: 44px;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  text-align: center; /* 텍스트 가운데 정렬 */

  &:hover {
    background-color: #1f4bd9;
  }
`;

const SignupLink = styled.p`
  margin-top: 20px;
`;

const SignupLinkAnchor = styled.a`
  color: #3a63ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

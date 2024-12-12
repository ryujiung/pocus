import React, { useState } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

function SignupPage() {
  // const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달된 데이터를 유지
  const previousData = location.state || {
    name: "",
    affiliation: "",
    phone: "",
    password: "",
  };

  const [name, setName] = useState(previousData.name);
  const [affiliation, setAffiliation] = useState(previousData.affiliation);
  const [phone, setPhone] = useState(previousData.phone);
  const [password, setPassword] = useState(previousData.password);

  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지

    const apiUrl = "https://localhost:8080/api/signup"; // 실제 백엔드 URL로 변경

    const requestData = {
      name,
      affiliation,
      phone,
      password,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("회원가입 성공:", result);
        alert("회원가입 성공!");
      } else {
        const errorData = await response.json();
        console.error("회원가입 실패:", errorData);
        alert("회원가입 실패: " + (errorData.message || "알 수 없는 에러"));
      }
    } catch (error) {
      console.error("요청 중 오류 발생:", error);
      alert("요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <SignupPageContainer>
      <SignupTitle>회원가입</SignupTitle>
      <SignupForm onSubmit={handleSubmit}>
        <InputField
          type="text"
          placeholder="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="휴대폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TermsLink
          to="/terms"
          state={{
            name,
            affiliation,
            phone,
            password,
          }}
        >
          이용약관
        </TermsLink>
        <SubmitButton type="submit">가입하기</SubmitButton>
      </SignupForm>
    </SignupPageContainer>
  );
}

export default SignupPage;

// Styled Components 정의는 기존 코드와 동일

// Styled Components 정의
const SignupPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
`;

const SignupTitle = styled.h2`
  font-size: 40px;
  margin-bottom: 20px;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  width: 100%; /* 부모 컨테이너의 전체 너비 사용 */
  padding-left: 10px; /* 왼쪽 여백 추가 (선택 사항) */
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
  width: 80%;
  max-width: 400px;
`;

const InputField = styled.input`
  width: 294px;
  margin-bottom:10px;
  padding: 10px 40px 10px 0; /* 오른쪽 아이콘 공간 확보 */
  background-color: #101055;
  border: none;
  border-bottom: 2px solid #ccc;
  font-size: 20px;
  color: white;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: #ccc; /* Placeholder 색상 */
  }

  &:focus {
    border-bottom: 2px solid #3a63ff; /* 포커스 시 테두리 색 변경 */
  }
`;
const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchButton = styled.button`
  background-color: #3a63ff;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 30px; /* 부모의 너비에 맞게 설정 */
  height: 44px;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  text-align: center; /* 텍스트 가운데 정렬 */

  &:hover {
    background-color: #1f4bd9;
  }
`;

const SubmitButton = styled.button`
   background-color: #3a63ff;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 20px;
  width: 292px; /* 부모의 너비에 맞게 설정 */
  height: 44px;
  box-sizing: border-box; /* 패딩 포함 크기 계산 */
  text-align: center; /* 텍스트 가운데 정렬 */

  &:hover {
    background-color: #1f4bd9;
  }
`;

const TermsLink = styled(Link)`
  color: #3a63ff;
  text-decoration: none;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

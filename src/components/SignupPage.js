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
        <InputGroup>
          <InputField
            type="text"
            placeholder="소속"
            value={affiliation}
            onChange={(e) => setAffiliation(e.target.value)}
          />
          <SearchButton type="button">🔍</SearchButton>
        </InputGroup>
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
  background-color: #0b1b63;
  color: white;
`;

const SignupTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 400px;
`;

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchButton = styled.button`
  background-color: #3a63ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #1f4bd9;
  }
`;

const SubmitButton = styled.button`
  background-color: #3a63ff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #1f4bd9;
  }
`;

const TermsLink = styled(Link)`
  color: #3a63ff;
  text-decoration: none;
  font-size: 14px;
  text-align: center;
  margin-bottom: 20px;

  &:hover {
    text-decoration: underline;
  }
`;

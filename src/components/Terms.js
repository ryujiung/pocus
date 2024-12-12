import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function TermsPage() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 페이지에서 전달된 데이터
  const previousData = location.state || {
    name: "",
    affiliation: "",
    phone: "",
    password: "",
  };

  const handleAgree = () => {
    if (isChecked) {
      navigate("/signup", { state: previousData });
    }
  };

  return (
    <TermsPageContainer>
      <Title>가입약관</Title>
      <TermsBox>여기에 이용약관 내용을 입력하세요.</TermsBox>
      <CheckboxContainer>
        <input
          type="checkbox"
          id="terms"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <label htmlFor="terms">이용약관에 동의하겠습니다.</label>
      </CheckboxContainer>
      <AgreeButton onClick={handleAgree} disabled={!isChecked}>
        동의합니다
      </AgreeButton>
    </TermsPageContainer>
  );
}

export default TermsPage;

// Styled Components 정의
const TermsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const TermsBox = styled.div`
  width: 90%;
  max-width: 400px;
  height: 200px;
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  overflow-y: auto;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;

  input {
    cursor: pointer;
  }

  label {
    font-size: 14px;
    cursor: pointer;
  }
`;

const AgreeButton = styled.button`
  background-color: ${(props) => (props.disabled ? "#aaa" : "#3a63ff")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#aaa" : "#1f4bd9")};
  }
`;

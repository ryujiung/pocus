import React, { useState } from "react";
import styled from "styled-components";

function HomePage() {
  const [selectedCardIds, setSelectedCardIds] = useState([]); // 선택된 카드의 ID 목록
  const data = [
    {
      id: 1,
      title: "현재 방문자 알림",
      description: "방문 수리 1 테스트 텍스트...",
      time: "08:00 - 09:00",
    },
    {
      id: 2,
      title: "방문 수리 2",
      description: "방문 수리 2 테스트 텍스트...",
      time: "10:00 - 11:00",
    },
    {
      id: 3,
      title: "방문 수리 3",
      description: "방문 수리 3 테스트 텍스트...",
      time: "12:00 - 13:00",
    },
  ];

  const handleCardClick = async (id) => {
    // 이미 선택된 카드인지 확인
    if (selectedCardIds.includes(id)) return; // 이미 선택된 경우 아무 작업도 하지 않음

    setSelectedCardIds((prev) => [...prev, id]); // 선택된 ID를 배열에 추가

    try {
      // API 요청 보내기
      const response = await fetch("https://api.example.com/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId: id }),
      });

      if (!response.ok) {
        throw new Error("API 요청 실패");
      }

      const result = await response.json();
      console.log("API 요청 성공:", result);
    } catch (error) {
      console.error("API 요청 에러:", error);
    }
  };

  return (
    <AppContainer>
      <HomePageContainer>
        {/* 헤더 */}
        <HeaderContainer>
          <HeaderContent>
            <HeaderDate>12월 13일 금요일</HeaderDate>
            <HeaderCount>{data.length}건</HeaderCount>
            <HeaderContact>
              <HeaderIcon
                src="https://via.placeholder.com/24"
                alt="Icon"
              />
              <span>010-0000-0000</span>
            </HeaderContact>
          </HeaderContent>
        </HeaderContainer>

        {/* 리스트 카드 */}
        <ListContainer>
          {data.map((item) => (
            <ListCard
              key={item.id}
              selected={selectedCardIds.includes(item.id)} // 선택된 카드인지 확인
              onClick={() => handleCardClick(item.id)} // 카드 클릭 핸들러
            >
              <ListTitle>{item.title}</ListTitle>
              <ListTime>{item.time}</ListTime>
              <ListDescription>{item.description}</ListDescription>
            </ListCard>
          ))}
        </ListContainer>
      </HomePageContainer>
    </AppContainer>
  );
}

export default HomePage;

// Styled Components 정의
const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePageContainer = styled.div`
  color: white;
  width: 420px;
  height: 667px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 세로 스크롤 추가 */
`;

const HeaderContainer = styled.div`
  background-color: #1a237e;
  color: white;
  text-align: center;
  padding: 20px 10px;
  margin-left:20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  width: 323px;
  height:123px;
`;

const HeaderContent = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

const HeaderDate = styled.h2`
  font-size: 16px;
  margin: 0;
  color: #ccc;
`;

const HeaderCount = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin: 10px 0;
`;

const HeaderContact = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  margin-top: 10px;
`;

const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const MainCard = styled.div`
  width: 323px;
  height: 123px;
  background-color: #2727ad;
  color: white;
  padding: 20px 10px;
  border-radius: 12px;
  margin-bottom: 20px;
  margin-left:20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const AlertIcon = styled.span`
  font-size: 20px;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const CardTime = styled.p`
  font-size: 14px;
`;

const CardDescription = styled.p`
  font-size: 14px;
`;

const ListContainer = styled.div`
  width: 100%;
  
`;

const ListCard = styled.div`
  background-color: ${(props) => (props.selected ? "#ffffff" : "#2727ad")};
  color: ${(props) => (props.selected ? "#000" : "#fff")};
  padding: 20px 10px;
  margin-left:20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#f8f8f8" : "#3b3b9d")};
  }
`;

const ListTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const ListTime = styled.p`
  font-size: 14px;
  color: ${(props) => (props.selected ? "#555" : "#ddd")};
  margin-bottom: 8px;
`;

const ListDescription = styled.p`
  font-size: 14px;
  color: ${(props) => (props.selected ? "#777" : "#bbb")};
`;

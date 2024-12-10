import React from "react";
import styled from "styled-components";

// HomePage 컴포넌트
function HomePage() {
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
  
    return (
      <HomePageContainer>
        {/* 헤더 */}
        <HeaderContainer>
          <HeaderContent>
            <HeaderDate>12월 13일 금요일</HeaderDate>
            <HeaderCount>3건</HeaderCount>
            <HeaderContact>
              <HeaderIcon
                src="https://via.placeholder.com/24"
                alt="Icon"
              />
              <span>010-0000-0000</span>
            </HeaderContact>
          </HeaderContent>
        </HeaderContainer>
  
        {/* 메인 카드 */}
        <MainCard>
          <CardHeader>
            <AlertIcon>⚠️</AlertIcon>
            <CardTitle>현재 방문의 알림 수리 1</CardTitle>
          </CardHeader>
          <CardTime>{data[0].time}</CardTime>
          <CardDescription>{data[0].description}</CardDescription>
        </MainCard>
  
        {/* 리스트 카드 */}
        {data.slice(1).map((item) => (
          <ListCard key={item.id}>
            <ListTitle>{item.title}</ListTitle>
            <ListTime>{item.time}</ListTime>
            <ListDescription>{item.description}</ListDescription>
          </ListCard>
        ))}
      </HomePageContainer>
    );
  }
  
  export default HomePage;

  // Styled Components 정의
const HomePageContainer = styled.div`
background-color: #0b1b63;
color: white;
min-height: 100vh;
padding: 20px;
box-sizing: border-box;
`;

const HeaderContainer = styled.div`
background-color: #1a237e;
color: white;
text-align: center;
padding: 20px 10px;
border-radius: 8px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
margin-bottom: 20px;
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
width:323px;
heigth:123px;
background-color: #2727AD;
color: white;
padding: 16px;
border-radius: 12px;
margin: 20px 30px 20px 30px;
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

const ListCard = styled.div`
width:323px;
heigth:123px;
background-color: white;
color: black;
padding: 16px;
border-radius: 12px;
margin: 20px 30px 20px 30px;
`;

const ListTitle = styled.h3`
font-size: 16px;
font-weight: bold;
margin-bottom: 8px;
`;

const ListTime = styled.p`
font-size: 14px;
color: #555;
`;

const ListDescription = styled.p`
font-size: 14px;
color: #777;
`;
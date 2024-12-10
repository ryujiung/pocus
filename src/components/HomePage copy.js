import React, { useState, useEffect } from "react";
import styled from "styled-components";

function HomePage() {
  const [data, setData] = useState([]); // API 데이터를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric", weekday: "long" };
    const formattedDate = date.toLocaleDateString("ko-KR", options); // 한국어 형식으로 날짜 포맷팅
    setCurrentDate(formattedDate);

    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/cards"); // 실제 API URL로 변경
        if (!response.ok) {
          throw new Error("데이터를 가져오는 데 실패했습니다."); // 에러 처리
        }
        const result = await response.json();
        setData(result); // 데이터 저장
        setLoading(false); // 로딩 완료
      } catch (err) {
        setError(err.message); // 에러 메시지 저장
        setLoading(false); // 로딩 종료
      }
    };

    fetchData();
  }, []); // 컴포넌트가 처음 렌더링될 때 한 번만 실행

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;

  return (
    <HomePageContainer>
      {/* 헤더 */}
      <HeaderContainer>
        <HeaderContent>
          <HeaderDate>{currentDate}</HeaderDate>
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

      {/* 메인 카드 */}
      {data.length > 0 && (
        <MainCard>
          <CardHeader>
            <AlertIcon>⚠️</AlertIcon>
            <CardTitle>{data[0].title}</CardTitle>
          </CardHeader>
          <CardTime>{data[0].time}</CardTime>
          <CardDescription>{data[0].description}</CardDescription>
        </MainCard>
      )}

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

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // API 요청을 위해 Axios 사용
import humanLogo from "../assets/Vector.png";
import CapImage from "../assets/CapLeft.png"

function HomePage() {
  const [currentDate, setCurrentDate] = useState("");
  const [tasks, setTasks] = useState([]); // 작업 데이터를 저장할 상태
  const [selectedCardIds, setSelectedCardIds] = useState([]); // 선택된 카드의 ID 목록
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // useEffect를 사용해 API에서 데이터 가져오기
  useEffect(() => {

    const today = new Date();
    const options = { weekday: "long",month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("ko-KR", options); // 한국어 포맷
    setCurrentDate(formattedDate);

    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // public 폴더의 JSON 파일 경로
        if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
        const data = await response.json();
        setTasks(data); // 데이터를 상태에 저장
        setLoading(false);
      } catch (err) {
        console.error("데이터 가져오기 실패:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);// 컴포넌트가 마운트될 때 한 번 실행

  const handleCardClick = (id, url) => {
    // 이미 선택된 카드인지 확인
    if (selectedCardIds.includes(id)) return; // 이미 선택된 경우 아무 작업도 하지 않음

    // 선택된 ID를 배열에 추가
    setSelectedCardIds((prev) => [...prev, id]);

    // 특정 URL로 새 탭에서 열기
    window.open(url, "_blank");
  };

  // 로딩 중 상태 처리
  if (loading) {
    return <LoadingMessage>Loading...</LoadingMessage>;
  }

  // 에러 상태 처리
  if (error) {
    return <ErrorMessage>데이터를 가져오는 중 오류가 발생했습니다.</ErrorMessage>;
  }

  return (
    <AppContainer>
      <HomePageContainer>
        {/* 헤더 */}
        <HeaderContainer>
          <HeaderContent>
            <HeaderDate><span>{currentDate}</span>
             <HeaderSubText>포동이,작업자</HeaderSubText>
            </HeaderDate>
            <HeaderCount>{tasks.length}건</HeaderCount>
          </HeaderContent>
        </HeaderContainer>

        {/* 리스트 카드 */}
        <ListContainer>
          {tasks.map((task) => (
            <ListCard
              key={task.id}
              selected={selectedCardIds.includes(task.id)} // 선택된 카드인지 확인
              onClick={() =>
                handleCardClick(
                  task.id,
                  `https://discord.com/channels/1316012118360723526/1316565273553141770`
                )
              } // 클릭 시 URL로 이동
            >
              <ListTitle>{task.workname}</ListTitle>
              <ListTime>
                {new Date(task.start_time).toLocaleString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                })}{" "}
                -{" "}
                {new Date(task.end_time).toLocaleString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hourCycle: "h23",
                })}
              </ListTime>
              <ListDescription><span>{task.task_class}</span>
              <span>
              <img 
                  src={humanLogo} 
                  alt="Human Logo" 
                  style={{ width: "16px", height: "16px", marginRight: "8px" }} // 이미지 스타일링
                />
                {task.participants.length}명</span></ListDescription>
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
  width: 420px;
  height: 667px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  background-image: url(${CapImage}); /* 배경 이미지 설정 */
  background-size: cover; /* 배경 이미지 크기 설정 */
  background-position: top -30px left 20px; /* 배경 이미지 위치 설정 */
  background-repeat: no-repeat; /* 배경 이미지 반복 방지 */
`;

const HeaderContainer = styled.div`
  color: white;
  padding: 10px;
  border-radius: 8px;
  margin-left:10px;
  margin-right:22px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
`;

const HeaderDate = styled.h2`
  margin-left: 15px;
  font-size: 24px; /* 날짜 글씨 크기 증가 */
  font-weight: bold;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: flex-start; /* 텍스트 왼쪽 정렬 (중앙 정렬 시 center) */
`;

const HeaderSubText = styled.span`
  margin-left:70px;
  margin-top:10px;
  font-weight:400;
  font-size: 18px; /* 부제목 글씨 크기 */
  color: #7494E4; /* 밝은 회색 */
  font-weight:Semi Bold;
`;

const HeaderCount = styled.div`
  font-size: 64px; /* 건수 크기 증가 */
  font-weight: bold;
  margin-top: 10px;
  color: white;
  text-align: right; /* 왼쪽 정렬 */
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between; /* 좌우 정렬 */
`;

const HeaderContact = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const HeaderIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ListContainer = styled.div`
  width: 100%;
`;

const ListCard = styled.div`
  background-color: ${(props) => (props.selected ? "#ffffff" : "#2727ad")};
  color: ${(props) => (props.selected ? "#000000" : "#ffffff")};
  padding: 10px 10px;
  margin-top:20px;
  margin-bottom: 20px;
  margin-left:30px;
  margin-right:20px;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height:120px;
  width:300px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: ${(props) => (props.selected ? "#f5f5f5" : "#3b3b9d")};
  }
`;

const ListTitle = styled.h3`
  margin-left:20px;
  font-size: 22px;
  margin-top:15px;
  font-weight: bold;
  margin-bottom: 8px;
  width: 200px; /* 너비 지정 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 초과된 텍스트를 "..."로 표시 */
`;

const ListTime = styled.p`
  margin-left:20px;
  margin-top:10px;
  font-size: 20px;
  color: ${(props) => (props.selected ? "#555" : "#ccc")};
`;

const ListDescription = styled.p`
  margin-left:20px;
  margin-right:10px;
  margin-top:-10px;
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 좌우 정렬 */
  font-size: 20px;
  color: ${(props) => (props.selected ? "#777" : "#bbb")};
`;

const LoadingMessage = styled.div`
  font-size: 18px;
  color: #999;
  text-align: center;
`;

const ErrorMessage = styled.div`
  font-size: 18px;
  color: red;
  text-align: center;
`;

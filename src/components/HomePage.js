import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios"; // API 요청을 위해 Axios 사용

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
            <HeaderDate>{currentDate}</HeaderDate>
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
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(task.end_time).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </ListTime>
              <ListDescription>{task.task_class}</ListDescription>
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
  overflow-y: auto;
`;

const HeaderContainer = styled.div`
  background-color: #1a237e;
  color: white;
  text-align: left; /* 텍스트 왼쪽 정렬 */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  margin-left:10px;
  display: flex;
  flex-direction: column; /* 세로 정렬 */
`;

const HeaderDate = styled.h2`
  font-size: 24px; /* 날짜 글씨 크기 증가 */
  margin: 0;
  font-weight: bold;
  text-align: left;
`;

const HeaderSubText = styled.span`
  font-size: 14px; /* 직책명 크기 */
  color: #cccccc; /* 밝은 회색 */
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
  flex-direction: column; /* 날짜와 건수의 세로 정렬 */
  gap: 10px;
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
  padding: 20px 10px;
  margin-bottom: 20px;
  margin-left:15px;
  border-radius: 12px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${(props) => (props.selected ? "#f5f5f5" : "#3b3b9d")};
  }
`;

const ListTitle = styled.h3`
  font-size: 20px;
`;

const ListTime = styled.p`
  font-size: 18px;
  color: ${(props) => (props.selected ? "#555" : "#ccc")};
`;

const ListDescription = styled.p`
  font-size: 18px;
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

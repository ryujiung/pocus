import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Thin/Pretendard-ExtraBold.otf') format('opentype');
    font-weight: 800; /* ExtraBold의 font-weight 설정 */
    font-style: normal;
  }

  body {
    font-family: 'Pretendard', Arial, sans-serif; /* Pretendard를 기본 폰트로 설정 */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;

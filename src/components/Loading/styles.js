import styled from "styled-components";

const LoadingBackdrop = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo escuro com transparência */
  z-index: 9999;

  .loading-logo {
    width: 100px;
    height: 100px;
    animation: pulse 1s infinite ease-in-out;
  }

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export default LoadingBackdrop;

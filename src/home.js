import styled from "styled-components";

const Main = styled.main`
  width: 100vw;
  /* height: 100vh; */
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media (min-width: 1200px) {
    justify-content: space-between;
  }
  /* .productImg {
    width: 90px;
    height: 99px;
    border-radius: 15px;
    background-color: #ffffff;
  } */
`;

export default Main;

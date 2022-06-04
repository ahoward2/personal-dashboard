import styled from "styled-components";

const HomeLayoutWrapper = styled.div`
  .header {
    h1 {
      text-align: center;
    }
    h3 {
      text-align: center;
    }
  }
  .main-content {
    display: flex;
    max-width: 100%;
  }
  .home-layout-left {
    width: 25%;
  }
  .home-layout-right {
    width: 25%;
  }
  .home-layout-middle {
    width: 50%;
  }
`;

export default HomeLayoutWrapper;

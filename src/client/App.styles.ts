import styled from "styled-components";

const AppWrapper = styled.div`
  h1 {
    text-align: center;
  }
  h3 {
    text-align: center;
  }
  .profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 100%;
    max-width: 500px;
  }
  .json-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 20px auto auto 20px;
    padding: 20px 0;
    width: 100%;
    max-width: 500px;
    background-color: #f5f5f5;
`;

export default AppWrapper;

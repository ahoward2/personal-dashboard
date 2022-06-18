import styled from "styled-components";

const SearchFormWrapper = styled.div`
  .search-form {
    padding: 1rem;
    display: flex;
    .label {
      color: lime;
    }
    .column {
      display: flex;
      flex-direction: column;
      padding-left: 0.2rem;
      padding-right: 0.2rem;
    }
    input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus {
      background-color: #000000;
      transition: background-color 600000s 0s, color 600000s 0s;
    }
    input {
      height: 2rem;
      border: solid 1px lime;
      border-radius: 0.2rem;
      padding: 0.2rem;
      background-color: #000000;
      color: lime;
      font-family: "VT323", monospace;
    }
    input:focus {
      border: solid 1px lime;
      outline: none;
    }
    button {
      background-color: #000000;
      border: 1px solid lime;
      border-radius: 0.2rem;
      color: lime;
      font-family: "VT323", monospace;
      height: 2rem;
      align-self: end;
      margin-left: 0.2rem;

  }
`;

export default SearchFormWrapper;

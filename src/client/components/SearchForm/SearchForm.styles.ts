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
  }
`;

export default SearchFormWrapper;

import { styled } from 'styled-components';

const FakeComponent = () => {
  return (
    <StyledDiv>
      <div>Header</div>
    </StyledDiv>
  );
};

export default FakeComponent;

const StyledDiv = styled.div`
  border: 1px salmon solid;
  div {
    border: 1px salmon dashed;
    height: 80px;
    display: grid;
    place-content: center;
  }
`;

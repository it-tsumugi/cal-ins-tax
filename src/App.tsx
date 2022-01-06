import styled from "styled-components";
import { ComponentRouter } from "./router/ComponentRouter";

function App() {
  return (
    <SComponentContainer>
      <ComponentRouter />
    </SComponentContainer>
  );
}
const SComponentContainer = styled.div`
  background-color: skyblue;
  min-height: 100vh;
`;

export default App;

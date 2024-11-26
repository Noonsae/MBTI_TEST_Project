import { GlobalStyle } from "../styles/GlobalStyled";
import { MyProvider } from "./context/MyContext";
import Router from "./shared/Router";

const App = () => {
  return (
    <MyProvider>
      <GlobalStyle />
      <Router />
    </MyProvider>
  );
};

export default App;

import { GlobalStyle } from "../styles/GlobalStyled";

import Router from "./shared/Router";

const App = () => {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router />
    </AuthProvider>
  );
};

export default App;

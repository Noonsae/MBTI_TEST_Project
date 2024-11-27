import { GlobalStyle } from "../styles/GlobalStyled";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./shared/Router";

const App = () => {
  
  return (
    <AuthProvider>
      <GlobalStyle />
      <Router />
      <ToastContainer />
    </AuthProvider>
  );
};

export default App;

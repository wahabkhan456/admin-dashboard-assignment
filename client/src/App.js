import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "./Components/pages/Login/Login";
import Layout from "./Components/pages/Layout";
import { Route } from "react-router-dom";
import "./App.css";
import LanguageSelection from "./Components/atoms/LangSelection/LanguageSelection";
import { checkStatus } from "./store/actions/index";
import NavItems from "./Components/molecules/Navbar/NavItems";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkStatus());
  }, []);
  return (
    <div className="outer">
      <LanguageSelection>
        <NavItems>
          <Route exact path="/" component={Layout} />
          <Route path="/login" component={Login} />
        </NavItems>
      </LanguageSelection>
    </div>
  );
}

export default App;

import React, { useEffect } from "react";

import Home from "./pages/home";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useMediaQuery } from "@chakra-ui/react";

function App() {
  const history = createBrowserHistory();
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
  

        <Router history={history}>
        {isMobile ? <Sidebar /> : <Navbar />}
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/login" component={Login}></Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;

import React from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import LogIn from "./components/LogIn";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <LogIn />
      </div>
    </Provider>
  );
}

export default App;

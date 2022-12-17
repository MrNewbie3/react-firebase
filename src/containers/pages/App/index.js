import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dahsboard from "../dahsboard";
import Login from "../Login";
import Register from "../Register";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../config/redux/";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dahsboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

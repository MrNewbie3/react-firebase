import React, { Component } from "react";
import "./dashboard.scss";
import { Link } from "react-router-dom";
class Dahsboard extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <p>Dahsboard Page</p>
        <div className="input-form">
          <input type="text" className="input-title" name="" id="" placeholder="title" />
          <textarea name="" className="input-content" id="" cols="30" rows="10"></textarea>
          <button className="save-btn">Simpan</button>
        </div>
        <hr />
        <div className="card-content">
          <p className="title">Title</p>
          <p className="date">Tgl</p>
          <p className="content">Notes</p>
        </div>
        <button>
          <Link to={"/Register"}>Go to Register</Link>
        </button>
        <button>
          {" "}
          <Link to={"/Login"}>Go to Login</Link>
        </button>
      </div>
    );
  }
}

export default Dahsboard;

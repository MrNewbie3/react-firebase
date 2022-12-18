import React, { Component, Fragment } from "react";
import "./dashboard.scss";
import { Link } from "react-router-dom";
import { addDataToApi, getDataFromApi, updateDataApi } from "../../../config/redux/action";
import { connect } from "react-redux";
import { ref, update } from "firebase/database";
import { database } from "../../../config/firebase";

class Dahsboard extends Component {
  state = {
    title: "",
    content: "",
    date: "",
    texButton: "simpan",
    noteId: "",
  };

  componentDidMount() {
    const userData = JSON.parse(localStorage.userData);
    this.props.getNotes(userData.uid);
  }

  handleSaveNotes = () => {
    const { title, content, texButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const usereData = JSON.parse(localStorage.getItem("userData"));
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userID: usereData.uid,
    };

    if (texButton === "simpan") {
      saveNotes(data);
      console.log(data);
    } else {
      data.noteId = noteId;
      updateNotes(data);
      console.log(data);
    }
  };
  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };
  updateNotes = (note) => {
    console.log(note);
    this.setState({ title: note.data.title, content: note.data.content, texButton: "Update", noteId: note.id });
  };
  cancelUpdate = () => {
    this.setState({ title: "", content: "", texButton: "simpan" });
  };
  render() {
    const { title, content, date, texButton } = this.state;
    const { notes } = this.props;
    const { updateNotes } = this;
    return (
      <div className="container">
        <p className="big-title">Dahsboard Page</p>
        <div className="input-form">
          <input
            type="text"
            className="input-title"
            name=""
            id="title"
            placeholder="title"
            value={title}
            onChange={(e) => {
              this.handleChange(e, "title");
            }}
          />
          <textarea
            name=""
            className="input-content"
            id="content"
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => {
              this.handleChange(e, "content");
            }}
          ></textarea>
          <div className="action-wrapper">
            {texButton === "Update" ? (
              <button className="save-btn cancel" onClick={this.cancelUpdate}>
                Cancel
              </button>
            ) : (
              <div></div>
            )}
            <button className="save-btn" onClick={this.handleSaveNotes}>
              {texButton}
            </button>
          </div>
        </div>
        <hr />
        {notes != null ? (
          <Fragment>
            {notes.map((note) => {
              return (
                <div
                  className="card-content"
                  key={note.id}
                  onClick={() => {
                    updateNotes(note);
                  }}
                >
                  <p className="title">{note.data.title}</p>
                  <p className="date">{note.data.date}</p>
                  <p className="content">{note.data.content}</p>
                </div>
              );
            })}
          </Fragment>
        ) : null}
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

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes,
});

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => {
    dispatch(addDataToApi(data));
  },
  getNotes: (data) => {
    dispatch(getDataFromApi(data));
  },
  updateNotes: (data) => {
    dispatch(updateDataApi(data));
  },
});

export default connect(reduxState, reduxDispatch)(Dahsboard);

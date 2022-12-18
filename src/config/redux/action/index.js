import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onValue, push, ref, set } from "firebase/database";
import { database } from "../../firebase";

export const actionChangeUserName = () => {
  return (dispatch) => {
    setTimeout(() => {
      return dispatch({ type: "CHANGE_USER", value: "Arthur Norman" });
    }, 2000);
  };
};

export const registerUserApi = (data) => async (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword((data.auth = auth), data.email, data.password);
    // Signed in
    const user = userCredential.user;
    console.log(user);
    dispatch({ type: "CHANGE_LOADING", value: false });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    dispatch({ type: "CHANGE_LOADING", value: false });
  }
};
export const loginUserApi = (data) => async (dispatch) => {
  const auth = getAuth();
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    signInWithEmailAndPassword((data.auth = auth), data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("userData", JSON.stringify(user));
        const userInfo = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          enmailVerified: userCredential.user.emailVerified,
          refreshToken: userCredential.user.refreshToken,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_LOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: userCredential.user });
        resolve(true);
      })
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_LOGIN", value: false });
        reject(false);
      });
    // Signed in
  });
};

export const addDataToApi = (data) => (dispatch) => {
  push(ref(database, "notes/" + data.userID), {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromApi = (userId) => (dispatch) => {
  const urlNotes = ref(database, "notes/" + userId);
  return new Promise((resolve, reject) => {
    onValue(urlNotes, (snapshot) => {
      const data = snapshot.val();
      const dataToArray = [];
      Object.keys(snapshot.val()).map((key) => {
        dataToArray.push({
          id: key,
          data: snapshot.val()[key],
        });
      });

      dispatch({ type: "SET_NOTES", value: dataToArray });
      resolve(snapshot.val);
    });
  });
};
export const updateDataApi = (data) => (dispatch) => {
  const urlNotes = ref(database, `notes/${data.userID}/${data.noteId}`);
  return new Promise((resolve, reject) => {
    set(urlNotes, { title: data.title, content: data.content, date: data.date }, (err) => {
      if (err) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};

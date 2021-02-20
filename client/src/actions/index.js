import { GET_POSTS, ASK_QUESTION, DELETE_POST, ANSWER_QUESTION } from "./types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  //  dispatch(setItemsLoading());
  axios
    .get("/api/posts")
    .then((res) => {
      dispatch({ type: GET_POSTS, payload: res.data });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const answerToQuestion = (answer, id) => (dispatch) => {
  //  dispatch(setItemsLoading());
  axios
    .post(`/api/posts/${id}`, { answer })
    .then((res) => {
      dispatch({ type: ANSWER_QUESTION, payload: { post: res.data, id } });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const ignoreQuestion = (id) => (dispatch) => {
  //  dispatch(setItemsLoading());

  axios
    .delete(`/api/posts/${id}`)
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: id });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const askQuestion = (question) => (dispatch) => {
  //  dispatch(setItemsLoading());
  axios
    .post("/api/posts", { question })
    .then((res) => {
      dispatch({ type: ASK_QUESTION, payload: res.data });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

import { GET_POSTS, ASK_QUESTION,DELETE_POST,ANSWER_QUESTION } from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case ASK_QUESTION:
      return { ...state, posts: [action.payload, ...state.posts] };
      case DELETE_POST:
    return{...state, posts: state.posts.filter(post => post._id != action.payload.id)}
    case ANSWER_QUESTION:
      return{...state, posts: [action.payload.post, ...state.posts.filter(post => post._id != action.payload.id)] }
    default:
      return state;
  }
}

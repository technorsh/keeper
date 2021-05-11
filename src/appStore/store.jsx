import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { initialState } from "./initialState";

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'SETUSER':
      return {
        "user":action.data,
        "isLogin":state.isLogin,
        "notes":state.notes
      };
    case 'SETLOGIN':
      return {
        "user":state.user,
        "isLogin":action.data,
        "notes":state.notes
      }
    case 'SETNOTES':
      return {
        "user":state.user,
        "isLogin":state.isLogin,
        "notes":action.data
      }
    default:
        return state;
  }
}

const composeEnhancers =
  typeof window === 'object' &&
    (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
}) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

export const store = createStore(reducer, enhancer)

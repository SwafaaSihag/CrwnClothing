import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  user: userReducer
});

//check difference between context reducers and reducers in redux.
//every store for it to work need reducers, it allows us to form the state object (root-reducer)
import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";

export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});

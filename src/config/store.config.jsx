import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../reducers/category.reducer";

// volatile data
const store = configureStore({
  reducer: {
    // bind all global states from reducer
    category: categoryReducer,
  },
});

export default store;

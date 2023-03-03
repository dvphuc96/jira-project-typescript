import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./reducers/projectReducer";
import userReducer from "./reducers/userReducer";
import taskReducer from "./reducers/taskReducer";
import projectCategoryReducer from "./reducers/projectCategoryReducer";

export const store = configureStore({
  reducer: {
    projectReducer: projectReducer,
    projectCategoryReducer: projectCategoryReducer,
    userReducer: userReducer,
    taskReducer: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

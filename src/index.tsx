import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, Navigate } from "react-router-dom";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import HomeTemplate from "./Template/HomeTemplate";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Project from "./Pages/Project/Project";
import Profile from "./Pages/Profile/Profile";
import ProjectRegister from "./Pages/Project/ProjectRegister";
import ProjectUpdate from "./Pages/Project/ProjectUpdate";
import TaskRegister from "./Pages/Task/TaskRegister";
import TaskUpdate from "./Pages/Task/TaskUpdate";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
export const history: any = createBrowserHistory();

root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route index element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="project" element={<Project />}></Route>
          <Route path="project/register" element={<ProjectRegister />}></Route>
          <Route path="project/:id" element={<ProjectUpdate />}></Route>
          <Route path="task/register" element={<TaskRegister />}></Route>
          <Route path="task/:id" element={<TaskUpdate />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

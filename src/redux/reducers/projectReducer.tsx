import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { message } from "antd";
import { https } from "../../util/config";
import { history } from "../../index";

export interface ProjectModel {
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: false;
  creator: {
    id: number;
    name: string;
  };
  projectCategory: {
    id: number;
    name: string;
  };
}
export interface ProjectModelCreate {
  projectName: string;
  description: string;
  categoryId: number;
  alias: string;
  creator: number;
}
export interface ProjectModelUpdate {
  id: number;
  projectName: string;
  creator: number;
  description: string;
  categoryId: number;
}

export interface ProjectModelDetail {
  id: number;
  projectName: string;
  creator: {
    id: number;
    name: string;
  };
  description: string;
  projectCategory: {
    id: number;
    name: string;
  };
}

export type projectState = {
  arrProject: ProjectModel[];
  projectRegister: ProjectModelCreate | null;
  projectUpdate: ProjectModelUpdate | null;
  projectDetail: ProjectModelDetail | null;
};

const initialState: projectState = {
  arrProject: [],
  projectRegister: null,
  projectUpdate: null,
  projectDetail: null,
};

const projectReducer = createSlice({
  name: "projectReducer",
  initialState,
  reducers: {
    getAllProjectAction: (
      state: projectState,
      action: PayloadAction<ProjectModel[]>
    ) => {
      state.arrProject = action.payload;
    },
    getDetailProjectAction: (
      state: projectState,
      action: PayloadAction<ProjectModelDetail>
    ) => {
      state.projectDetail = action.payload;
    },
    createProjectAction: (
      state: projectState,
      action: PayloadAction<ProjectModelCreate>
    ) => {
      state.projectRegister = action.payload;
    },
    updateProjectAction: (
      state: projectState,
      action: PayloadAction<ProjectModelUpdate>
    ) => {
      state.projectUpdate = action.payload;
    },
  },
});

export const {
  getAllProjectAction,
  getDetailProjectAction,
  createProjectAction,
  updateProjectAction,
} = projectReducer.actions;

export default projectReducer.reducer;

// Get all project api
export const getAllProjectApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get("/api/Project/getAllProject");
      const action: PayloadAction<ProjectModel[]> = getAllProjectAction(
        result.data.content
      );
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

// Get Detail Project
export const getDetailProjectApi = (id: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get(`/api/Project/getProjectDetail?id=${id}`);
      const action: PayloadAction<ProjectModelDetail> = getDetailProjectAction(
        result.data.content
      );
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

// Create project Api
export const projectRegisterApi = (projectRegister: any) => {
  return async (dispatch: DispatchType) => {
    try {
      projectRegister.categoryId = parseInt(projectRegister.categoryId);
      const result = await https.post(
        "/api/Project/createProjectAuthorize",
        projectRegister
      );
      const action: PayloadAction<ProjectModelCreate> = createProjectAction(
        result.data.content
      );
      dispatch(action);
      const id = result.data.content?.id;
      message.success(`${result.data.message} chuy???n t???i trang update project`);
      if (id) {
        history.push(`/project/${id}`);
      }
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

// Update Project Api
export const projectUpdaterApi = (projectUpdate: ProjectModelUpdate) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.put(
        `/api/Project/updateProject?projectId=${projectUpdate.id}`,
        projectUpdate
      );
      const action: PayloadAction<ProjectModelUpdate> = updateProjectAction(
        result.data.content
      );
      dispatch(action);
      message.success(
        `${result.data.message} chuy???n t???i trang danh s??ch project`
      );
      history.push("/project");
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

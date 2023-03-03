//rxslice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { https } from "../../util/config";
import { message } from "antd";

export interface ProjectCategoryModel {
  id: number;
  projectCategoryName: string;
}
export type projectState = {
  arrProjectCategory: ProjectCategoryModel[];
};
const initialState = {
  arrProjectCategory: [],
};
const projectCategoryReducer = createSlice({
  name: "projectCategoryReducer",
  initialState,
  reducers: {
    getAllProjectCategoryAction: (
      state: projectState,
      action: PayloadAction<ProjectCategoryModel[]>
    ) => {
      state.arrProjectCategory = action.payload;
    },
  },
});

export const { getAllProjectCategoryAction } = projectCategoryReducer.actions;

export default projectCategoryReducer.reducer;

// Get all project category Api
export const getAllProjectCategoryApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get("/api/ProjectCategory");
      const action: PayloadAction<ProjectCategoryModel[]> =
        getAllProjectCategoryAction(result.data.content);
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

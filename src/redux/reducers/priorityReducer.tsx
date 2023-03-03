import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { https } from "../../util/config";
import { message } from "antd";

export interface PriorityModel {
  priorityId: number;
  priority: string;
  description: string;
  alias: string;
  deleted: boolean;
}

export type priorityState = {
  arrPriority: PriorityModel[];
};
const initialState = {
  arrPriority: [],
};

const priorityReducer = createSlice({
  name: "priorityReducer",
  initialState,
  reducers: {
    getAllPriorityAction: (
      state: priorityState,
      action: PayloadAction<PriorityModel[]>
    ) => {
      state.arrPriority = action.payload;
    },
  },
});

export const { getAllPriorityAction } = priorityReducer.actions;

export default priorityReducer.reducer;

export const getAllPriorityApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get("/api/Priority/getAll");
      const action: PayloadAction<PriorityModel[]> = getAllPriorityAction(
        result.data.content
      );
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

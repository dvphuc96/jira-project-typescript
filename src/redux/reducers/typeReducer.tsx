import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { https } from "../../util/config";
import { message } from "antd";

export interface TypeModel {
  id: number;
  taskType: string;
}

export type typeState = {
  arrType: TypeModel[];
};
const initialState = {
  arrType: [],
};

const typeReducer = createSlice({
  name: "typeReducer",
  initialState,
  reducers: {
    getAllTypeAction: (
      state: typeState,
      action: PayloadAction<TypeModel[]>
    ) => {
      state.arrType = action.payload;
    },
  },
});

export const { getAllTypeAction } = typeReducer.actions;

export default typeReducer.reducer;

export const getAllTypeApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get("/api/TaskType/getAll");
      const action: PayloadAction<TypeModel[]> = getAllTypeAction(
        result.data.content
      );
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

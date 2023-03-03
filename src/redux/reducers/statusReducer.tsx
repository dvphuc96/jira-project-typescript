import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { https } from "../../util/config";
import { message } from "antd";

export interface StatusModel {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: boolean;
}

export type statusState = {
  arrStatus: StatusModel[];
};
const initialState = {
  arrStatus: [],
};

const statusReducer = createSlice({
  name: "statusReducer",
  initialState,
  reducers: {
    getAllStatusAction: (
      state: statusState,
      action: PayloadAction<StatusModel[]>
    ) => {
      state.arrStatus = action.payload;
    },
  },
});

export const { getAllStatusAction } = statusReducer.actions;

export default statusReducer.reducer;

export const getAllStatusApi = () => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get("/api/Status/getAll");
      const action: PayloadAction<StatusModel[]> = getAllStatusAction(
        result.data.content
      );
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

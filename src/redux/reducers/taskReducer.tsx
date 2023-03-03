import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { message } from "antd";
import { https } from "../../util/config";
import { history } from "../../index";

export interface TaskModelRegister {
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}

export interface TaskModelUpdate {
  taskId: string;
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}

export type taskState = {
  taskRegister: TaskModelRegister | null;
  taskUpdate: TaskModelUpdate | null;
};
const initialState: taskState = {
  taskRegister: null,
  taskUpdate: null,
};

const taskReducer = createSlice({
  name: "taskReducer",
  initialState,
  reducers: {
    createTaskAction: (
      state: taskState,
      action: PayloadAction<TaskModelRegister>
    ) => {
      state.taskRegister = action.payload;
    },
    updateTaskAction: (
      state: taskState,
      action: PayloadAction<TaskModelUpdate>
    ) => {
      state.taskUpdate = action.payload;
    },
  },
});

export const { createTaskAction, updateTaskAction } = taskReducer.actions;

export default taskReducer.reducer;

// Create Task Api
export const taskRegisterApi = (taskRegister: any) => {
  return async (dispatch: DispatchType) => {
    try {
      taskRegister.projectId = parseInt(taskRegister.projectId);
      taskRegister.typeId = parseInt(taskRegister.typeId);
      taskRegister.priorityId = parseInt(taskRegister.priorityId);
      const result = await https.post("/api/Project/createTask", taskRegister);
      const action: PayloadAction<TaskModelRegister> = createTaskAction(
        result.data.content
      );
      dispatch(action);
      console.log("result", result.data.content);
      history.push("/task");
      message.success(`${result.data.message} mở consolog để coi kết quả nhé`);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

// Update Task Api
export const taskUpdaterApi = (taskUpdate: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.put("/api/Project/updateTask", taskUpdate);
      const action: PayloadAction<TaskModelUpdate> = updateTaskAction(
        result.data.content
      );
      dispatch(action);
      message.success(result.data.message);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

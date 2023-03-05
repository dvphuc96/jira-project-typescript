import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { message } from "antd";
import { https } from "../../util/config";
import { history } from "../../index";

export interface PriorityTask {
  priorityId: number;
  priority: string;
}
export interface TaskTypeDetail {
  id: number;
  taskType: string;
}
export interface TaskModelDetail {
  priorityTask: PriorityTask;
  taskTypeDetail: TaskTypeDetail;
  assigness: [];
  lstComment: [];
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: number;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}
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
  taskDetail: TaskModelDetail | null;
};
const initialState: taskState = {
  taskRegister: null,
  taskUpdate: null,
  taskDetail: null,
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
    getDetailTaskAction: (
      state: taskState,
      action: PayloadAction<TaskModelDetail>
    ) => {
      state.taskDetail = action.payload;
    },
  },
});

export const { createTaskAction, updateTaskAction, getDetailTaskAction } =
  taskReducer.actions;

export default taskReducer.reducer;

// Create Task Api
export const taskRegisterApi = (taskRegister: TaskModelRegister) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.post("/api/Project/createTask", taskRegister);
      const action: PayloadAction<TaskModelRegister> = createTaskAction(
        result.data.content
      );
      dispatch(action);
      message.success(`${result.data.message} chuyển tới trang update task`);
      const id = result.data.content?.taskId;
      if (id) {
        history.push(`/task/${id}`);
      }
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

// Update Task Api
export const taskUpdaterApi = (taskUpdate: TaskModelUpdate) => {
  return async (dispatch: DispatchType) => {
    try {
      taskUpdate.taskId = taskUpdate.taskId.toString();
      const result = await https.post("/api/Project/updateTask", taskUpdate);
      const action: PayloadAction<TaskModelUpdate> = updateTaskAction(
        result.data.content
      );
      dispatch(action);
      message.success(`${result.data.message} chuyển tới trang danh sách task`);
      history.push("/task");
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

// Get Task Detail Api
// id:TaskModelDetail["taskId"]
export const getDetailTaskApi = (id: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.get(`/api/Project/getTaskDetail?taskId=${id}`);
      const action: PayloadAction<TaskModelDetail> = getDetailTaskAction(
        result.data.content
      );
      dispatch(action);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

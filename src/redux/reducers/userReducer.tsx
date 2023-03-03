import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DispatchType } from "../configStore";
import { message } from "antd";
import { history } from "../../index";
import {
  ACCESS_TOKEN,
  getStoreJson,
  https,
  saveStore,
  saveStoreJson,
  USER_LOGIN,
  USER_PROFILE,
  USER_REGISTER,
} from "../../util/config";

export interface UserModel {
  email: string;
  passWord: string;
  name: string;
  phoneNumber: string;
}

export interface UserModelLogin {
  email: string;
  passWord: string;
}

export interface UserModelUpdate {
  id: string;
  passWord: string;
  email: string;
  name: string;
  phoneNumber: string;
}
export type userState = {
  userLogin: UserModelLogin[];
  userUpdate: UserModelUpdate[];
  userRegister: UserModel[];
};

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
  userUpdate: getStoreJson(USER_PROFILE),
  userRegister: getStoreJson(USER_REGISTER),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUserLoginAction: (
      state: userState,
      action: PayloadAction<UserModelLogin[]>
    ) => {
      state.userLogin = action.payload;
    },
    createUserAction: (
      state: userState,
      action: PayloadAction<UserModel[]>
    ) => {
      state.userRegister = action.payload;
    },

    updateUserAction: (
      state: userState,
      action: PayloadAction<UserModelUpdate[]>
    ) => {
      state.userUpdate = action.payload;
    },
  },
});

export const { getUserLoginAction, createUserAction, updateUserAction } =
  userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.post("/api/Users/signin", userLogin);
      history.push("profile");
      const action: PayloadAction<UserModelLogin[]> = getUserLoginAction(
        result.data.content
      );
      dispatch(action);
      saveStore(ACCESS_TOKEN, result.data.content.accessToken);
      saveStoreJson(USER_LOGIN, result.data.content);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

export const loginFacebookApi = (facebookToken:any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.post("/api/Users/facebooklogin", facebookToken);
      history.push("profile");
      const action: PayloadAction<UserModelLogin[]> = getUserLoginAction(
        result.data.content
      );
      dispatch(action);
      saveStore(ACCESS_TOKEN, result.data.content.accessToken);
      saveStoreJson(USER_LOGIN, result.data.content);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};

export const userRegisterApi = (userRegister: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.post("/api/Users/signup", userRegister);
      const action: PayloadAction<UserModel[]> = createUserAction(
        result.data.content
      );
      dispatch(action);
      history.push("login");
      message.success(result.data.message);
    } catch (err: any) {
      message.error(`${err.responese.data.content}`);
    }
  };
};
export const userUpdateApi = (userUpdate: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const result = await https.post("/api/Users/editUser", userUpdate);
      const action: PayloadAction<UserModelUpdate[]> = updateUserAction(
        result.data.content
      );
      dispatch(action);
      saveStoreJson(USER_PROFILE, result.data.content);
      message.success(result.data.message);
    } catch (err) {
      console.log(err);
    }
  };
};

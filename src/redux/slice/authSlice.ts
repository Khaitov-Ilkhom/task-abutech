import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TInitialState = {
  token: string | null
}
const initialState: TInitialState = {
  token: localStorage.getItem("token") || null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      localStorage.setItem("token", state.token as string)
    },
    logOut: (state) => {
      state.token = null
      localStorage.removeItem("token")
    }
  }
})

export const {reducer} = authSlice
export const {signIn, logOut} = authSlice.actions;
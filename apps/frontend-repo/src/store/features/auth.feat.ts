import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authFeature = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => { state.loading = true; state.error = null; },
    loginSuccess: (state, action) => { state.loading = false; state.user = action.payload; },
    loginFailure: (state, action) => { state.loading = false; state.error = action.payload; },
    logout: (state) => { state.user = null; state.error = null; },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authFeature.actions;
export default authFeature.reducer;

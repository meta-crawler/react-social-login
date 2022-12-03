import { createSlice } from "@reduxjs/toolkit";
// import { createSelector } from "reselect";
// import axios from "axios";

const Authslice = createSlice({
  name: "auth",
  initialState: {
    provider: null,
    isAuthenticated: null,
    loading: false,
    user: {},
  },
  reducers: {
    loginSuccess: (auth, { payload }) => {
      auth.isAuthenticated = true;
      auth.user = payload;
    },
    loginFailed: (auth) => {
      auth.user = {};
      auth.isAuthenticated = false;
    },
    setProvider: (auth, { payload }) => {
      auth.provider = payload;
    },

    clearAuth: (auth) => {
      auth.provider = null;
      auth.token = null;
      auth.user = {};
      auth.isAuthenticated = false;
      auth.loading = false;
    },
    // // command - event
    // // addBug - bugAdded
    // resolveBug (command) - bugResolved (event)
    setLoading: (auth, action) => {
      auth.loading = action.payload;
    },
  },
});

export const { setLoading, setProvider, clearAuth } = Authslice.actions;

export default Authslice.reducer;

//actions

export const login =
  ({ user, provider, error }) =>
    async (dispatch) => {
      try {
        dispatch(setLoading(true));
        dispatch(setProvider(provider));
        if (error) throw error;
        dispatch(Authslice.actions.loginSuccess(user));
      } catch (err) {
        console.log(err.message);
        dispatch(Authslice.actions.loginFailed());
      } finally {
        dispatch(setLoading(false));
      }
    };

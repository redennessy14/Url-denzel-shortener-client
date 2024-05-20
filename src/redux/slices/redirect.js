import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export const fetchRedirect = createAsyncThunk(
  "redirect/fetchRedirect",
  async ({ shortLink }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${shortLink}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRedirect.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRedirect.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRedirect.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const redirectReducer = redirectSlice.reducer;

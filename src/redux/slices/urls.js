import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios.js";
import { BASE_URL } from "../../utils/constants";

export const fetchUrls = createAsyncThunk("urls/fetchUrls", async (userId) => {
  const { data } = await axios.get(`${BASE_URL}/urls/`);
  console.log(data);
  return data;
});

export const fetchUrlDetails = createAsyncThunk(
  "urls/fetchUrlDetails",
  async (id) => {
    const { data } = await axios.get(`${BASE_URL}/urls/${id}`);
    return data;
  }
);

export const fetchEdit = createAsyncThunk(
  "urls/fetchEdit",
  async ({ id, data }) => {
    const response = await axios.patch(`${BASE_URL}/urls/${id}`, data);
    return response.data;
  }
);

export const fetchRemoveUrl = createAsyncThunk(
  "urls/fetchRemoveUrl",
  async (id) => {
    await axios.delete(`${BASE_URL}/urls/${id}`);
    return id;
  }
);

export const fetchQr = createAsyncThunk("urls/fetchQr", async (id) => {
  await axios.get(`${BASE_URL}/urls/${id}/qr`);
  return id;
});

const initialState = {
  items: [],
  status: "idle",
};

const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUrls.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchUrls.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchUrls.rejected, (state) => {
        state.items = [];
        state.status = "error";
      })
      .addCase(fetchUrlDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUrlDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.urlDetails = action.payload;
      })
      .addCase(fetchUrlDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchRemoveUrl.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(fetchEdit.fulfilled, (state, action) => {
        const editedItem = action.payload;
        state.items = state.items.map((item) =>
          item.id === editedItem.id ? editedItem : item
        );
        state.status = "succeeded";
      })
      .addCase(fetchQr.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQr.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(fetchQr.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const urlsReducer = urlsSlice.reducer;

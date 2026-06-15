import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadImagen } from "../services/cloudinaryService";

export const uploadImagenThunk = createAsyncThunk(
  "galeria/upload",
  async (file, { rejectWithValue }) => {
    try { return await uploadImagen(file); }
    catch (err) { return rejectWithValue(err.message); }
  }
);

const galeriaSlice = createSlice({
  name: "galeria",
  initialState: {
    subiendo: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImagenThunk.pending,   (state) => { state.subiendo = true; })
      .addCase(uploadImagenThunk.fulfilled, (state) => { state.subiendo = false; })
      .addCase(uploadImagenThunk.rejected,  (state) => { state.subiendo = false; });
  },
});

export default galeriaSlice.reducer;

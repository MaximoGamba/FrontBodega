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
    error:    null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImagenThunk.pending,   (state) => { state.subiendo = true;  state.error = null; })
      .addCase(uploadImagenThunk.fulfilled, (state) => { state.subiendo = false; })
      .addCase(uploadImagenThunk.rejected,  (state, action) => { state.subiendo = false; state.error = action.payload; });
  },
});

export default galeriaSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoofState } from "./store";

const PersistSlice = createSlice({
  name: "persist",
  initialState: {
    persist: false,
  },
  reducers: {
    togglePersist(state) {
      state.persist = !state.persist;
    },
  },
});

export const persistSelector = (state: RoofState) => state.persist.persist;

export default PersistSlice;

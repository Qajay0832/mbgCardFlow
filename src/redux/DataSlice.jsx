import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Array of objects: { name: "some value", data: { ... } }
};

const customSlice = createSlice({
  name: "custom",
  initialState,
  reducers: {
    addItem: (state, action) => {
      // expects: { name: "...", data: { ... } }
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      // expects: name string to remove by name
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearItems } = customSlice.actions;
export default customSlice.reducer;

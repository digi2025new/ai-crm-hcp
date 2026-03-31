import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hcp_name: "",
  date: "",
  time: "",
  interaction_type: "",
  attendees: "",
  topics: "",
  materials_shared: "",
  samples: "",
  sentiment: "",
  outcomes: "",
  follow_up: "",
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    setInteraction: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearInteraction: () => initialState,
  },
});

export const { setInteraction, clearInteraction } = interactionSlice.actions;
export default interactionSlice.reducer;
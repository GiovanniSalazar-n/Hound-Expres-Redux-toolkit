import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  history: {}
};

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    addGuide: (state, action) => {
      state.list.push(action.payload);
      state.history[action.payload.number] = [
        {
          estado: action.payload.state,
          fecha: action.payload.date,
        },
      ];
    },
    updateGuideState: (state, action) => {
      const guide = state.list.find((g) => g.number === action.payload);
      if (guide) {
        let newState = "";
        if (guide.state === "Pendiente") newState = "En tránsito";
        else if (guide.state === "En tránsito") newState = "Entregado";
        else return;

        guide.state = newState;

        const entry = {
          estado: newState,
          fecha: guide.date,
        };
        
        if (state.history[guide.number]) {
          state.history[guide.number].push(entry);
        } else {
          state.history[guide.number] = [entry];
        }
      }
    }
  }
});

export const { addGuide, updateGuideState } = guidesSlice.actions;
export default guidesSlice.reducer;

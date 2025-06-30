import guideReducer, { updateGuideState } from "../../redux/slices/guideSlice";
describe('test status change', () => { 
it("should update status from guide", () => {
  const initialState = {
    list: [
      { number: "1", state: "Pendiente", date: "2025-06-30", origin: "", destination: "", receiver: "" }
    ],
    history: {
      "1": [{ estado: "Pendiente", fecha: "2025-06-30" }]
    }
  };

  const intermediate = guideReducer(initialState, updateGuideState("1"));
  expect(intermediate.list[0].state).toBe("En tránsito");

  const final = guideReducer(intermediate, updateGuideState("1"));
  expect(final.list[0].state).toBe("Entregado");

  const noChange = guideReducer(final, updateGuideState("1"));
  expect(noChange.list[0].state).toBe("Entregado"); 
});
 })

import guideReducer, { addGuide, updateGuideState } from "../../redux/slices/guideSlice";
describe('slice tests', () => { 
it("Should add guide with addguide action", () => {
  const state = { list: [], history: {} };

  const action = addGuide({
    number: "001",
    origin: "A",
    destination: "B",
    receiver: "C",
    date: "2025-06-30",
    state: "Pendiente",
  });

  const newState = guideReducer(state, action);

  expect(newState.list).toHaveLength(1);
  expect(newState.history["001"]).toEqual([
    { estado: "Pendiente", fecha: "2025-06-30" }
  ]);
});

it(" should change status of guide with updateGuideState", () => {
  const state = {
    list: [{ number: "001", state: "Pendiente", date: "2025-06-30" }],
    history: { "001": [{ estado: "Pendiente", fecha: "2025-06-30" }] }
  };

  const updated = guideReducer(state, updateGuideState("001"));
  expect(updated.list[0].state).toBe("En tránsito");
  expect(updated.history["001"]).toHaveLength(2);
});
})
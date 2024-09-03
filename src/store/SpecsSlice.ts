import {createSlice} from '@reduxjs/toolkit'
import {Side} from "../pages/MaterialsPage.tsx";

export interface SpecsType {
  sides: Side[][],
  currentID: number
}
const initialState: SpecsType = {
  sides: [[]],
  currentID: 0,
}

const SpecsSlice = createSlice({
  name: "specsSlice",
  initialState, //the initial state of the slice
  reducers: {
    setSides: (state, action: {payload: Side[][]}) => {
      state.sides = action.payload
    },
    setCurrentID: (state, action: {payload: number}) => {
      state.currentID = action.payload
    }
  }, // action methods
})

export const SpecsServices = {
  actions: SpecsSlice.actions, //This includes all the action methods written above
}

const SpecsReducer = SpecsSlice.reducer //This is stored in the main store
export default SpecsReducer
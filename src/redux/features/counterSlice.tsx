import { createSlice } from "@reduxjs/toolkit";

interface CounterType {
	count: number;
}

const initialState: CounterType = { count: 0 };

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			// REDUX CORE FUNCDAMENTALS => REDUX STATE CAN NOT BE MUTATED
			state.count = state.count + 1;
		},
		decrement: (state) => {
			state.count = state.count - 1;
		},
	},
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;

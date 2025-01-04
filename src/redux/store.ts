import { configureStore } from "@reduxjs/toolkit";
// import counterSlice from "./features/counterSlice";
// import taskReducer from "./features/task/taskSlice";
// import userReducer from "./features/user/userSlice";
import { baseApi } from "./api/baseApi";
// import logger from "./middlewares/logger";

export const store = configureStore({
	// reducer: { counter: counterSlice, todo: taskReducer, user: userReducer }, // WE CAN ADD MULTIPLE REDUCERS HERE
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // SINCE REDUX HAS SOME MIDDLEWARES BY DEFAULT, WE NEED TO CONCAT OURS TO THEM, SO IT DOES NOT REPLACE THEM
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

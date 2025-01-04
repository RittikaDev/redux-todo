import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "baseApi", // HAVE TO CONNECT TO REDUCER
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
	tagTypes: ["task"], // WITHOUT THIS SO FAR, AFTER DOING A POST REQUEST, THE CHANGES ARE NOT IMMEDIATELY SHOWN, FOR THIS WE NEED TO PASS THIS TAG WHICH A CASHE THAT WE ARE GENERATING
	endpoints: (builder) => ({
		getTasks: builder.query({
			query: () => "/tasks",
			providesTags: ["task"], // PASSING THE CACHE TAG
		}),
		createTask: builder.mutation({
			query: (taskData) => ({
				url: "/tasks",
				method: "POST",
				body: taskData,
			}),
			invalidatesTags: ["task"], // INVALIDATES THE CACHE, BECAUSE A NEW TASK IS ADDED, NOW THE CHANGES ARE IMMEDIATELY SHOWN. REDUX WILL CALL THE GETTASKS QUERY AUTOMATICALLY AND GET THE NEW DATA, YOU WILL SEE TWO REQUESTS IN NETWORK TAB
		}),
	}),
});

export const { useGetTasksQuery, useCreateTaskMutation } = baseApi; // GENERATES A HOOK AUTOMATICALLY, CONNECT THIS TO REDUCER (STORE)

// builder.query => GET
// builder.mutation => POST, PUT, DELETE

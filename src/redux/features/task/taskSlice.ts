// import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { removeUser } from "../user/userSlice";
// import { v4 as uuidv4 } from "uuid";

interface InitialState {
	tasks: ITask[];
	filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
	tasks: [
		{
			id: "DFBG",
			title: "Task 1",
			description: "This is task 1",
			dueDate: "2021-12",
			isCompleted: true,
			priority: "high",
			assignedTo: null,
		},
		{
			id: "fhjdbghk",
			title: "Task 2",
			description: "This is task 2",
			dueDate: "2021-12",
			isCompleted: false,
			priority: "low",
			assignedTo: null,
		},
		{
			id: "sgbkjrs",
			title: "Task 3",
			description: "This is task 3",
			dueDate: "2021-12",
			isCompleted: false,
			priority: "medium",
			assignedTo: null,
		},
	],
	filter: "all",
};

// CREATING A DRAFT TASK TYPE SINCE I AM NOT SENDING ALL THE PROPERTIES OF ITask
type DraftTask = Pick<
	ITask,
	"title" | "description" | "priority" | "dueDate" | "assignedTo"
>; // PICK BASICALLY MEANS THAT I CAN ONLY PICK THESE PROPERTIES FROM ITask

const createTask = (task: DraftTask): ITask => {
	return {
		...task,
		id: nanoid(), // SIMILAR TO UUID, BUT IT IS A BIT SHORTER
		isCompleted: false, // IT IS BETTER TO USE A DEFAULT VALUE IN THE REDUCER, NOT IN THE COMPONENT, BECAUSE IF YOU END UP USING THE SAME REDUCER IN ANOTHER COMPONENT, YOU WILL HAVE TO REPEAT THE DEFAULT VALUE SETUP PROCESS AGAIN
		assignedTo: task.assignedTo || null,
	};
};

const taskSlice = createSlice({
	name: "task",
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<DraftTask>) => {
			const taskData = createTask(action.payload);
			state.tasks.push(taskData); // WILL NOT MUTATE THE STATE SINCE IMMER IS WORKING BEHIND THE SCENES
		},
		// action: PayloadAction<string> => BECAUSE ONLY GOING TO CHANGE THE isCompleted PROPERTY OF THE TASK, SO I ONLY NEED THE ID
		toggleCompleteState: (state, action: PayloadAction<string>) => {
			const task = state.tasks.find((task) => task.id === action.payload);
			if (task) {
				task.isCompleted = !task.isCompleted;
			}
		},
		deleteTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload); // RETURNS AN ARRAY EXCLUDING THE TASK WITH THE ID
		},
		updateTask: (state, action: PayloadAction<ITask>) => {
			const { id, title, description, priority, dueDate, isCompleted } =
				action.payload;
			state.tasks.find((task) => {
				if (task.id === id) {
					task.title = title;
					task.description = description;
					task.priority = priority;
					task.dueDate = dueDate;
					task.isCompleted = isCompleted;
				}
			});

			// if (task) {
			//   Object.assign(task, {
			//     title,
			//     description,
			//     priority,
			//     dueDate,
			//   });
			// }
		},
		updateFilter: (
			state,
			action: PayloadAction<"all" | "high" | "medium" | "low">
		) => {
			state.filter = action.payload;
		},
	},
	// WHEN SLICE IS DEPENDING ON THINGS THAT ARE NOT PART OF TASKS BUT SOMETHING ELSE IN THE STATE, THEN WE CAN USE BELOW,
	extraReducers: (builder) => {
		builder.addCase(removeUser, (state, action) => {
			// WHEN removeUser IS TAKING PLACE, THIS WILL ALSO RUN
			const userId = action.payload;
			state.tasks.forEach((task) => {
				if (task.assignedTo === userId) {
					task.assignedTo = null;
				}
			});
		});
	},
});

// export const selectTasks = (state: RootState) => {
// 	const filter = state.todo.filter;
// 	if (filter === "low")
// 		return state.todo.tasks.filter((task) => task.priority === "low");
// 	else if (filter === "medium")
// 		return state.todo.tasks.filter((task) => task.priority === "medium");
// 	else if (filter === "high")
// 		return state.todo.tasks.filter((task) => task.priority === "high");
// 	else return state.todo.tasks;
// };
// export const selectFilter = (state: RootState) => state.todo.filter;

export const {
	addTask,
	toggleCompleteState,
	deleteTask,
	updateTask,
	updateFilter,
} = taskSlice.actions;
export default taskSlice.reducer;

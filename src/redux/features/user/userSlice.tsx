import { RootState } from "@/redux/store";
import { IUser } from "@/types";
import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

interface InitialState {
  users: IUser[];
}

const initialState: InitialState = {
  users: [],
};

// CREATING A DRAFT TASK TYPE SINCE I AM NOT SENDING ALL THE PROPERTIES OF ITask
type DraftUser = Pick<IUser, "name">; // PICK BASICALLY MEANS THAT I CAN ONLY PICK THESE PROPERTIES FROM ITask

const createUser = (user: DraftUser): IUser => {
  return {
    ...user,
    id: nanoid(), // SIMILAR TO UUID, BUT IT IS A BIT SHORTER
  };
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      const user = createUser(action.payload);
      state.users.push(user);
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
});

export const selectUsers = (state: RootState) => state.user.users;

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

import { AddTask } from "@/components/tasks/AddTask";
// import UserCard from "@/components/user/UserCard";
// import { selectUsers } from "@/redux/features/user/userSlice";
// import { useAppSelector } from "@/redux/hook";

export default function Users() {
	// const users = useAppSelector(selectUsers);

	// console.log(users);
	return (
		<div className="mx-auto max-w-7xl px-5 mt-20">
			<div className="flex justify-end items-center gap-5">
				<h1 className="mr-auto">Users</h1>
				<AddTask />
			</div>
			<div className="flex mt-5 gap-3">
				{/* {users.map((user) => (
					<UserCard user={user} key={user.id} />
				))} */}
			</div>
		</div>
	);
}

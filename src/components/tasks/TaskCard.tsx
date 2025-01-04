import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { ITask } from "@/types";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
	deleteTask,
	toggleCompleteState,
} from "@/redux/features/task/taskSlice";
import { UpdateTask } from "./UpdateTask";
import { selectUsers } from "@/redux/features/user/userSlice";

type TProps = {
	task: ITask;
};

export default function TaskCard({ task }: TProps) {
	const users = useAppSelector(selectUsers);
	const assignedToUsers = users.find((user) =>
		task.assignedTo?.includes(user.id)
	);
	const dispatch = useAppDispatch();

	return (
		<div className="border px-5 py-3 rounded-md">
			<div className="flex justify-between items-center">
				<div className="flex gap-2 items-center">
					<div
						className={cn("size-3 rounded-full ", {
							"bg-green-500": task.priority === "low",
							"bg-yellow-500": task.priority === "medium",
							"bg-red-500": task.priority === "high",
						})}
					></div>
					<h1 className={cn({ "line-through": task.isCompleted })}>
						{task.title}
					</h1>
				</div>
				<div className="flex gap-3 items-center">
					<Button
						onClick={() => dispatch(deleteTask(task.id))}
						variant="link"
						className="p-0 text-red-500"
					>
						<Trash />
					</Button>
					<UpdateTask task={task} key={task.id} />
					<Checkbox
						checked={task.isCompleted}
						onClick={() => dispatch(toggleCompleteState(task.id))}
					/>
				</div>
			</div>
			<p>Assigned to - {assignedToUsers ? assignedToUsers.name : "No One"}</p>
			<p className="mt-5">{task.description}</p>
		</div>
	);
}

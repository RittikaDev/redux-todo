import { AddTask } from "@/components/tasks/AddTask";
import TaskCard from "@/components/tasks/TaskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetTasksQuery } from "@/redux/api/baseApi";
import { updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch } from "@/redux/hook";
import { ITask } from "@/types";

export default function Tasks() {
	// const tasks = useAppSelector(selectTasks);
	const dispatch = useAppDispatch();

	// AFTER RTK-QUERY
	const { data, isLoading } = useGetTasksQuery(undefined);

	if (isLoading) return <div>Loading...</div>;
	return (
		<div className="mx-auto max-w-7xl px-5 mt-20">
			<div className="flex justify-end items-center gap-5">
				<h1 className="mr-auto">Tasks</h1>
				<Tabs defaultValue="all">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger
							onClick={() => dispatch(updateFilter("all"))}
							value="all"
						>
							All
						</TabsTrigger>
						<TabsTrigger
							onClick={() => dispatch(updateFilter("low"))}
							value="low"
						>
							low
						</TabsTrigger>
						<TabsTrigger
							onClick={() => dispatch(updateFilter("medium"))}
							value="medium"
						>
							medium
						</TabsTrigger>
						<TabsTrigger
							onClick={() => dispatch(updateFilter("high"))}
							value="high"
						>
							high
						</TabsTrigger>
					</TabsList>
				</Tabs>
				<AddTask />
			</div>
			<div className="space-y-5 mt-5">
				{/* {tasks.map((task) => (
					<TaskCard task={task} key={task.id} />
				))} */}
				{/* AFTER RTL-QUERY */}
				{!isLoading &&
					data.tasks.map((task: ITask) => (
						<TaskCard task={task} key={task.id} />
					))}
			</div>
		</div>
	);
}

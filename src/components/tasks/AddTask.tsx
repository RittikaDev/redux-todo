import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addTask } from "@/redux/features/task/taskSlice";
import { ITask } from "@/types";
import { selectUsers } from "@/redux/features/user/userSlice";
import { useState } from "react";
import { useCreateTaskMutation } from "@/redux/api/baseApi";

export function AddTask() {
	// const dispatch = useAppDispatch();
	// const users = useAppSelector(selectUsers);

	const [open, setOpen] = useState(false);
	const form = useForm<ITask>();

	const [createTask, { data, isLoading, isError }] = useCreateTaskMutation();

	const onSubmit: SubmitHandler<FieldValues> = async (data) => {
		// console.log(data); // THIS DATA IS BASICALLY BEING PASSED ON taskSlice AS ACTION
		// dispatch(addTask(data as ITask)); // THIS IS THE ACTION

		// AFTER RTK-QUERY
		const taskData = {
			...data,
			isCompleted: false,
		};

		const res = await createTask(taskData).unwrap();
		console.log(res);
		setOpen(false);
		form.reset();
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Add Task</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogDescription className="sr-only">Fill up form</DialogDescription>
				<DialogHeader>
					<DialogTitle>Add Task</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel />
									<FormControl>
										<Textarea
											{...field}
											value={field.value || ""}
											placeholder="Task title"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel />
									<FormControl>
										<Input
											{...field}
											value={field.value || ""}
											placeholder="Task title"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="priority"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Priority</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a priority" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="low">low</SelectItem>
											<SelectItem value="medium">medium</SelectItem>
											<SelectItem value="high">high</SelectItem>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="assignedTo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Assigned to</FormLabel>
									<Select onValueChange={field.onChange}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a user to assign" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{/* {users.map((user) => (
												<SelectItem key={user.id} value={user.id}>
													{user.name}
												</SelectItem>
											))} */}
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dueDate"
							render={({ field }) => (
								<FormItem className="flex flex-col">
									<FormLabel>Due Date</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														" pl-3 text-left font-normal",
														!field.value && "text-muted-foreground"
													)}
												>
													{field.value ? (
														format(field.value, "PPP")
													) : (
														<span>Pick a date</span>
													)}
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												// disabled={(date) =>
												//   date > new Date() || date < new Date("1900-01-01")
												// }
												initialFocus
											/>
										</PopoverContent>
									</Popover>
									<FormDescription>
										Your date of birth is used to calculate your age.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button className="mt-5" type="submit">
								Save changes
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

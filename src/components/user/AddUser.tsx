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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";

import { useAppDispatch } from "@/redux/hook";
import { IUser } from "@/types";
import { addUser } from "@/redux/features/user/userSlice";

export function AddTask() {
	const form = useForm<IUser>();
	const dispatch = useAppDispatch();

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		console.log(data); // THIS DATA IS BASICALLY BEING PASSED ON taskSlice AS ACTION
		dispatch(addUser(data as IUser)); // THIS IS THE ACTION
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Add User</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogDescription className="sr-only">Fill up form</DialogDescription>
				<DialogHeader>
					<DialogTitle>Add User</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel />
									<FormControl>
										<Textarea
											{...field}
											value={field.value || ""}
											placeholder="User Name"
										/>
									</FormControl>
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

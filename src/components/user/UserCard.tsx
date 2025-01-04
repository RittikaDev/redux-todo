import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { IUser } from "@/types";
import { useAppDispatch } from "@/redux/hook";
import { removeUser } from "@/redux/features/user/userSlice";

type TProps = {
	user: IUser;
};

export default function UserCard({ user }: TProps) {
	const dispatch = useAppDispatch();

	return (
		<div className="border border-green-500 px-5 py-3 rounded-md w-3/12">
			<div className="flex justify-between items-center">
				<div className="flex gap-2 items-center">
					<h1>{user.name}</h1>
				</div>
				<div className="flex gap-3 items-center">
					<Button
						onClick={() => dispatch(removeUser(user.id))}
						variant="link"
						className="p-0 text-red-500"
					>
						<Trash />
					</Button>
				</div>
			</div>
		</div>
	);
}

import Logo from "../../assets/Logo";
import { Link } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import React from "react";

export default function NavBar() {
	return (
		<nav className="max-w-7xl mx-auto h-16 flex item-center gap-3 px-5">
			<div className="flex items-center">
				<Logo /> <span className="font-bold ml-2">Task</span>Master
			</div>
			<div className="flex gap-3 mt-5">
				<Link to="/">Tasks</Link>
				<Link to="/users">Users</Link>
			</div>
			<div className="ml-auto">
				<ModeToggle />
			</div>
		</nav>
	);
}

"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import { HiMail } from "react-icons/hi";

export default function Page() {
	return (
		<div className=" h-screen grid grid-cols-3">
			<div className=" col-span-2"></div>
			<div className=" col-span-1">
				<div>
					<h1>Sign in to our platform</h1>
					<TextInput
						className="mt-8"
						title="Email"
						icon={HiMail}
						placeholder="yourmail@gmail.com"
					/>
					<TextInput
						className=" mt-5"
						title="Password"
						placeholder="Enter your password"
					/>
				</div>
			</div>
		</div>
	);
}

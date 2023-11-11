"use client";

import Button from "@/components/Button/Button";
import CheckBox from "@/components/Checkbox/CheckBox";
import TextInput from "@/components/Input/TextInput";
import { HiMail, HiArrowRight } from "react-icons/hi";

export default function Page() {
	return (
		<div className=" h-screen grid grid-cols-5">
			<div className=" col-span-3 bg-sky-500"></div>
			<div className=" col-span-2 grid place-items-center">
				<div className=" w-full p-16">
					<h1 className=" text-3xl font-semibold">
						Sign in to our platform
					</h1>
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
					<div className=" flex justify-around mt-5">
						<CheckBox id="remember me">Remember me</CheckBox>
					</div>
					<Button className=" mt-5 w-full">
						<p className=" mr-2">Go to Store</p> <HiArrowRight />
					</Button>
				</div>
			</div>
		</div>
	);
}

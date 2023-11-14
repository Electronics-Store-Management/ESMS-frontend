"use client";

import Button from "@/components/Button/Button";
import CheckBox from "@/components/Checkbox/CheckBox";
import TextInput from "@/components/Input/TextInput";
import Link from "@/components/Typography/Link";
import API from "@/constants/apiEnpoint";
import TokenContext from "@/contexts/TokenContext";
import { publicFetcher } from "@/hooks/usePublicRoute";
import { Spinner } from "flowbite-react";
import { redirect, useRouter } from "next/navigation";
import { useContext, useRef, useState } from "react";
import { HiArrowRight, HiMail } from "react-icons/hi";

export default function Page() {
	const router = useRouter();

	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { setToken } = useContext(TokenContext);

	async function handleSignIn() {
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;

		if (email && password) {
			setIsLoading(true);
			const res = await publicFetcher(API.signIn, "POST", {
				email,
				password,
			});
			if (res.status === 200) {
				const token = await res.json();
				setToken({
					accessToken: token.access_token,
					refreshToken: token.refresh_token,
				});
				router.push("/");
			} else {
			}
			setIsLoading(false);
		}
	}

	return (
		<div className=" h-screen grid grid-cols-5">
			<div className=" col-span-3 bg-sky-500"></div>
			<div className=" col-span-2 grid place-items-center">
				<div className=" w-full p-16">
					<h1 className=" text-3xl font-semibold">
						Sign in to our platform
					</h1>
					<TextInput
						ref={emailRef}
						className="mt-8"
						title="Email"
						icon={HiMail}
						placeholder="yourmail@gmail.com"
					/>
					<TextInput
						ref={passwordRef}
						className=" mt-5"
						title="Password"
						placeholder="Enter your password"
					/>
					<div className=" w-full flex justify-between items-center mt-5">
						<CheckBox id="remember me">Remember me</CheckBox>
						<Link>Forgot password</Link>
					</div>
					<Button onClick={handleSignIn} className=" mt-5 w-full">
						{isLoading ? (
							<Spinner />
						) : (
							<>
								<p className=" mr-2">Go to Store</p> <HiArrowRight />
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

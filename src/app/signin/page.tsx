"use client";

import Button from "@/components/Button/Button";
import CheckBox from "@/components/Checkbox/CheckBox";
import TextInput from "@/components/Input/TextInput";
import Link from "@/components/Typography/Link";
import API from "@/constants/apiEnpoint";
import TokenContext from "@/contexts/TokenContext";
import { publicFetcher } from "@/hooks/usePublicRoute";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { HiArrowRight, HiMail } from "react-icons/hi";

export default function Page() {
	const router = useRouter();
	const { setToken } = useContext(TokenContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm<FormValues>();

	const onSubmit = async (data: FormValues) => {
		const email = data.email;
		const password = data.password;

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
				setValue("email", "");
				setValue("password", "");
			}
			setIsLoading(false);
		}
	};

	return (
		<div className=" h-screen grid grid-cols-5">
			<div className=" col-span-3 bg-sky-500"></div>
			<div className=" col-span-2 grid place-items-center">
				<div className=" w-full p-16">
					<h1 className=" text-3xl font-semibold">
						Sign in to our platform
					</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Controller
							control={control}
							name="email"
							rules={{
								required: "Email is required",
								validate: (value) => {
									const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
									if (!regex.test(value)) {
										return "You must type email here";
									}
								},
							}}
							render={({ field: { value, onChange, ...field } }) => (
								<TextInput
									className="mt-8"
									title="Email"
									icon={HiMail}
									placeholder="yourmail@gmail.com"
									{...register("email")}
									error={!!errors.email}
								/>
							)}
						/>
						{errors.email && (
							<p className="mt-2 text-sm text-error-500">
								{errors.email.message}
							</p>
						)}
						<Controller
							control={control}
							name="password"
							rules={{ required: "Password is required" }}
							render={({ field: { value, onChange, ...field } }) => (
								<TextInput
									type="password"
									className=" mt-5"
									title="Password"
									placeholder="Enter your password"
									{...register("password")}
									error={!!errors.password}
								/>
							)}
						/>
						{errors.password && (
							<p className="mt-2 text-sm text-error-500">
								{errors.password.message}
							</p>
						)}
						<div className=" w-full flex justify-between items-center mt-5">
							<CheckBox id="remember me">Remember me</CheckBox>
							<Link>Forgot password</Link>
						</div>
						<Button type="submit" className=" mt-5 w-full">
							{isLoading ? (
								<Spinner />
							) : (
								<>
									<p className=" mr-2">Go to Store</p> <HiArrowRight />
								</>
							)}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
}

type FormValues = {
	email: string;
	password: string;
};

import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Layout({ children }: ReactNodeChildren) {
	return (
		<div className=" w-screen h-screen grid grid-cols-12">
			<div className=" col-span-2 "></div>
			<div className=" col-span-10 ">{children}</div>
		</div>
	);
}

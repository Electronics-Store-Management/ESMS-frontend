import SideBar from "@/components/SideBar/SideBar";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Layout({ children }: ReactNodeChildren) {
	return (
		<div className=" w-screen h-screen grid grid-cols-12">
			<div className=" col-span-2 ">
				<SideBar />
			</div>
			<div className=" col-span-10 ">{children}</div>
		</div>
	);
}

import SideBar from "@/components/SideBar/SideBar";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Layout({ children }: ReactNodeChildren) {
	return (
		<div className=" w-screen h-screen flex">
			<div className=" w-max mr-5">
				<SideBar />
			</div>
			<div className="">{children}</div>
		</div>
	);
}

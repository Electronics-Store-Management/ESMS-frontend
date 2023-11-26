import SideBar from "@/components/SideBar/SideBar";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Layout({ children }: ReactNodeChildren) {
	return (
		<div className=" w-screen h-screen flex">
			<div className=" w-max">
				<SideBar />
			</div>
			<div className=" pt-8 px-5 w-full">{children}</div>
		</div>
	);
}

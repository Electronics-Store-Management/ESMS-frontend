import SideBar from "@/components/SideBar/SideBar";
import { ModalProvider } from "@/contexts/ModalContext";
import { ReactNodeChildren } from "@/types/ReactNodeChildren";

export default function Layout({ children }: ReactNodeChildren) {
    return (
        <div className=" w-screen h-screen flex">
            <div className=" w-max">
                <SideBar />
            </div>
            <div className=" pt-8 px-5 pr-8 w-full">
                <ModalProvider>{children}</ModalProvider>
            </div>
        </div>
    );
}

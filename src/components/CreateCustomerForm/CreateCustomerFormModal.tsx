import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import CreateSupplierForm from "../CreateSupplierForm/CreateSupplierForm";
import CreateCustomerForm from "./CreateCustomerForm";

export function useCreateCustomerModal() {
    const {
        modalState: { addCustomer },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        ...addCustomer,
        open: (refetch?: () => any) =>
            setModalState({ addCustomer: { isOpen: true, refetch } }),
        close: () => setModalState({ addCustomer: { isOpen: false } }),
    };
}

export default function CreateCustomerFormModal() {
    const { isOpen, close } = useCreateCustomerModal();

    return (
        <Modal
            // theme={{ content: { inner: " rounded-2xl" } }}
            theme={{
                root: {
                    base: " sm:bg-background-secondary",
                },
                content: {
                    base: "relative h-full w-full p-0 sm:p-4 md:h-auto",
                    inner: "relative rounded-none sm:rounded-lg bg-background-secondary shadow dark:bg-gray-700 flex flex-col max-h-[90vh]",
                },
            }}
            size="xl"
            show={isOpen}
            onClose={close}
        >
            <CreateCustomerForm />
        </Modal>
    );
}

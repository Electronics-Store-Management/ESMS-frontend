import { ModalStateContext } from "@/contexts/ModalContext";
import { Modal } from "flowbite-react";
import { useContext } from "react";
import UpdateCustomerForm from "./UpdateCustomerForm";

export function useUpdateCustomerModal() {
    const {
        modalState: { updateCustomer },
        setModalState,
    } = useContext(ModalStateContext);

    return {
        ...updateCustomer,
        open: (customerId: string, refetch?: () => any) =>
            setModalState({
                updateCustomer: { isOpen: true, refetch, customerId },
            }),
        close: () => setModalState({ updateCustomer: { isOpen: false } }),
    };
}

export default function UpdateCustomerFormModal() {
    const { isOpen, close } = useUpdateCustomerModal();

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
            <UpdateCustomerForm />
        </Modal>
    );
}

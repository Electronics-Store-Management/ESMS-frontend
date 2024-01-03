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
            theme={{ content: { inner: " rounded-2xl" } }}
            size="xl"
            show={isOpen}
            onClose={close}
        >
            <UpdateCustomerForm />
        </Modal>
    );
}

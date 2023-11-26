import OperationState from "@/types/OperationState";
import Button from "../Button/Button";
import NotifyModal from "./NotifyModal";
import { ReactNode } from "react";

export default function OperationStatusModal({
    state,
    success = "",
    fail = "",
    onCloseModal = () => {},
}: PropTypes) {
    return (
        <NotifyModal
            openModal={state !== "none"}
            setOpenModal={(isOpen) => isOpen || onCloseModal()}
            icon={null}
            message={
                <>
                    {state === "success" ? (
                        <>
                            <h2 className=" mb-3 text-2xl font-semibold text-green-500">
                                Success
                            </h2>
                            <p className=" mb-8 text-sm font-medium text-secondary-950">
                                {success}
                            </p>
                        </>
                    ) : (
                        <>
                            <h2 className=" mb-3 text-2xl font-semibold text-red-500">
                                Fail
                            </h2>
                            <p className=" mb-8 text-sm font-medium text-secondary-950">
                                {fail}
                            </p>
                        </>
                    )}
                </>
            }
            agree={
                <Button
                    onClick={() => {
                        onCloseModal();
                    }}
                >
                    Yes, I'm sure
                </Button>
            }
            cancel={null}
        />
    );
}

type PropTypes = {
    state: OperationState;
    success?: ReactNode;
    fail?: ReactNode;
    onCloseModal?: () => any;
};

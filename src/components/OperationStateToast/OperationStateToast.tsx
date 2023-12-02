import { ReactNode } from "react";
import toast, { Toast } from "react-hot-toast";

import { HiCheckCircle, HiXCircle } from "react-icons/hi";

export default function OperationStateToast({
    isSuccess,
    t,
    title,
    content,
    retry,
}: PropsType) {
    return (
        <div
            className={`${t?.visible ? "animate-enter" : "animate-leave"} ${
                isSuccess ? " border-green-400" : " border-red-500"
            } max-w-md w-full min-w-[400px] min-w-20 bg-white shadow-lg border-2 rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        {isSuccess ? (
                            <HiCheckCircle className=" text-green-400 w-10 h-10" />
                        ) : (
                            <HiXCircle className=" text-red-500 w-10 h-10" />
                        )}
                    </div>
                    <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            {title || "Success"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{content}</p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() =>
                        isSuccess ? toast.remove(t?.id) : retry?.()
                    }
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {isSuccess ? "Dismiss" : "Retry"}
                </button>
            </div>
        </div>
    );
}

type PropsType = {
    isSuccess: boolean;
    t?: Toast;
    title?: ReactNode;
    content?: ReactNode;
    retry?: () => any;
};

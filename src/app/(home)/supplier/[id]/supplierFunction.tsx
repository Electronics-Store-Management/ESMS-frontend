"use client";

import { useDeleteSupplierMutation } from "@/api/supplier/deleteSupplier.api";
import viewSupplierList from "@/api/supplier/viewSupplierList.api";
import Button from "@/components/Button/Button";
import { useUpdateSupplierModal } from "@/components/UpdateSupplierForm/UpdateSupplierFormModal";
import SEARCH_PARAMS from "@/constants/searchParams";
import Supplier from "@/types/entity/Supplier";
import { useRouter, useSearchParams } from "next/navigation";
import { LuArchive } from "react-icons/lu";
import { RiPencilLine } from "react-icons/ri";
import { useQuery } from "react-query";
import { IoArrowForwardSharp } from "react-icons/io5";

export default function SupplierFunction({ id }: { id: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { open: openUpdateSupplierModal } = useUpdateSupplierModal();

    const supplierKeyword = searchParams.get(SEARCH_PARAMS.supplierName) || "";

    const { refetch } = useQuery<Supplier[]>(
        ["suppliers", supplierKeyword],
        viewSupplierList,
        {
            retry: false,
        },
    );

    const deleteSupplierMutation = useDeleteSupplierMutation(refetch);

    return (
        <div>
            <Button
                onClick={() => openUpdateSupplierModal(id, refetch)}
                btnType={"secondary"}
                className=" absolute top-3 right-3 flex flex-1"
                hiddenTitle="Edit"
            >
                <RiPencilLine size={20} />
            </Button>
            <div className=" mt-5 pr-5 flex gap-5">
                <Button
                    onClick={() => router.push(`/supplier/detail/${id}`)}
                    btnType={"secondary"}
                    className=" w-full flex"
                >
                    <p className=" mr-2">View detail</p>
                    {/* <IoArrowForwardSharp size={20} /> */}
                </Button>
                <Button
                    onClick={() => {
                        deleteSupplierMutation.mutate(id);
                        router.replace("/supplier");
                    }}
                    btnType={"error"}
                    className=" flex-initial"
                    hiddenTitle="Delete"
                >
                    <LuArchive size={20} />
                </Button>
            </div>
        </div>
    );
}

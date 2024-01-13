"use client";

import addNewPermission from "@/api/permission/addNewPermission";
import Button from "@/components/Button/Button";
import ControllerSelectInput from "@/components/ControllerInput/ControllerSelectInput";
import { Permission } from "@/types/entity/PermissionResponse";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { useMutation } from "react-query";

export default function AddPermissionBtn({
    onCreated,
    staffId,
}: {
    onCreated: () => any;
    staffId: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
    } = useForm<Permission>({ defaultValues: { staffId } });

    const addMutation = useMutation(addNewPermission);

    function onSubmitData(data: Permission) {
        setIsOpen(false);
        onCreated();
        addMutation.mutate({ ...data, staffId });
    }

    return (
        <>
            <Button
                btnType={"primary"}
                size={"sm"}
                onClick={() => setIsOpen(true)}
            >
                <LuPlus size={18} />
                <p className=" ml-1"> Add</p>
            </Button>
            <Modal
                theme={{ content: { inner: " rounded-2xl" } }}
                size="lg"
                show={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <form
                    className="  w-full bg-background-normal rounded-2xl p-8"
                    onSubmit={handleSubmit(onSubmitData)}
                >
                    <ControllerSelectInput
                        control={control}
                        name="permissionType"
                        title="Permission type"
                        placeholder=""
                        items={PermissionTypeList}
                        choseValue={getValues("permissionType")}
                        onValueChange={(d: any) => {
                            setValue("permissionType", d);
                        }}
                    />
                    <ControllerSelectInput
                        control={control}
                        name="entityType"
                        title="Entity type"
                        placeholder=""
                        items={EntityTypeList}
                        choseValue={getValues("entityType")}
                        onValueChange={(d: any) => {
                            setValue("entityType", d);
                        }}
                    />
                    {getValues("permissionType")?.split("_").at(1) == "ITEM" ? (
                        <div>Choose item</div>
                    ) : null}

                    <div className="flex justify-between mt-8">
                        <Button
                            btnType="secondary"
                            onClick={() => {
                                setIsOpen(false);
                            }}
                        >
                            Back
                        </Button>
                        <Button type="submit">Add permission</Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}

const PermissionTypeList = [
    { id: "CREATE", name: "CREATE" },
    { id: "VIEW_ITEM", name: "VIEW_ITEM" },
    { id: "VIEW_ALL", name: "VIEW_ALL" },
    { id: "UPDATE_ITEM", name: "UPDATE_ITEM" },
    { id: "UPDATE_ALL", name: "UPDATE_ALL" },
    { id: "DELETE_ITEM", name: "DELETE_ITEM" },
    { id: "DELETE_ALL", name: "DELETE_ALL" },
];

const EntityTypeList = [
    { id: "PRODUCT", name: "PRODUCT" },
    { id: "CATEGORY", name: "CATEGORY" },
    { id: "CUSTOMER", name: "CUSTOMER" },
    { id: "SUPPLIER", name: "SUPPLIER" },
    { id: "STAFF", name: "STAFF" },
    { id: "IMPORT_BILL", name: "IMPORT_BILL" },
    { id: "SALE_BILL", name: "SALE_BILL" },
    { id: "WARRANTY_BILL", name: "WARRANTY_BILL" },
    { id: "DASHBOARD", name: "DASHBOARD" },
];

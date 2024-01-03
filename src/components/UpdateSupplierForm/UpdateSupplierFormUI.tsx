import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewProduct } from "../../api/product/addNewProduct.api";
import Category from "../../types/entity/Category";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import DropZone from "../DropZone/DropZone";
import { useUpdateSupplierModal } from "./UpdateSupplierFormModal";
import { NewSupplier } from "@/api/supplier/addNewSupplier.api";
import { Label, Textarea } from "flowbite-react";
import ControllerTextarea from "../ControllerTextarea/ControllerTextarea";
import Supplier from "@/types/entity/Supplier";

export default function UpdateSupplierFormUI({
    onSubmitData,
    className,
    supplier,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
        clearErrors,
    } = useForm<Supplier>({ defaultValues: supplier });

    const { close } = useUpdateSupplierModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Update supplier
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" grid grid-cols-2 gap-5 mt-5">
                    <div>
                        <ControllerTextInput
                            control={control}
                            name="name"
                            title="Name"
                            rules={{ required: "Name is required" }}
                            register={register}
                            placeholder="Enter supplier name..."
                            onValueChange={(d: any) => {
                                clearErrors("name");
                            }}
                            error={errors.name}
                        />
                        <ControllerTextInput
                            control={control}
                            name="phone"
                            title="Phone"
                            rules={{ required: "Phone is required" }}
                            register={register}
                            placeholder="Enter supplier phone..."
                            onValueChange={(d: any) => {
                                clearErrors("phone");
                            }}
                            error={errors.phone}
                        />
                        <ControllerTextInput
                            control={control}
                            name="email"
                            title="Email"
                            rules={{ required: "Email is required" }}
                            register={register}
                            placeholder="Enter supplier email..."
                            onValueChange={(d: any) => {
                                clearErrors("email");
                            }}
                            error={errors.email}
                        />
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="address" value="Address" />
                            </div>
                            <ControllerTextarea
                                id="address"
                                rows={4}
                                placeholder="Leave your address here..."
                                control={control}
                                name="address"
                                title="Address"
                                rules={{ required: "Address is required" }}
                                register={register}
                                onValueChange={(d: any) => {
                                    clearErrors("address");
                                }}
                                error={errors.address}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="mb-2 block">
                            <Label htmlFor="note" value="Note" />
                        </div>
                        <ControllerTextarea
                            id="note"
                            rows={4}
                            placeholder="Leave your note here..."
                            control={control}
                            name="note"
                            title="Note"
                            rules={{ required: "Note is required" }}
                            register={register}
                            onValueChange={(d: any) => {
                                clearErrors("note");
                            }}
                            error={errors.note}
                        />
                    </div>
                </div>
                <div className=" flex justify-between mt-12">
                    <Button btnType="secondary" onClick={() => close()}>
                        Back
                    </Button>
                    <Button type="submit">Update supplier</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    supplier?: Supplier;
    onSubmitData: SubmitHandler<Supplier>;
};

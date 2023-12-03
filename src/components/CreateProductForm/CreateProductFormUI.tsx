import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewProduct } from "../../api/product/addNewProduct.api";
import Category from "../../types/entity/Category";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import DropZone from "../DropZone/DropZone";
import { useCreateProductModal } from "./CreateProductFormModal";

export default function CreateProductFormUI({
    categories = [],
    isCategoryLoading = false,
    onSubmitData,
    className,
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
    } = useForm<NewProduct>();

    const { closeCreateProductModal } = useCreateProductModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add product
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" grid grid-cols-2 gap-5">
                    <div>
                        <ControllerTextInput
                            control={control}
                            name="name"
                            title="Name"
                            rules={{ required: "Name is required" }}
                            register={register}
                            placeholder="BOYALINK"
                            onValueChange={(d: any) => {
                                clearErrors("name");
                            }}
                            error={errors.name}
                        />
                        <ControllerSelectInput
                            control={control}
                            name="categoryId"
                            title="Category"
                            isLoading={isCategoryLoading}
                            items={categories}
                            choseValue={getValues("categoryId")}
                            onValueChange={(value) =>
                                setValue("categoryId", value)
                            }
                        />
                        <div className=" flex gap-5">
                            <ControllerTextInput
                                control={control}
                                className=" w-full"
                                name="price"
                                title="Price"
                                type="number"
                                rules={{
                                    required: "Price is required",
                                    validate: (value: any) =>
                                        value <= 0
                                            ? "Price must be greater than 0"
                                            : undefined,
                                }}
                                register={register}
                                onValueChange={(d: number) => {
                                    clearErrors("price");
                                }}
                                error={errors.price}
                            />
                            <ControllerTextInput
                                control={control}
                                className="min-w-36"
                                name="unit"
                                title="Unit"
                                rules={{ required: "Unit is required" }}
                                register={register}
                                placeholder="Unit"
                                onValueChange={(d: any) => {
                                    clearErrors("unit");
                                }}
                                error={errors.unit}
                            />
                        </div>
                        <div className=" flex items-end gap-2">
                            <ControllerTextInput
                                control={control}
                                className="w-36"
                                name="warrantyPeriod"
                                type="number"
                                title="Warranty period"
                                rules={{
                                    required: "Warranty period is required",
                                    validate: (value: any) =>
                                        value < 0
                                            ? "Warranty period must be greater than 0"
                                            : undefined,
                                }}
                                register={register}
                                placeholder="Warranty period"
                                onValueChange={(d: any) => {
                                    clearErrors("warrantyPeriod");
                                }}
                                error={errors.warrantyPeriod}
                            />
                            <p className=" font-medium mb-5"> months</p>
                        </div>
                    </div>
                    <div className=" pt-10">
                        <DropZone
                            file={getValues("photo")}
                            onFileChange={(file) => setValue("photo", file)}
                        />
                    </div>
                </div>
                <div className=" flex justify-between mt-12">
                    <Button
                        btnType="secondary"
                        onClick={() => closeCreateProductModal()}
                    >
                        Back
                    </Button>
                    <Button
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    categories?: Category[];
    isCategoryLoading?: boolean;
    onSubmitData: SubmitHandler<NewProduct>;
};

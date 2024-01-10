import { UpdatedProduct } from "@/api/product/updateProduct.api";
import Product from "@/types/entity/Product";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Category from "../../types/entity/Category";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import DropZone from "../DropZone/DropZone";
import { useUpdateProductModal } from "./UpdateProductFormModal";

export default function UpdateProductFormUI({
    categories = [],
    isCategoryLoading = false,
    product,
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
    } = useForm<UpdatedProduct>({ defaultValues: product });

    const { closeUpdateProductModal } = useUpdateProductModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Update product
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
                            defaultValue={product?.category?.name}
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
                            file={getValues("photo")?.[0]}
                            defaultValue={
                                product?.photoURL
                                    ?.split(";")
                                    ?.filter((v: any) => v)[0] || undefined
                            }
                            onFileChange={(file) => {
                                if (!file) return;
                                const photoList = getValues("photo");
                                photoList[0] = file;
                                setValue("photo", photoList);
                            }}
                        />
                        <div className=" mt-10 flex gap-5">
                            {Array(4)
                                .fill("")
                                .map((_, index) => (
                                    <DropZone
                                        index={index + 1}
                                        key={index}
                                        isCompact
                                        file={getValues("photo")?.[index + 1]}
                                        defaultValue={
                                            product?.photoURL
                                                ?.split(";")
                                                ?.filter((v: any) => v)[
                                                index + 1
                                            ] || undefined
                                        }
                                        onFileChange={(file) => {
                                            if (!file) return;
                                            const photoList =
                                                getValues("photo");
                                            photoList[index + 1] = file;
                                            setValue("photo", photoList);
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className=" flex justify-between mt-12">
                    <Button
                        btnType="secondary"
                        onClick={() => closeUpdateProductModal()}
                    >
                        Back
                    </Button>
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    categories?: Category[];
    isCategoryLoading?: boolean;
    onSubmitData: SubmitHandler<UpdatedProduct>;
    product?: Product;
    isLoading: boolean;
};

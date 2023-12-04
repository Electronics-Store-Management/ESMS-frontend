import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Category from "../../types/entity/Category";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import { useCreateCategoryModal } from "./CreateCategoryFormModal";
import { NewCategory } from "@/api/category/addNewCategory.api";

export default function CreateCategoryFormUI({
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
    } = useForm<NewCategory>();

    const { closeCreateCategoryModal } = useCreateCategoryModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add Category
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" grid grid-cols-2 gap-5">
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
                </div>
                <div className=" flex justify-between mt-12">
                    <Button
                        btnType="secondary"
                        onClick={() => closeCreateCategoryModal()}
                    >
                        Back
                    </Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </div>
    );
}

type PropTypes = React.ComponentPropsWithoutRef<"div"> & {
    categories?: Category[];
    isCategoryLoading?: boolean;
    onSubmitData: SubmitHandler<NewCategory>;
};


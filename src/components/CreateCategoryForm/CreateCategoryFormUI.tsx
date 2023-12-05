import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import { useCreateCategoryModal } from "./CreateCategoryFormModal";
import { NewCategory } from "@/api/category/addNewCategory.api";

export default function CreateCategoryFormUI({
    onSubmitData,
    className,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
    } = useForm<NewCategory>();

    const { closeCreateCategoryModal } = useCreateCategoryModal();

    return (
        <div
            className={`w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add category
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
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

                <div className="flex justify-between mt-8">
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
    onSubmitData: SubmitHandler<NewCategory>;
};


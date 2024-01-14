import { NewStaff } from "@/api/staff/addNewStaff";
import { emailRegex } from "@/utils/regex";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FONT from "../../utils/fontFamily";
import Button from "../Button/Button";
import ControllerSelectInput from "../ControllerInput/ControllerSelectInput";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import DropZone from "../DropZone/DropZone";
import { useCreateStaffModal } from "./CreateStaffFormModal";

export default function CreateStaffFormUI({
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
    } = useForm<NewStaff>();

    const { closeCreateStaffModal } = useCreateStaffModal();

    return (
        <div
            className={` w-full bg-background-secondary rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Add new staff
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
                <div className=" flex flex-col-reverse lg:grid lg:grid-cols-2 gap-5">
                    <div>
                        <ControllerTextInput
                            control={control}
                            name="name"
                            title="Name"
                            rules={{ required: "Name is required" }}
                            register={register}
                            placeholder="Staff fullname"
                            onValueChange={(d: any) => {
                                clearErrors("name");
                            }}
                            error={errors.name}
                        />
                        <ControllerSelectInput
                            control={control}
                            name="role"
                            title="Role"
                            items={[
                                { name: "Staff", id: "ADMIN" },
                                { name: "Admin", id: "STAFF" },
                            ]}
                            choseValue={getValues("role")}
                            onValueChange={(value) => setValue("role", value)}
                        />
                        <ControllerTextInput
                            control={control}
                            name="phone"
                            title="Phone"
                            placeholder="0912345678"
                            rules={{
                                required: "Phone number is required",
                                validate: (value: string) => {
                                    if (value[0] !== "0")
                                        return "Phone number must start with 0";
                                    if (value.length !== 10)
                                        return "Phone number length must be 10";
                                },
                            }}
                            register={register}
                            onValueChange={(d: number) => {
                                clearErrors("phone");
                            }}
                            error={errors.phone}
                        />
                        <ControllerTextInput
                            control={control}
                            name="email"
                            title="Email"
                            placeholder="example.esms@gmail.com"
                            rules={{
                                required: "Email is required",
                                validate: (value: string) =>
                                    !emailRegex.test(value)
                                        ? "Invalid email"
                                        : undefined,
                            }}
                            register={register}
                            onValueChange={(d: any) => {
                                clearErrors("email");
                            }}
                            error={errors.email}
                        />
                        <ControllerTextInput
                            control={control}
                            name="citizenId"
                            title="Citizen ID"
                            rules={{
                                required: "Citizen ID is required",
                                validate: (value: string) =>
                                    value.length !== 9 && value.length !== 12
                                        ? "Citizen ID must be 9 or 12 long"
                                        : undefined,
                            }}
                            register={register}
                            placeholder="CCCD or CMND"
                            onValueChange={(d: any) => {
                                clearErrors("citizenId");
                            }}
                            error={errors.citizenId}
                        />
                    </div>
                    <div className=" pt-10">
                        <DropZone />
                    </div>
                </div>
                <div className=" flex justify-between mt-12">
                    <Button
                        btnType="secondary"
                        onClick={() => closeCreateStaffModal()}
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
    onSubmitData: SubmitHandler<NewStaff>;
};

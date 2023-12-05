import { SubmitHandler, useForm } from "react-hook-form";
import ControllerTextInput from "../ControllerInput/ControllerTextInput";
import Button from "../Button/Button";
import { UpdatedCategory } from "@/api/category/updateCategory.api";
import Category from "@/types/entity/Category";
import { useUpdateCategoryModal } from "./UpdateCategoryFormModal";
import FONT from "@/utils/fontFamily";

export default function UpdateCategoryFormUI({
    onSubmitData,
    category,
    className,
    ...props
}: PropTypes) {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        clearErrors,
    } = useForm<UpdatedCategory>({ defaultValues: category });

    const { closeUpdateCategoryModal } = useUpdateCategoryModal();

    return (
        <div
            className={` w-full bg-background-normal rounded-2xl p-8 ${className}`}
            {...props}
        >
            <h1
                className={` text-secondary-950 text-2xl text-center font-semibold ${FONT.primary.className}`}
            >
                Update category
            </h1>
            <form onSubmit={handleSubmit(onSubmitData)}>
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
                </div>

                <div className=" flex justify-between mt-12">
                    <Button
                        btnType="secondary"
                        onClick={() => closeUpdateCategoryModal()}
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
    onSubmitData: SubmitHandler<UpdatedCategory>;
    category?: Category;
    isLoading: boolean;
};


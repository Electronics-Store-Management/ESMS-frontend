import { ReactNodeChildren } from "@/types/ReactNodeChildren";
import { Control, Controller, FieldValues } from "react-hook-form";
import TextInput from "@/components/Input/TextInput";

export default function ControllerTextInput({
  control,
  type = "text",
  name,
  title,
  rules,
  icon,
  register,
  placeholder,
  onValueChange,
  error,
}: PropTypes) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange, ...field } }) => (
          <TextInput
            type={type}
            className=" mt-5"
            title={title}
            icon={icon}
            placeholder={placeholder}
            {...register(name)}
            onChange={(d: any) => {
              onChange(d);
              onValueChange(d);
            }}
            error={!!error}
            name={name}
          />
        )}
      />
      {error && (
        <p className="mt-2 text-sm text-color-error">{error.message}</p>
      )}
    </>
  );
}

type PropTypes = {
  control: any;
  name: string;
  title: string;
  type?: string;
  icon?: any;
  placeholder: string;
  rules: any;
  onValueChange: any;
  register: any;
  error: any;
} & ReactNodeChildren;

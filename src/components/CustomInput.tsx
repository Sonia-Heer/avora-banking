import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";

interface CustomInputProps {
  control: Control<z.infer<ReturnType<typeof authFormSchema>>>;
  name: FieldPath<z.infer<ReturnType<typeof authFormSchema>>>;
  label: string;
  placeholder: string;
}
const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-2">
          <FormLabel className="justify-center pt-2 text-tertiary-text">
            {label}
          </FormLabel>
          <FormControl className="rounded-[30px] p-[30px]">
            <Input
              placeholder={placeholder}
              type={name === "password" ? "password" : "text"}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomInput;

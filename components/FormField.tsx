import React from "react";
import { Input } from "./ui/input";
import { FormControl, FormMessage } from "./ui/form";
import { FormItem, FormLabel, FormDescription } from "./ui/form";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: "text" | "email" | "password" | "file";
  placeholder?: string;
}

const FormField = ({
  control,
  name,
  label,
  type,
  placeholder,
}: FormFieldProps<T>) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
            className="input"
            placeholder={placeholder}
            {...field}
            type={type}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;

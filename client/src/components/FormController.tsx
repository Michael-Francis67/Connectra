"use client";

import {Control, Controller} from "react-hook-form";
import {Field, FieldError, FieldLabel} from "./ui/field";
import {Input} from "./ui/input";

interface props {
    name: string;
    control: Control;
    title: string;
    type?: string;
    placeholder?: string;
}

const FormController = ({name, control, title, type, placeholder}: props) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={`form-rhf-demo-${name}`}>{title}</FieldLabel>
                        <Input
                            {...field}
                            id={`form-rhf-demo-${name}`}
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            autoComplete="off"
                            type={type ? type : "text"}
                            className="text-white bg-transparent rounded-md border-teal-500 focus:ring-teal-500 focus:ring-1"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </div>
    );
};

export default FormController;

import { SelectOptions } from "@/interface";
import { Field, FormikErrors, FormikTouched, FormikValues } from "formik";
import { Eye, EyeClosed } from "lucide-react";



export const InputTextField = ({ id, name, placeholder, errors, touched }: {
    id: string, name: string, placeholder: string,
    errors: FormikErrors<FormikValues>, touched: FormikTouched<FormikValues>
}) => {
    return (
        <div >
            <Field
                className={`border-2 input  py-2  w-full xs:w-full sm:w-4/5 md:w-3/4  mx-auto block   font-semibold  text-center shadow-md
                                    ${errors.email && touched.email ? 'border-red-500' : ''}`}
                id={id}
                name={name}
                type="text"
                placeholder={placeholder}
            />
        </div>
    );
};

export const InputPasswordField = ({ id, name, passwordVisible,
    setPasswordVisible, errors, touched }: {
        id: string, name: string,
        passwordVisible: Boolean, setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>,
        errors: FormikErrors<FormikValues>, touched: FormikTouched<FormikValues>
    }) => {
    return (
        <div className=" grid gap-4 mt-5 px-2 relative">
            <div className="flex  mx-auto">
                <Field className="border-2   border-r-0 mx-auto input rounded-lg  xs:w-full sm:w-[80%] sm:mx-auto md:w-[75%]  py-2 text-center shadow-md"
                    id={id}
                    name={name}
                    type={passwordVisible ? "text" : "password"}
                />
                <div className=" w-[20%]">
                    <button type="button" onClick={() => setPasswordVisible(!passwordVisible)}
                        className=" border-1 border-zinc-400 rounded-full py-2 px-2 cursor-pointer" >
                        {passwordVisible ? <Eye color="#FF0000"></Eye> : <EyeClosed color="#FF0000"></EyeClosed>}
                    </button>

                </div>
            </div>
            {errors.password && touched.password ? (
                <div className="text-red-600 bg-amber-100 w-[80%] mx-auto py-1 text-center text-sm font-bold"> {errors.password.toString()}</div>
            ) : null}
        </div>
    );
};

export const InputSelectField = ({ id, name, options, onSelectChange, setFieldValue }: {
    id: string, name: string, options: SelectOptions[],
    onSelectChange: React.ChangeEventHandler<HTMLSelectElement>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}) => {
    return (
        <Field
            as="select"
            id={id}
            name={name}
            className="form-select border-2 cursor-pointer text-blue-800 font-bold text-center  py-2 rounded-lg shadow-lg md:w-[50%] w-[60%] md:mx-auto "
            onChange={(e: any) => onSelectChange(e)}
        >
            <option key={Math.random()*200} value="select">Select</option>
            {
                options.map((options) => {
                    return <option key={Math.random()*50} value={options.value}>{options.label}</option>
                })
            }
        </Field>
    );
};

"use client"
import axios from "axios";
import * as Yup from 'yup'
import Link from "next/link";
import { Formik, FormikValues, FormikTouched, Form, Field, FormikErrors } from "formik";
import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { InputPasswordField, InputSelectField, InputTextField } from "../FormComponents/InputFieldComponents";


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required!'),
    password: Yup.string().required('Password is Required!')
});



const LoginForm = () => {
    const DEFAULT_CREDENTIALS = {
        tenant: { email: 'tenant@gmail.com', password: 'abcd1234' },
        landlord: { email: 'landlord@gmail.com', password: 'abcd1234' },
        admin: { email: 'admin@gmail.com', password: 'abcd1234' }
    }
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [validationTest, setValidationTest] = useState(true)

    return (
        <div className="sm:w-[70%]  md:w-[70%] lg:w-[50%] sm:mx-auto  shadow-2xl rounded-lg">
            <div className="border-b-2 mb-4 py-3 rounded-b-2xl border-t-2  text-4xl italic bg-purple-900 text-white">
                <h1 className="font-bold text-center">Login Now</h1>
            </div>
            <div>

            </div>
            <div className="py-4">
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        //  credential:''

                    }}
                    onSubmit={
                        async (values: FormikValues, { setSubmitting }) => {
                            //await connectToDB() 
                            axios.post('http://localhost:3000/api/users/login', { email: values.email, password: values.password })
                        }
                    }
                    validationSchema={LoginSchema}
                >
                    {({ setFieldValue, errors, touched, isSubmitting }: { setFieldValue: any, errors: FormikErrors<FormikValues>, touched: FormikTouched<FormikValues>, isSubmitting: boolean }) => {

                        useEffect(() => {
                            const hasErrorsAndTouched = Boolean((errors.email && touched.email) || (errors.password && touched.password));
                            setValidationTest(hasErrorsAndTouched);
                        }, [errors, touched]);

                        return <Form className="grid  py-2 rounded-lg  ">
                            <div className="w-full gap-2 flex justify-center md:px-20 items-center px-4">
                                <label className="md:px-5 text-center md:text-center  font-bold" htmlFor="credential">Load Credentials</label>
                                <InputSelectField id="credential" name="credential" key={Math.random() * 100}
                                    options={[
                                        { value: 'admin', label: 'Admin' },
                                        { value: 'landlord', label: 'Landlord' },
                                        { value: 'tenant', label: 'Tenant' },
                                    ]}
                                    onSelectChange={(e:any) => {
                                       // e.target.value=e.target.value
                                       setFieldValue('credential', e.target.value)
                                        switch (e.target.value) {
                                            case "select":
                                                setFieldValue('email', '')
                                                setFieldValue('password', '')
                                                break;
                                            case "tenant":
                                                setFieldValue('email', process.env.NEXT_TENANT_EMAIL! || DEFAULT_CREDENTIALS.tenant.email)
                                                setFieldValue('password', process.env.NEXT_TENANT_PASSWORD! || DEFAULT_CREDENTIALS.tenant.password)
                                                break;
                                            case "landlord":
                                                setFieldValue('email', process.env.NEXT_LANDLORD_EMAIL || DEFAULT_CREDENTIALS.landlord.email)
                                                setFieldValue('password', process.env.NEXT_LANDLORD_PASSWORD || DEFAULT_CREDENTIALS.landlord.password)
                                                break;
                                            case "admin":
                                                setFieldValue('email', process.env.NEXT_ADMIN_EMAIL || DEFAULT_CREDENTIALS.admin.email)
                                                setFieldValue('password', process.env.NEXT_ADMIN_PASSWORD || DEFAULT_CREDENTIALS.admin.password)
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                    setFieldValue={setFieldValue}
                                />
                                {/* <Field
                                    as="select"
                                    name="credential"
                                    className="form-select input cursor-pointer border-2 text-blue-800 font-bold text-center  py-2 rounded-lg shadow-lg md:w-[50%] w-[60%] md:mx-auto "
                                    onChange={(e: any) => {
                                        switch (e.target.value) {
                                            case "select":
                                                setFieldValue('email', '')
                                                setFieldValue('password', '')
                                                break;
                                            case "tenant":
                                                setFieldValue('email',process.env.NEXT_TENANT_EMAIL! || DEFAULT_CREDENTIALS.tenant.email) 
                                                setFieldValue('password', process.env.NEXT_TENANT_PASSWORD! || DEFAULT_CREDENTIALS.tenant.password)
                                                break;
                                            case "landlord":
                                                setFieldValue('email', process.env.NEXT_LANDLORD_EMAIL || DEFAULT_CREDENTIALS.landlord.email)
                                                setFieldValue('password', process.env.NEXT_LANDLORD_PASSWORD || DEFAULT_CREDENTIALS.landlord.password)
                                                break;
                                            case "admin":
                                                setFieldValue('email', process.env.NEXT_ADMIN_EMAIL|| DEFAULT_CREDENTIALS.admin.email)
                                                setFieldValue('password', process.env.NEXT_ADMIN_PASSWORD || DEFAULT_CREDENTIALS.admin.password)
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                >
                                    <option value="select">Select</option>
                                    <option value="tenant">Tenant</option>
                                    <option value="landlord">Landlord</option>
                                    <option value="admin">Admin</option>
                                </Field> */}
                            </div>

                            <div className=" grid gap-4 mt-5 px-2">
                                <label className="md:px-5 text-center md:text-center  font-bold" htmlFor="email">Email</label>
                                <InputTextField id="email" name="email" placeholder="Enter Email Address" errors={errors} touched={touched}  ></InputTextField>
                                {errors.email && touched.email ? (
                                    <div className="text-red-600 bg-amber-100 w-[80%] mx-auto py-1 text-center text-sm font-bold"> {errors.email.toString()}</div>
                                ) : null}

                            </div>

                            <InputPasswordField id="password" name="password" passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} errors={errors} touched={touched}></InputPasswordField>

                            <div className="text-center  h-15 mt-2 px-2   lg:w-[1/3] md:w-[1/2] xs:w-full">

                                <button type="submit" className={`border-2 cursor-pointer w-full md:w-[50%] lg:w-[80%] py-2 rounded-md mt-3  text-white font-bold ${validationTest ? 'bg-indigo-200 cursor-none' : 'bg-green-600'}`}>{isSubmitting ? "Submitting..." : "Submit"}</button>

                            </div>
                            <div className="flex font-bold border-t-1 w-[80%] rounded-lg px-2 text-red-600     gap-5 py-4 mt-3  justify-center mx-auto border-b-2">
                                <h1 >No Account Yet?</h1>
                                <Link href={'/auth/signup'}><strong className="hover:text-blue-500 hover:shadow-xl hover:px-2 hover:cursor-pointer">Register</strong></Link>
                            </div>
                        </Form>
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default LoginForm;
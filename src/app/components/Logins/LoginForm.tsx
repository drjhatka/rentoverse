"use client"
import axios from "axios";
import * as Yup from 'yup'
import Link from "next/link";
import { Formik, FormikValues, FormikTouched, Form, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import { InputPasswordField, InputSelectField, InputTextField } from "../FormComponents/InputFieldComponents";
import { SelectOptions } from "@/interface";
import {motion} from 'motion/react'
import { Github } from "lucide-react";
import Image from "next/image";
import SocialButton from "../ButtonComponents/SocialButton";


const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required!'),
    password: Yup.string().required('Password is Required!')
});



const LoginForm = () => {

    const [passwordVisible, setPasswordVisible] = useState(false)
    const [validationTest, setValidationTest] = useState(true)
    const options:SelectOptions[] = [
                                        { value: 'admin', label: 'Admin' },
                                        { value: 'landlord', label: 'Landlord' },
                                        { value: 'tenant', label: 'Tenant' },
                                    ]

    return (
        <div className="sm:w-[70%]  md:w-[70%] lg:w-[50%] sm:mx-auto  shadow-2xl rounded-lg">
            <div className="border-b-2 mb-4 py-3 rounded-b-2xl border-t-2  text-xl bg-purple-900 text-white shadow-md">
                <h1 className="font-bold text-center">Login Now</h1>
            </div>

            <div className="py-4">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={
                        async (values: FormikValues, { setSubmitting }) => {
                            await axios.post('http://localhost:3000/api/users/login', { email: values.email, password: values.password })
                        }
                    }
                    validationSchema={LoginSchema}
                >
                    {({ setFieldValue, errors, touched, isSubmitting }:
                        { setFieldValue: any, errors: FormikErrors<FormikValues>, touched: FormikTouched<FormikValues>, isSubmitting: boolean }) => {

                        useEffect(() => {
                            const hasErrorsAndTouched = Boolean((errors.email && touched.email) || (errors.password && touched.password));
                            setValidationTest(hasErrorsAndTouched);
                        }, [errors, touched]);

                        return <Form className="grid  py-2 rounded-lg  ">
                            <div className="w-full gap-2 flex justify-center md:px-20 items-center px-4">
                                <label className="md:px-5 text-center md:text-center  font-bold" htmlFor="credential">Load Credentials</label>
                                
                                <InputSelectField id="credential" name="credential" key={Math.random() * 100}
                                    options={options}
                                    onSelectChange={(e: any) => {
                                        setFieldValue('credential', e.target.value)
                                        switch (e.target.value) {
                                            case "select":
                                                setFieldValue('email', '')
                                                setFieldValue('password', '')
                                                break;
                                            case "tenant":
                                                setFieldValue('email', process.env.NEXT_PUBLIC_TENANT_EMAIL!)
                                                setFieldValue('password', process.env.NEXT_PUBLIC_TENANT_PASSWORD!)
                                                break;
                                            case "landlord":
                                                setFieldValue('email', process.env.NEXT_PUBLIC_LANDLORD_EMAIL!)
                                                setFieldValue('password', process.env.NEXT_PUBLIC_LANDLORD_PASSWORD!)
                                                break;
                                            case "admin":
                                                setFieldValue('email', process.env.NEXT_PUBLIC_ADMIN_EMAIL!)
                                                setFieldValue('password', process.env.NEXT_PUBLIC_ADMIN_PASSWORD!)
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                />
                            </div>

                            <div className=" grid gap-4 mt-5 px-2">
                                <label className="md:px-5 text-center md:text-center  font-bold" htmlFor="email">Email</label>
                                <div>
                                <InputTextField id="email" name="email" classes="w-full xs:w-full sm:w-4/5 md:w-3/4  mx-auto block" placeholder="Enter Email Address" errors={errors} touched={touched}  />
                                {errors.email && touched.email ? (
                                    <motion.div initial={{opacity:0, x:-100}} animate={{opacity:1, x:0}} transition={{duration:0.8}} className="text-red-600  w-[75%] mt-2 mx-auto py-2 border-b-2 text-center text-sm font-bold"> {errors.email.toString()}</motion.div>
                                ) : null}
                                </div>
                            </div>
                            <div className="grid mt-2">
                                    <label className="md:px-5  text-center md:text-center font-bold" htmlFor="password">Password</label>
                                    <InputPasswordField id="password" name="password" passwordVisible={passwordVisible} setPasswordVisible={setPasswordVisible} errors={errors} touched={touched}/>

                            </div>

                            <div className="text-center  h-15 mt-2 px-2   lg:w-[1/3] md:w-[1/2] xs:w-full">
                                <button type="submit" className={`  border-2 cursor-pointer w-full md:w-[50%] 
                                                                    lg:w-[80%] py-2 rounded-md mt-3  text-white font-bold 
                                                                    ${validationTest ? 'bg-indigo-200 cursor-none' : 'bg-green-600'}`}>
                                                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>

                            </div>
                            <div className="text-center grid gap-3 mt-5">
                                <h1 className="font-bold">Or</h1>
                                    <SocialButton text="Login with Gmail" provider="google" key={Math.random()*10} ></SocialButton>

                                    <button className="btn w-[70%] mx-auto sm:w-[50%] sm:mx-auto btn-secondary btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl"><Github /> Sign In With Github</button>
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
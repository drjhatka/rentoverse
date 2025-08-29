
import { signIn } from "next-auth/react";
import Image from "next/image";

const SignIn=async(provider:string)=>{
                const res =await signIn(provider,{redirectTo:'/home'})

}
const SocialButton = ({ text, provider}:{ text:string, provider:string}) => {
    return (
        <div>
            <button type="button" onClick={async ()=>{
               // "use server"
               await SignIn(provider)
               // console.log(res)
               // console.log(formData)
            }} 
            className="btn w-[70%] mx-auto sm:w-[50%] sm:mx-auto btn-accent  btn-xs sm:btn-sm md:btn-md lg:btn-lg text-blue-800 xl:btn-xl"><Image src={'icons/google.svg'} width={28} height={28} alt="google"></Image> {text}</button>
        </div>
    );
};

export default SocialButton;
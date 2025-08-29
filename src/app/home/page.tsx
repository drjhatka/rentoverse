"use client"
import {  signOut, useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';

const page = () => {
    const session = useSession()
    return (
            <div>
                THis is home{session?.data?.user?.email}
                <button className='btn btn-primary' type='button' onClick={async ()=>{
                   const result = await signOut({redirectTo:'/auth/login'})
                   toast.success('Logged out successfully!',{position:'top-center'})
                }

            }>Logout</button>
            <ToastContainer></ToastContainer>        
            </div>
    );
};

export default page;
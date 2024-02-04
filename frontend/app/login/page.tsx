import React from 'react'
import { SignIn } from "@clerk/nextjs";
const page = () => {
  return ( 
    <div className='flex justify-center items-center min-h-[90vh]'>
        <SignIn  redirectUrl={"/"}/>
    </div>
    
  )
}

export default page
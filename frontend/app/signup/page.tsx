import { SignUp } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className='flex justify-center items-center min-h-[90vh]'>
        <SignUp redirectUrl={"/"}/>
    </div>
  )
}

export default page
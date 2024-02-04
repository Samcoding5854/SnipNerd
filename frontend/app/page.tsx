"use client"
import { Cards, Hero, SubjectCarousel} from '@/components'
import { useSession } from '@clerk/nextjs';
import { useEffect } from 'react';



export default function Home() {
  const { isLoaded, session, isSignedIn } = useSession();
  useEffect(()=>{
    console.log(isSignedIn)
    console.log(session?.user)
  },[])
  return (
    <>
    <Hero/>
    <SubjectCarousel />
    </>
  )
}

import React from 'react'
import { sanityClient } from '@/sanity/lib/client';
import { subject } from '@/typings';

interface Props{
    subjects : [subject]
  }

function subjectCarousel() {
    return (
      <div className='text-white'>
        
        hii
      </div>
    )
  }
  
export default subjectCarousel


export const getServerSideProps = async () => {
    const query = `*[_type == "subject"]{
      _id,
      subject,
      description,
    }`;
  
    const subjects = await sanityClient.fetch(query);
  
    return{
      props: {
        subjects,
      }
    }
  }
// pages/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Cards } from '@/components';

export default function Home() {
  const subjects = ['subject1', 'subject2', 'subject3'];

  return (
    <>
      {/* <div>
        {subjects.map((slug) => (
          <Link key={slug} href={`/subject/${slug}`}>
            <button className='m-2'>Go to {slug}</button>
          </Link>
        ))}
      </div> */}
      <Cards/>
    </>
  )
}

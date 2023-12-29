import { Cards, Hero, SubjectCarousel} from '@/components'



export default function Home() {
  return (
    <>
    <Hero/>
    <div className='flex m-3'>
    <Cards title={'Physics'} description={"Physics studies nature's fundamental forces, matter, energy, and motion"} url={''}/>
    </div>
    <SubjectCarousel />
    </>
  )
}

import Image from 'next/image'
import React from 'react'
import styles from '../styles/Cards.module.css';

const Cards = () => {
  return (
    <>
      <div className={`${styles.container} relative flex text-white m-10 p-10`}>
        <div className={`${styles.card} relative`}>
          <div className={`${styles.content} h-5`}>
            <h2 className={`${styles.subHead}`}>Physics</h2>
            <p className={`${styles.subPara} overflow-hidden max-h-10 h-4`}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ducimus debitis nostrum possimus magnam assumenda ab praesentium. Quisquam, rem voluptatibus!</p>
            <a href="/" className={`${styles.subRead} overflow-hidden max-h-24`}> Read More </a>
          </div>
            <div>
            <Image src="/atom.png" height={200} width={200} alt='Physics' className={`${styles.imgg}`}/>
            </div>
        </div>
      </div>
    </>
  )
}

export default Cards
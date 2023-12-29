"use client"
import styles from '../styles/Nav.module.css';  
import React, { useEffect, useState } from 'react';
import { Button, Link, ButtonGroup} from "@nextui-org/react";
import { ThemeSwitcher } from '.';
import Image from 'next/image';
import { useTheme } from 'next-themes';


const Nav = () => {

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  return (
    <header className={`${styles.heady}`}>
      <nav className={` flex items-center justify-around ${styles.nav}`}>
        <Link href='/'>
        {theme === "light" ? (<Image src="/WhiteLogo.png" width={200} height={30} alt='Logo'/>) : (<Image src="/Logo.png" width={200} height={30} alt='Logo'/>)}
        </Link>
        
        <div className='flex text-black dark:text-white '>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/subject" className={styles.navLink}>Subjects</a>
          <a href="/bookmarks" className={styles.navLink}>Bookmarks</a>
          <a href="/contactus" className={styles.navLink}>Contact Us</a>
        </div>
        <div className='flex items-center'>
            <ThemeSwitcher/>
            <Button  variant="ghost" color='warning' className='m-6'>
              Login
            </Button>
            <Button radius="full" className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">
              SignUp
            </Button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;

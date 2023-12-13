// components/Nav.js
import React from 'react';
import styles from '../styles/Nav.module.css';
import { Button } from "@nextui-org/react";

const Nav = () => {
  return (
    <header className={`${styles.heady}`}>
      <nav className={`text-center flex flex-col md:flex-row items-center ${styles.nav}`}>
        <div className='text-white flex flex-shrink-0 p-3 m-2'>
          <div className='text-lg' style={{ zIndex: 1 }}>
            SnipNerd
          </div>
        </div>
        <div className='flex-grow flex justify-center mt-4 md:mt-0'>
          <a href="/" className={styles.navLink}>Home</a>
          <a href="/subject" className={styles.navLink}>Subjects</a>
          <a href="/bookmarks" className={styles.navLink}>Bookmarks</a>
          <a href="/contactus" className={styles.navLink}>Contact Us</a>
        </div>
        <div className='flex justify-center md:justify-end mt-4 md:mt-0'>
          <Button className="bg-gradient-to-tr rounded-full p-3 m-2 from-pink-500 to-yellow-500 text-white shadow-lg" style={{ position: 'relative', zIndex: 2 }}>
            Login
          </Button>
          <Button className="bg-gradient-to-tr rounded-full p-3 m-2 from-pink-500 to-yellow-500 text-white shadow-lg" style={{ position: 'relative', zIndex: 2 }}>
            Sign-Up
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Nav;

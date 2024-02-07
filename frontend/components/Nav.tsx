"use client";
import styles from "../styles/Nav.module.css";
import React, { useEffect, useState } from "react";
import { Button, Link, ButtonGroup } from "@nextui-org/react";
import { ThemeSwitcher } from ".";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [user, setUser] = useState<any>({
    isSignedIn:false
  });
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  return (
    <header className={`${styles.heady}`}>
      <nav className={` flex items-center justify-around ${styles.nav}`}>
        <Link href="/">
          {theme === "light" ? (
            <Image
              className="mix-blend-color-burn"
              src="/WhiteLogo.png"
              width={200}
              height={30}
              alt="Logo"
            />
          ) : (
            <Image
              className="mix-blend-color-burn"
              src="/Logo.png"
              width={200}
              height={30}
              alt="Logo"
            />
          )}
        </Link>

        <div className="flex text-black dark:text-white ">
          <a href="/" className={styles.navLink}>
            Home
          </a>
          <a href="/subject" className={styles.navLink}>
            Subjects
          </a>
          <a href="/bookmarks" className={styles.navLink}>
            Bookmarks
          </a>
          <a href="/contactus" className={styles.navLink}>
            Contact Us
          </a>
        </div>
        <div className="flex items-center">
          <ThemeSwitcher />
          {user.isSignedIn ? (
            <div className="flex gap-2 items-center">
              <span className=" mx-3 font-semibold">{user}</span>
              <Button variant="bordered" className="font-medium" color="danger" onClick={() => signOut(() => router.push("/"))}>
                Sign out
              </Button>
            </div>
          ) : (
            <>
              {" "}
              <Link href="/auth/login" color="warning" className="m-6">
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="bg-gradient-to-tr rounded-2xl p-1 px-2 from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;

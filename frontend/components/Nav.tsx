"use client";
import styles from "../styles/Nav.module.css";
import React, { useEffect, useState } from "react";
import { Button, Link, ButtonGroup } from "@nextui-org/react";
import { ThemeSwitcher } from ".";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SignOutButton, useClerk, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const Nav = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoaded, session, isSignedIn } = useSession();
  const [user, setUser] = useState<any>(null);
  const { signOut } = useClerk();
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (isSignedIn && session) {
      setUser(session?.user.firstName);
    }
  }, [session]);
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
          {isSignedIn ? (
            <div className="flex gap-2">
              <span className=" mx-2 font-semibold">{user}</span>
              <button onClick={() => signOut(() => router.push("/"))}>
                Sign out
              </button>
            </div>
          ) : (
            <>
              {" "}
              <Link href="/login" color="warning" className="m-6">
                Login
              </Link>
              <Link
                href="/signup"
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

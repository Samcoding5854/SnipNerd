"use client";
import styles from "../styles/Nav.module.css";
import React, { useEffect, useState } from "react";
import { Button, Link, ButtonGroup, Avatar } from "@nextui-org/react";
import { ThemeSwitcher } from ".";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "@/lib/useratom";
import { supabase } from "@/lib/supabase";

const Nav = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useRecoilState(userAtom);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      console.log(data);
      if (data.user && data.user.email) {
        // fetchTodos(data.user.id);
        setUser({
          isAuthenticated: true,
          user: {
            email: data.user.email,
            name: data.user.user_metadata.full_name,
            id: data.user.id,
            avatar: data.user.user_metadata.avatar_url,
          },
        });
      }
    };
    fetchUser();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser({
      isAuthenticated: false,
      user: {
        avatar: "",
        email: "",
        name: "",
        id: "",
      },
    });
    router.push("/");
  };

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
          <Link href="/ContactUs" className={styles.navLink}>
            Contact Us
          </Link>
        </div>
        <div className="flex items-center">
          <ThemeSwitcher />
          {user.isAuthenticated ? (
            <div className="flex gap-2 items-center">
              <span className=" mx-3 font-semibold">
                <Avatar src={user.user?.avatar} />
              </span>
              <Button
                variant="bordered"
                className="font-medium"
                color="danger"
                onClick={signOut}
              >
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

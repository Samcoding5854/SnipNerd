"use client";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { RiMailSendLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaLock } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import React from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

const page = () => {
  const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    console.log(data);
  };
  return (
    <div className="flex justify-center items-center min-h-[100vh] text-inherit">
      <div className="flex flex-1 min-h-[100vh] justify-between">
        <div
          className="flex flex-col flex-1  items-center max-w-[50%]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #0d0d0d, #1b1b1e, #26282e, #30363f, #3a4550, #405262, #456074, #496f87, #4b7fa0, #4d90ba, #4da1d5, #4eb2f1)",
          }}
        >
          <TypeAnimation
            data-aos="fade-up"
            sequence={[
              "Every study asset at one place.",
              2000,
              "Every study asset at one place.",
              2000,
              "",
            ]}
            speed={30}
            wrapper="h1"
            repeat={Infinity}
            className="md:text-4xl font-semibold mt-[10%]"
          />{" "}
          <h4 className="opacity-60 font-semibold max-w-[70%] md:text-medium sm:text-sm ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, dolor.
          </h4>
          <img
            className="w-[60%] max-w-[60%] mx-auto my-[10%]"
            src="/study.png"
            alt=""
          />
        </div>

        <div className="flex flex-col flex-1  max-w-[60%]">
          <div className="flex flex-col w-full flex-1">
            <div className="flex items-center mx-auto gap-4 mt-[10%] ">
              <h3 className=" text-sm font-medium opacity-60">Not a member?</h3>
              <Link href={"/auth/signup"}>
                <Button className="bg-blue-700">Sign up now</Button>
              </Link>
            </div>
            <div className="flex flex-col gap-3 items-start ml-[5%] mt-[7%]">
              <div className="my-6">
                <h1 className="text-3xl font-medium">Sign in Now.</h1>
                <h4 className="opacity-50 text-sm">Enter your details below</h4>
              </div>
              <label
                htmlFor="username"
                className="-mb-4 mx-0 opacity-50 text-sm"
              >
                Username or Email
              </label>
              <div className="flex items-center gap-2 w-[60%]">
                <RiMailSendLine
                  fontSize={"30px"}
                  className="block text-blue-600"
                />
                <Input variant="underlined" className="bg-transparent inline" />
              </div>
              <label
                htmlFor="username"
                className="-mb-4 mx-0 opacity-50 text-sm"
              >
                Password
              </label>
              <div className="flex items-center gap-2 w-[60%]">
                <IoLockClosedOutline fontSize={"30px"} className="block" />
                <Input
                  variant="underlined"
                  type="password"
                  className="bg-transparent inline"
                />
              </div>
              <div className="flex items-center gap-3 mt-5">
                <Button size="lg" className="bg-blue-700">
                  Sign in
                </Button>
                <Button
                  onPress={signInWithGoogle}
                  size="lg"
                  className="bg-transparent border border-foreground"
                >
                  <FcGoogle fontSize={"24px"} className="block text-blue-600" />
                  Sign in with Google
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

import { Button, Input } from "@nextui-org/react";
import { RiMailSendLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center min-h-[100vh]">
      <div className="flex flex-1 min-h-[100vh] justify-between px-2">
        <div className="flex flex-col flex-1  max-w-[60%]">
          <div className="flex flex-col w-full flex-1">
            <div className="flex items-center  mx-auto gap-4 mt-[10%] ">
              <h3 className=" text-sm font-medium opacity-60">Not a member?</h3>
              <Button className="bg-blue-700">Sign up now</Button>
            </div>
            <div className="flex flex-col gap-3 items-center  ml-[5%] mt-[7%]">
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
                <RiMailSendLine fontSize={"30px"} className="block text-blue-600" />
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
                <Input variant="underlined" className="bg-transparent inline" />
              </div>
              <Button size="lg" className="bg-blue-700 mt-5">Sign in</Button>
            </div>
          </div>
          
        </div>
        <div
          className="flex flex-col flex-1  items-center max-w-[50%]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, black, #52728e, #52728e, #51a0c2)",
          }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="md:text-4xl font-semibold mt-[10%]">
              Every study asset at one place
            </h2>
            <h4 className="opacity-60 max-w-sm md:text-medium sm:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              dolor.
            </h4>
          </div>{" "}
          <img
            className="w-[60%] max-w-[60%] mx-auto my-[10%]"
            src="/study.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default page;

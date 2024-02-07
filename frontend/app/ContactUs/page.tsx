import { Button, Input, Textarea } from "@nextui-org/react";
import { RiMailSendLine } from "react-icons/ri";
import { LuMailOpen } from "react-icons/lu";
import { IoMailUnreadOutline } from "react-icons/io5";
import { MdCall } from "react-icons/md";
import { BiSupport } from "react-icons/bi";


import { FaRegMessage } from "react-icons/fa6";
import { TbPhoneCall } from "react-icons/tb";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-6 items-center ml-[5%] mt-[7%]">
      <div className="my-6">
        <h1 className="text-4xl font-medium">Contact Us</h1>
      </div>
      <label htmlFor="firstname" className="mb-0 opacity-50 text-sm">
        First Name
      </label>
      <div className="flex items-center gap-2 w-[60%]">
        <RiMailSendLine fontSize={30} className="block text-blue-600" />
        <Input id="firstname" variant="underlined" className="bg-transparent inline" />
      </div>
      <label htmlFor="lastname" className="mb-0 opacity-50 text-sm">
        Last Name
      </label>
      <div className="flex items-center gap-2 w-[60%]">
        <RiMailSendLine fontSize={30} className="block text-blue-600" />
        <Input id="lastname" variant="underlined" className="bg-transparent inline" />
      </div>
      <label htmlFor="email" className="mb-0 opacity-50 text-sm">
        Your Email
      </label>
      <div className="flex items-center gap-2 w-[60%]">
        <IoMailUnreadOutline fontSize={30} className="block" />
        <Input id="email" variant="underlined" type="email" className="bg-transparent inline" />
      </div>
      <label htmlFor="phone" className="mb-0 opacity-50 text-sm">
        Phone Number
      </label>
      <div className="flex items-center gap-2 w-[60%]">
        <TbPhoneCall fontSize={30} className="block" />
        <Input id="phone" variant="underlined" type="tel" className="bg-transparent inline" />
      </div>
      <label htmlFor="message" className="mb-0 opacity-50 text-sm">
        Your Message
      </label>
      <div className="flex items-center gap-2 w-[60%]">
        <FaRegMessage fontSize={30} className="block" />
        <Textarea id="message" className="bg-transparent inline" />
      </div>
      <Button className="mt-6 w-[400px]" color="primary">
        Send Message
      </Button>
      <div className="flex justify-center gap-8 mt-8">
        <div className="text-center">
          <div className="items-center">
          <LuMailOpen className="items-center" fontSize={70}/>
          </div>
         
          <h2>Email us:</h2>
          <p>Email us for general queries, including marketing and partnership opportunities.</p>
          <a href="mailto:hello@flowbite.com">hello@flowbite.com</a>
        </div>
        <div className="text-center">
          <div className="items-center">
          <MdCall fontSize={70} className="items-center"/>
          </div>
          <h2>Call us:</h2>
          <p>Call us to speak to a member of our team. We are always happy to help.</p>
          <a href="tel:+16467865060">+1 (646) 786-5060</a>
        </div>
        <div className="text-center">
         <div className="items-center">
         <BiSupport fontSize={70} className="items-center"/>
         </div>
          <h2>Support:</h2>
          <p>Email us for general queries, including marketing and partnership opportunities.</p>
          <a href="/support-center">Support center</a>
        </div>
      </div>
    </div>
  );
};

export default Page;

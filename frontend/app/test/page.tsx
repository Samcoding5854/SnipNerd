"use client";
import { supabase } from "@/lib/supabase";
import React from "react";

const page = () => {
  const handleSubmit = async () => {
    console.log("hello")
    const message = "hello"
    const { data, error } = await supabase
    .from("todo")
    .insert({ data:"hello" });
    console.log(error)
  };
  return (
    <input
      type="text"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
            handleSubmit()
        }
      }}
    ></input>
  );
};

export default page;

"use client";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef, useState } from "react";
import { initFlowbite } from "flowbite";
// import { Editor } from "@/components";
import { summarizeFunc } from "@/lib/summarize";
import "@/app/styles.css";
import { Input, Select, SelectItem } from "@nextui-org/react";

declare global {
  interface Window {
    editor: any;
  }
}
const editorConfiguration = {
  toolbar: [
    "heading",

    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "|",

    "outdent",
    "indent",
    "|",

    // 'blockQuote',
    // 'insertTable',

    "undo",
    "redo",
  ],
  content: {
    styles: {
      color: "black",
    },
  },
};
const page = () => {
  const svgStyles: React.CSSProperties = {
    fill: "#FFFFFF",
  };

  useEffect(() => {
    initFlowbite();
  }, []);

  const [inputUrl, setInputUrl] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };
  const extractVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  const callApi = async () => {
    const videoId = extractVideoId(inputUrl);
    if (!videoId) {
      console.error("Invalid YouTube URL");
      return;
    }

    const apiUrl = `https://youtube-transcriptor.p.rapidapi.com/transcript?video_id=${videoId}&lang=en`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "bbb1b7e1b0mshe1d514534c44611p12a24fjsn5dc5afaf6c43",
        "X-RapidAPI-Host": "youtube-transcriptor.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(apiUrl, options);
      const result = await response.text();

      const data = JSON.parse(result);
      const lyrics = data[0].transcription
        .map((subtitle: { subtitle: any }) => subtitle.subtitle)
        .join("\n");

      const summary = await summarizeFunc(lyrics);
      console.log("Summary: ", summary);
      const editor = window.editor; // Assuming you have access to the CKEditor instance via window.editor
      editor.setData(summary);
    } catch (error) {
      console.error(error);
    }
  };
  const editorRef = useRef(null);
  const log = () => {
  if (editorRef.current) {
      console.log(editorRef.current.getContent());
  }
};

  const summaryType = [
    {
      label: "Cat",
      value: "cat",
      description: "The second most popular pet in the world",
    },
    {
      label: "Dog",
      value: "dog",
      description: "The most popular pet in the world",
    },
    {
      label: "Elephant",
      value: "elephant",
      description: "The largest land animal",
    },
    { label: "Lion", value: "lion", description: "The king of the jungle" },
  ];

  return (
    <div className="flex justify-between p-unit-xl">
      <div className="flex flex-col p-3 bg-yellow-400 bg-opacity-80 rounded-lg max-w-[50%]">
        <label
          htmlFor="video-url"
          className="font-bold text-3xl text-foreground-50"
        >
          Summarize video in seconds
        </label>
        <div className="flex flex-1 items-center px-2 gap-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-youtube  pr-2 h-20"
            viewBox="0 0 16 16"
          >
            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
          </svg>
          <span className="text-2xl">|</span>
          <Input
            type="text"
            value={inputUrl}
            onChange={handleInputChange}
            placeholder=" https://www.youtube.com/watch?v=yourvideoid"
            className="bg-transparent "
            name="video-url"
            id="video-url"
          />
          <Select
            label="Summary Type"
            placeholder="Select summary type"
            defaultSelectedKeys={["cat"]}
            className="max-w-xs"
            scrollShadowProps={{
              isEnabled: false,
            }}
          >
            {summaryType.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
              </SelectItem>
            ))}
          </Select>
          <button
            type="submit"
            onClick={callApi}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
        {/* <CKEditor
          editor={ClassicEditor}
          data=""
          config={editorConfiguration}
          onReady={(editor) => {
            console.log("CKEditor5 React Component is ready to use!", editor);
            window.editor = editor; // Store the CKEditor instance in the window object
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        /> */}
        <Editor
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
        height: 500,
        menubar: false,
        plugins: [
           'a11ychecker','advlist','advcode','advtable','autolink','checklist','export',
           'lists','link','image','charmap','preview','anchor','searchreplace','visualblocks',
           'powerpaste','fullscreen','formatpainter','insertdatetime','media','table','help','wordcount'
        ],
        toolbar: 'undo redo | casechange blocks | bold italic backcolor | ' +
           'alignleft aligncenter alignright alignjustify | ' +
           'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
    />
      </div>
      {/* <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        The Link
      </label>
      <div className="mb-6">
        <div className="absolute mt-1 flex items-center ps-1.5 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FF3D00"
              d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"
            ></path>
            <path fill="#FFF" d="M20 31L20 17 32 24z"></path>
          </svg>
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputUrl}
          onChange={handleInputChange}
          placeholder=" https://www.youtube.com/watch?v=yourvideoid"
        />
      </div>
      <div>
        
        <div className="relative">
          <input
            type="text"
            id="floating_helper"
            aria-describedby="floating_helper_text"
            className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_helper"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Custom summary type
          </label>
        </div>
        <p
          id="floating_helper_text"
          className="mt-2 text-xs text-gray-500 dark:text-gray-400"
        >
          Enter a prompt to explain in which way you want the summary
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          ></a>
          .
        </p>
      </div>
      <div>
        <button
          type="submit"
          onClick={callApi}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button> */}

      {/* <Editor /> */}

      <div></div>
    </div>
  );
};

export default page;

"use client"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React, { useEffect, useState } from "react";
import { initFlowbite } from "flowbite";
import { Editor } from "@/components";
import {summarizeFunc }from "@/lib/summarize"
import "@/app/styles.css";

declare global {
  interface Window {
    editor: any;
  }
}
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
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
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
      const lyrics = data[0].transcription.map((subtitle: { subtitle: any; }) => subtitle.subtitle).join('\n');
      
      const summary = await summarizeFunc(lyrics);
      console.log("Summary: ", summary);
      const editor = window.editor; // Assuming you have access to the CKEditor instance via window.editor
      editor.setData(summary);
      

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <label
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
        <div>
          <button
            id="dropdownRadioHelperButton"
            data-dropdown-toggle="dropdownRadioHelper"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Summary Type{" "}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <div
            id="dropdownRadioHelper"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60 dark:bg-gray-700 dark:divide-gray-600"
          >
            <ul
              className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownRadioHelperButton"
            >
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex items-center h-5">
                    <input
                      id="helper-radio-4"
                      name="helper-radio"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="helper-radio-4"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      <div>Individual</div>
                      <p
                        id="helper-radio-text-4"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Some helpful instruction goes over here.
                      </p>
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex items-center h-5">
                    <input
                      id="helper-radio-5"
                      name="helper-radio"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="helper-radio-5"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      <div>Company</div>
                      <p
                        id="helper-radio-text-5"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Some helpful instruction goes over here.
                      </p>
                    </label>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                  <div className="flex items-center h-5">
                    <input
                      id="helper-radio-6"
                      name="helper-radio"
                      type="radio"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                  </div>
                  <div className="ms-2 text-sm">
                    <label
                      htmlFor="helper-radio-6"
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      <div>Non profit</div>
                      <p
                        id="helper-radio-text-6"
                        className="text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        Some helpful instruction goes over here.
                      </p>
                    </label>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
          id="dropdownDividerButton"
          data-dropdown-delay="500"
          data-dropdown-toggle="dropdownDivider"
          data-dropdown-trigger="hover"
          className="t  ext-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Subject{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdownDivider"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2 flex">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Create Subject
              <span className="p-2 ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 50 50"
                  style={svgStyles}
                >
                  <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div>
        <button
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Topic{" "}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          id="dropdownHover"
          data-dropdown-delay="500"
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
          <div className="py-2 flex">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Create Topic
              <span className="p-2 ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 50 50"
                  style={svgStyles}
                >
                  <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
        <button
          type="submit"
          onClick={callApi}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
      {/* <Editor /> */}


      <div className='App'>
  <CKEditor
    editor={ ClassicEditor }
    data=""
    onReady={ ( editor ) => {
      console.log( "CKEditor5 React Component is ready to use!", editor );
      window.editor = editor; // Store the CKEditor instance in the window object
    } }
    onChange={ ( event, editor ) => {
      const data = editor.getData();
      console.log( { event, editor, data } );
    } }
  />
</div>

    </div>
  );
};

export default page;

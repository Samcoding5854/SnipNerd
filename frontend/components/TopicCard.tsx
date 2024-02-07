
"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "next-sanity";
import { Cards } from ".";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";

interface Subject {
  mainImage: string;
  _id: string;
  subject: string;
  description: string;
}

function SubjectCarousel() {
  const [data, setData] = useState<Subject[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const client = createClient({
    projectId: "9siranut",
    dataset: "production",
  });
  const builder = imageUrlBuilder(client);
  function urlFor(source: SanityImageSource) {
    return builder.image(source);
  }
  useEffect(() => {
    const fetchSubjects = async () => {
      const query = `*[_type == "subject"]{
        _id,
        subject,
        description,
        mainImage
      }`;
      await client
        .fetch(query)
        .then((data) => setData(data))
        .catch((err) => setError(err));
    };
    fetchSubjects();
  }, []);

  return (
    <>
    <div className="text-black dark:text-white flex-row">
      {data ? (
        data.map((subject) => (
          <div key={subject._id} className="m-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="rounded-t-lg" src={urlFor(subject.mainImage).url()} alt="" />
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{subject.subject}</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{subject.description}</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Learn more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a>
            </div>
          </div>
        ))
      ) : error ? (
        <div>Error fetching data: {error.message}</div>
      ) : (
        <div>Loading...</div>
      )}

    </div>


    </>



  );
}

export default SubjectCarousel;

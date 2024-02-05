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
    </>
  );
}

export default SubjectCarousel;
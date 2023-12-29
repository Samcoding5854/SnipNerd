"use client"
import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Subject {
  _id: string;
  subject: string;
  description: string;
}

function SubjectCarousel() {
  const apiUrl = 'https://snipnerd.sanity.studio';
  const query = `*[_type == "subject"]{
    _id,
    subject,
    description,
  }`;

  const [data, setData] = useState<Subject[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get(`${apiUrl}/data/query/${encodeURIComponent(query)}`)
      .then((response: AxiosResponse<{ result: Subject[] }>) => {
        setData(response.data.result);
      })
      .catch((error: Error) => {
        setError(error);
      });
  }, []); // The empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className='text-white'>
      {data ? (
        <div>
          {data.map(item => (
            <div key={item._id}>
              <h2>{item.subject}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      ) : (
        error ? (
          <div>Error fetching data: {error.message}</div>
        ) : (
          <div>Loading...</div>
        )
      )}
    </div>
  );
}

export default SubjectCarousel;

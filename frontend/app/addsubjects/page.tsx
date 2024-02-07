"use client";

import { useState } from "react";
import { createClient } from "next-sanity";

const MyForm: React.FC = () => {
  const [subject, setSubject] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null); // New state for the image file
  const [error, setError] = useState<string | null>(null);
  const client = createClient({
    projectId: "9siranut",
    dataset: "production",
    token:
      "skkI0S1v5Gw1gx73c2USw6HR3uZHYtheQ1q9bmPG1bh8q6RC2axw8Q6iTNJLze02EODMWZjMpl0x06DM5GdLBszQf1rPRUCdkoiWZjTrT2Wu92xCMKXf2BdbIyMFQTpEM03fc9UjHcnhpvLEphYBwuRV2BRkBxv7k0mQ5wnuXbzqcHCXXnbe", // Replace with your actual API token
    useCdn: false,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    console.log(selectedFile)
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Handle image upload
      const imageData = new FormData();
      imageData.append("image", image || ""); // Append image file to FormData

      console.log(imageData);
      const imageResponse = await client.assets.upload("image", imageData);

      console.log(imageResponse);

      // Extract image URL from the response
      const imageUrl = imageResponse.url;

      console.log(imageUrl);

      // Create data object with the image URL
      const data = {
        _type: "subject", // Replace with your Sanity schema type
        subject,
        description,
        imageUrl,
      };

      // Create the document in Sanity
      await client.create(data);

      console.log("Data posted successfully");
    } catch (err: any) {
      setError(err.message || "An error occurred while posting data");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-black shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Name:
          </label>
          <input
            className="border rounded w-full py-2 px-3"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            className="border rounded w-full py-2 px-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Image:
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default MyForm;

"use client"

import { useState } from 'react';
import { createClient } from 'next-sanity';

const MyForm: React.FC = () => {
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const client = createClient({
        projectId: "9siranut",
        dataset: "production",
        token: 'skkI0S1v5Gw1gx73c2USw6HR3uZHYtheQ1q9bmPG1bh8q6RC2axw8Q6iTNJLze02EODMWZjMpl0x06DM5GdLBszQf1rPRUCdkoiWZjTrT2Wu92xCMKXf2BdbIyMFQTpEM03fc9UjHcnhpvLEphYBwuRV2BRkBxv7k0mQ5wnuXbzqcHCXXnbe', // Replace with your actual API token
        useCdn: false,
      });

      const data = {
        _type: 'subject', // Replace with your Sanity schema type
        subject,
        description,
      };

      await client.create(data);

      console.log('Data posted successfully');
    } catch (err : any) {
      setError(err.message || 'An error occurred while posting data');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default MyForm;

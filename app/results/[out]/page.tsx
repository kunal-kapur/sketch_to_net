'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';


export default function Home({params} :{params: {out: string}}) {
    const { out } = params;
    console.log(out)
    // console.log(atob(params.out))

    const decodedString = decodeURIComponent(params.out)

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(decodedString).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };
  
    return (
      <div className="flex flex-col items-center min-h-screen py-2 bg-gray-100">
        <h1 className="text-4xl font-bold mb-4 pt-10">Template Code</h1>
        <button
          onClick={handleCopy}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded my-10"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
        <Link href={"/"} className='text-lg rounded-lg bg-gray-200 hover:bg-gray-500 ease-in-out duration-700 py-5 px-20 mb-10'>Back</Link>

        <pre className="bg-gray-800 text-white p-4 rounded-lg w-11/12 lg:w-3/4 whitespace-pre mb-4">
          {decodedString}
        </pre>

      </div>
    );
  };
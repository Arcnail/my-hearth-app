"use client";

import React, { useState } from 'react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from 'next/link';
import { submitToPile } from "./actions";

export default function SubmitEmber() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Handle loading state for session
  if (status === "loading") {
    return <div className="p-8">Loading session...</div>;
  }

  // If not logged in, they shouldn't be here
  if (!session) {
    redirect("/");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const result = await submitToPile(formData);
      
      if (result.success) {
        setSuccess(true);
      }
    } catch (err: any) {
      console.error("Submission Error:", err);
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 border border-green-200 rounded-lg text-center shadow-sm">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Success!</h2>
        <p className="text-green-700 mb-4">Your submission has been added to the pile and is awaiting approval.</p>
        <Link href="/profile" className="text-blue-600 font-medium hover:underline">
          Go back to Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Add to the Pile</h1>
        <p className="text-gray-600">Share a housing resource or tool with the community.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
          <input 
            name="title" 
            type="text" 
            required 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="e.g. Rare Pet Spawn Map" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">URL</label>
          <input 
            name="url" 
            type="url" 
            required 
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            placeholder="https://..." 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Topic</label>
            <input 
              name="topic" 
              type="text" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. Housing, Transmog" 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Source</label>
            <input 
              name="source" 
              type="text" 
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              placeholder="e.g. Reddit, Discord" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors disabled:bg-blue-300 shadow-sm"
        >
          {loading ? "Adding to Pile..." : "Add to Pile"}
        </button>
      </form>
    </div>
  );
}
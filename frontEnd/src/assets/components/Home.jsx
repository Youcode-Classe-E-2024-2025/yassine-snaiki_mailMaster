import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Newspaper } from "lucide-react";

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);


  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ email  ,name}),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const errorData = await response.json();
      }
    } catch (error) {

      console.error('Error during subscription:', error);
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">

{/* Hero Section */}
<section className="bg-gradient-to-r from-indigo-700 to-indigo-500 text-white py-24 shadow-inner">
  <div className="container mx-auto px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl font-extrabold leading-tight mb-4 drop-shadow-lg">
        Stay Informed
      </h1>
      <p className="text-xl font-light mb-10 text-indigo-100">
        Your trusted source for news.
      </p>

    </div>
  </div>
</section>

{/* Subscribe Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-indigo-700 flex justify-center items-center gap-2">
          <Mail className="w-7 h-7" />
          Subscribe 
        </h2>
        <p className="text-gray-600 mt-3">
          Stay updated with our latest news and special updates delivered directly to your inbox.
        </p>
      </div>

      {isSubscribed ? (
        <div className="bg-green-100 text-green-800 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-1">Thank you for subscribing!</h3>
          <p>You'll receive our next newsletter soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-xl border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow transition"
          >
            Subscribe
          </button>
        </form>
      )}

      <p className="text-sm text-gray-400 mt-6">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  </div>
</section>
</div>

  );
}

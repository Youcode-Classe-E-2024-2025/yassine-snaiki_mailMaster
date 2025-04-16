import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({authState , setAuth}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = async () => {
    try {

      const response = await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {

        localStorage.removeItem('token');
        setAuth(false);
        console.log('Logged out successfully');
      } else {
        console.error('Error during logout');
      }
    } catch (error) {
      console.error('Network error during logout', error);
    }
  };



  return (
    <header className="bg-white shadow-md border-b border-gray-200">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-extrabold text-blue-700">Mailmaster</span>
    </div>

    {/* Desktop Navigation */}
    <nav className="hidden md:flex space-x-6 items-center">
      <Link
        to="/"
        className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200"
      >
        Home
      </Link>
      <Link
        to="/Dash"
        className="text-gray-700 hover:text-blue-700 font-medium transition-colors duration-200"
      >
        Dashboard
      </Link>

      {!authState ? (
        <Link
          to="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={() => setAuth(false)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      )}
    </nav>

    {/* Mobile Toggle */}
    <button
      className="md:hidden text-gray-700 focus:outline-none"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <nav className="md:hidden bg-white border-t border-gray-100 shadow-sm">
      <ul className="flex flex-col px-6 py-4 space-y-3">
        <li>
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-700 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/Dash"
            className="block text-gray-700 hover:text-blue-700 transition-colors"
          >
            Dashboard
          </Link>
        </li>
        <li>
          {!authState ? (
            <Link
              to="/login"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => handleLogout()}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  )}
</header>

  );
}


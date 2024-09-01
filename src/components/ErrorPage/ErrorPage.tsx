import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-gray-700 min-h-screen flex items-center justify-center">
      <div className="container px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full lg:w-1/2">
          <p className="text-sm font-semibold text-blue-400 uppercase">404 Error</p>
          <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
            Oops! Page not found
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Sorry, the page you are looking for doesn’t exist. Here are some helpful links:
          </p>

          <div className="flex items-center mt-8 gap-x-4">
            <button
              onClick={handleGoBack}
              className="flex items-center justify-center px-5 py-3 text-sm font-medium text-gray-900 transition duration-200 bg-white rounded-lg shadow hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              Go back
            </button>

            <Link to="/">
              <button className="px-5 py-3 text-sm font-medium tracking-wide text-white transition duration-200 bg-blue-600 rounded-lg shadow hover:bg-blue-700">
                Take me home
              </button>
            </Link>
          </div>
        </div>

        <div className="relative w-full mt-10 lg:w-1/2 lg:mt-0 flex justify-center">
          <img
            className="w-full h-80 md:h-96 lg:h-[32rem] rounded-lg object-cover shadow-lg transform hover:scale-105 transition duration-500 ease-in-out"
            src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Error Page"
          />
          <img
            className="absolute top-0 right-0 w-40 h-40 lg:w-52 lg:h-52 animate-bounce"
            src="https://media.giphy.com/media/TqiwHbFBaZ4ti/giphy.gif" 
            alt="Animated GIF"
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;

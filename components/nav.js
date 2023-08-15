import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames'
import Image from 'next/image';

const nav = () => {
  const router = useRouter();
  const { asPath } = router

  const nav = [
    { path: '/', word: 'Home' },
    { path: '/blog', word: 'Blog' },
    { path: '/services', word: 'Services' },
    { path: '/pricing', word: 'Pricing' },
    { path: '/contact', word: 'Contact' },
  ]
  const defaultPath = 'block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 dark:text-white'
  const activePath = 'md:text-blue-700 md:dark:text-blue-500 bg-blue-700 md:bg-transparent'
  const disabledPath = 'hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'

  return (

    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center">
          <Image src="https://flowbite.com/docs/images/logo.svg" width={32} height={33} className="h-8 mr-3" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Next 13</span>
        </a>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        {/* hidden // TODO add toggle click handler */}
        <div className="w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {nav.map(({ path, word }) => {
              const isActive = path === asPath || path === '/blog' && asPath.includes('posts');
              return (
                <li key={path}>
                  <Link scroll={false} href={path} className={cn(defaultPath, isActive && activePath || disabledPath)} aria-current="page">
                    {word}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>

  );
};

export default nav;
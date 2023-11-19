import React from 'react';
import Link from 'next/link';

const blogLayout = ({ children, allPosts }) => {
  const slugs = allPosts.map(({ slug }) => slug)
  return (
    <nav>
      <ul className='flex flex-wrap lg:flex-no-wrap items-stretch'>
        {
          slugs.map((slug) =>
            <li className='flex-1 p-1' key={slug}>
              <Link href={`posts/${slug}`} className="flex h-full justify-center items-center text-center border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                {slug}
              </Link>
            </li>
          )
        }
      </ul>

      {children}
    </nav>
  );
};

export default blogLayout;
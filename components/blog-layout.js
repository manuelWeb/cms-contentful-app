import React from 'react';
import Link from 'next/link';

const blogLayout = ({ children, allPosts }) => {
  const slugs = allPosts.map(({ slug }) => slug)
  return (
    <>
      <ul className='flex'>
        {
          slugs.map((slug) =>
            <li className='flex-1 mr-2' key={slug}>
              <Link href={`posts/${slug}`} className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                {slug}
              </Link>
            </li>
          )
        }
      </ul>

      {children}
    </>
  );
};

export default blogLayout;
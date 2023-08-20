import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'

export default function CoverImage({ title, url, slug, width, height, ...props }) {
  const image = (
    <Image
      src={url}
      width={width}
      height={height}
      {...props}
      alt={`Cover Image for ${title}`}
      className={cn('shadow-small', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

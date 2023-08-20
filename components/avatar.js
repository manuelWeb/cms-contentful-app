import Image from 'next/image'

export default function Avatar({ name, picture, width, height }) {
  return (
    <div className="flex items-center">
      <div className="relative w-12 h-12 mr-4">
        <Image
          src={picture.url}
          width={width}
          height={height}
          className="rounded-full"
          alt={name} />
      </div>
      <div className="text-xl font-bold">
        {name}
      </div>
    </div>
  )
}

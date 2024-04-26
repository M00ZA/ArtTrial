import Image from "next/image"

export const AppLogo = () => {
  return (
    <div className='h-[72px] flex items-center justify-center'>
      <Image className='max-w-full max-h-full' alt='Logo' src='/logo.png' width={75} height={75} />
    </div>
  )
}
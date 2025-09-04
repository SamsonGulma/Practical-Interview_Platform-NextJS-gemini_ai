  import Image from 'next/image'
import Link from 'next/link'
import React, {ReactNode} from 'react'

const RootLayout = ({ children }: { children: ReactNode }) => {
  
  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className='flex items-center gap-2'>
          <Image src="/favicon.ico" alt="Logo" width={38} height={32} className='rounded-r-2xl rounded-tl-2xl'/>
          <h2 className='text-primary-100'>Practical</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout
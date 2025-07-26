import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import SignInButton from './SignInButton'

function Hero() {
  return (
    <div className='px-14 md:px-28 xl:px-56 lg:px-44 flex flex-col items-center mt-24'>
        <h2 className='font-extrabold text-5xl text-center'>
            ai-<span className='text-primary'>email-template</span>
        </h2>
        <p className='text-center mt-4'>Want to impress clients with AI-powered emails but dont't have enough time to build them on your own? Use the AI generated template and save time with email production.</p>
        <div className='flex gap-5 mt-6'>
            <Button variant={'outline'}>Try Demo</Button>
            <SignInButton/>
        </div>
        <Image src={'/landing.png'} alt="landing"width={1000} height={800} className='mt-12 rounded-xl'/>

    </div>
  )
}

export default Hero
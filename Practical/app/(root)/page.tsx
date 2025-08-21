import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { Link } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Ready for your Interview, AI-Powered Practice and Feedback.</h2>
          <p>Practice with realistic interview questions and receive instant personalized feedback.</p>
          <Button asChild className='btn-primary max-sm:w-full'>
            <Link className='flex items-center gap-2' href='/interview'>
              <span>Start Practicing</span>
              </Link>
          </Button>
        </div>
        <Image src='/robot.png' alt='RoBo' width={400} height={400} className='max-sm:hidden' />
      </section>
      <section className='flex flex-col gap-6 mt-8 '>
        <h2>Your Interviews</h2>
        <div className='interviews-sections flex flex-row gap-8'>
          {dummyInterviews.map((interview) => (
            <InterviewCard key={interview.id} {...interview} />
          ))}
          
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8 '>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          <p>There are no available interviews at this time.</p>
        </div>

      </section>
    </>
  )
}

export default page
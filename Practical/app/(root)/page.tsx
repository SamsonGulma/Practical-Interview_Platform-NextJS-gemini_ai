import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import {LinkIcon} from 'lucide-react'
import React from 'react'

const page = async () => {

  const user = await getCurrentUser();

  const [userInterviews, latestInterview] = await Promise.all([
   getInterviewsByUserId(user?.id!),
   getLatestInterviews({ userId: user?.id! }),
  ])
const hasPastInterviews = userInterviews?.length > 0;
const hasUpcomingInterviews = latestInterview?.length > 0;


  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Ready for your Interview, AI-Powered Practice and Feedback.</h2>
          <p>Practice with realistic interview questions and receive instant personalized feedback.</p>
          <Button asChild className='btn-primary max-md:w-full'>
            <Link className='flex items-center gap-2' href='/interview'>
              <span> <LinkIcon /> </span>
              </Link>
          </Button>
        </div>
        <Image src='/robot.png' alt='RoBo' width={400} height={400} className='max-sm:hidden' />
      </section>
      <section className='flex flex-col gap-6 mt-8 '>
        <h2>Your Interviews</h2>
        <div className='interviews-sections flex flex-row gap-8'>
          {
            hasPastInterviews ? ( userInterviews?.map((interview) => ( 
              <InterviewCard key={interview.id} {...interview} />
          ))) : (
            <p>You Haven&apos;t had any past interviews yet.</p>
          )}
        </div>
      </section>


      <section className='flex flex-col gap-6 mt-8 '>
        <h2>Take an Interview</h2>
        <div className='interviews-section'>
          {
            hasUpcomingInterviews ? ( latestInterview?.map((interview) => ( 
              <InterviewCard key={interview.id} {...interview} />
          ))) : (
          <p>There are no available interviews at this time.</p>
          )}
        </div>
      </section>
    </>
  )
}

export default page
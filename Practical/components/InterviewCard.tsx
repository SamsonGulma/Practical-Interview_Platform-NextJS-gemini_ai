import React from 'react'
import dayjs from 'dayjs';
import Image from 'next/image';
import { getRandomInterviewCover } from '@/utils/utils';

const InterviewCard = ({ InterviewId, userId, role, type, techstack,
    level, questions, finalized, createdAt} : InterviewCardProps
) => {
    const feedback = null as Feedback | null;
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMMM D, YYYY");
  return (
    <div className='card-border w-[360px] max-sm:w-full min-h-96'>
      <div className='card-interview'>
        <div>
          <div className='absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-700'>
            <p className='badge-text'>
              {normalizedType}
            </p>
          </div>
          <Image src={getRandomInterviewCover()} alt='Interview Cover' width={90} height={90} className='rounded-full object-fit size-[90px]'/>
        </div>
      </div>
    </div>
  )
}

export default InterviewCard
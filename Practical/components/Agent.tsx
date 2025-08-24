import Image from 'next/image'
import React from 'react'

const Agent = () => {
    const isSpeaking = true;
  return (
      <div className='call-view'>
          <div className='card-interviewer'>
              <div className='avatar'>
                  <Image src='/ai-avatar.png' alt='Vapi' width={70} height={57} className='object-cover' />
                  {isSpeaking && <span className='animate-speak'/>}
              </div>
              <h3>AI Interviewer</h3>
          </div>
    </div>
  )
}

export default Agent
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function SettingPage() {
  return (
    <div className='flex items-center justify-center h-full mt-8'>
      <UserProfile/>
    </div>
  )
}

export default SettingPage

import React from 'react'
import {Search} from 'lucide-react'

function SearchSection({onSearchInput}:any) {
  return (
    <div className='p-10 bg-gradient-to-br from-cyan-300 via-violet-600 to-cyan-500 flex flex-col justify-center items-center text-white'>
      <h2 className='text-3xl font-bold'>Browse all Templates</h2>
      <p>What would you like to create today?</p>
      <div className='w-full'>
        <div className='flex gap-2 items-center p-4 border rounded-md bg-white my-5'>
            <Search className='text-gray-600'/>
            <input type="text" placeholder='Search'
            onChange={(event)=>onSearchInput(event.target.value)} 
            className='outline-none text-gray-600'
            />
        </div>
      </div>
    </div>
  )
}

export default SearchSection

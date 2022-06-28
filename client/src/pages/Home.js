import React from 'react'
import Posts from '../components/Posts'
import Suggestion from '../components/Suggestion'

const Home = () => {
  return (
    <div className='max-w-5xl mx-auto px-3 my-3 mt-20'>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <Posts />
        </div>
        <div className="col-span-6 hidden md:block">
          <Suggestion />
        </div>
      </div>
    </div>
  )
}

export default Home
import React from 'react'

const Error = ({error}) => {
  return (
    <div className='bg-red-800 rounded-md p-4'>{error}</div>
  )
}

export default Error
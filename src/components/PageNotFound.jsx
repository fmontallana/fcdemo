import React from 'react'

const PageNotFound = () => {
  return (
    <div className=' grid place-content-center h-full py-16'>
      <div className='flex flex-col items-center justify-center gap-10 my-auto '>
        <div className=''>
          <h1 className=' text-9xl font-black'>404</h1>
        </div>
        <div>
          <p className='text-xl '>OOPS! THE PAGE YOU REQUESTED NOT FOUND.</p>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
import React from 'react'
function Loader() {

  return (
    <div className='fixed inset-0 flex items-center justify-center min-h-screen bg-[#f8f6f2] z-50'>

      {/* Logo */}
      <img src="/AllUre.png" alt="Logo" className="w-20 h-20 z-10" />

      {/* Rotating loader ring */}
      <span className='font-bold text-2xl '>
        Loading...
      </span>
    </div>
      )
}

      export default Loader

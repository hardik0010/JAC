import React from 'react'

const Test = () => {
  return (
    <div className="pt-16 lg:pt-20 min-h-screen bg-white">
      <div className="container-custom py-8">
        <h1 className="text-4xl font-bold text-black mb-4">Test Page</h1>
        <p className="text-gray-600 mb-4">This is a test page to check if routing is working.</p>
        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="text-blue-800">If you can see this, the basic routing and rendering is working!</p>
        </div>
      </div>
    </div>
  )
}

export default Test

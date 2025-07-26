import React from 'react'

function ElementLayoutCard({layout}:any) {
  return (
    <div  className='flex items-center group hover:shadow-md hover:border-primary cursor-pointer justify-center flex-col border-dashed border  rounded-xl p-3'>
    {<layout.icon className=' h-9 bg-gray-100 group-hover:text-primary w-9 p-2 group-hover:bg-purple-100 rounded-full'/>}
    <h2 className=' text-sm group-hover:text-primary'>{layout.label}</h2>
</div>
  )
}

export default ElementLayoutCard
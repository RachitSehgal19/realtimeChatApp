import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
function ReceiverMessage({image,message}) {
  let scroll=useRef()
  let {selectedUser}=useSelector(state=>state.user)
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  },[message,image])
  
  const handleImageScroll=()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className='flex items-end gap-[10px]' >
           <div className='w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-500 cursor-pointer shadow-lg flex-shrink-0' >
         <img src={selectedUser?.image || dp} alt="" className='h-[100%]'/>
         </div>
          <div ref={scroll} className='w-fit max-w-[450px] px-[16px] py-[10px] bg-gray-900 text-lime-300 text-[15px] rounded-3xl rounded-tl-none shadow-lg gap-[8px] flex flex-col border border-gray-700'>
        {image &&  <img src={image} alt="" className='w-[200px] rounded-2xl' onLoad={handleImageScroll}/>}
       {message && <span className='break-words'>{message}</span>}
       </div>
     
        </div>
  )
}

export default ReceiverMessage

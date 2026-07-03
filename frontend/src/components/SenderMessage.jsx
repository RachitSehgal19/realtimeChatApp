import React, { useEffect, useRef } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
function SenderMessage({image,message}) {
  let scroll = useRef()
  let {userData}=useSelector(state=>state.user)
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  },[message,image])
  const handleImageScroll=()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  }
  return (
    <div className='flex items-end gap-[10px] justify-end' >
     
      <div ref={scroll} className='w-fit max-w-[450px] px-[16px] py-[10px] bg-gradient-to-br from-blue-600 to-blue-500 text-cyan-300 text-[15px] rounded-3xl rounded-tr-none shadow-lg gap-[8px] flex flex-col'>
    {image &&  <img src={image} alt="" className='w-[200px] rounded-2xl' onLoad={handleImageScroll}/>}
   {message && <span className='break-words'>{message}</span>}
   </div>
   <div className='w-[36px] h-[36px] rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500 cursor-pointer shadow-lg flex-shrink-0' >
     <img src={userData?.image || dp} alt="" className='h-[100%]'/>
     </div>
    </div>
  )
}

export default SenderMessage

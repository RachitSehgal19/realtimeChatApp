import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.webp"
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios';
import { serverUrl } from '../main';
import { setMessages } from '../redux/messageSlice';
function MessageArea() {
  let {selectedUser,userData,socket,onlineUsers}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let [showPicker,setShowPicker]=useState(false)
let [input,setInput]=useState("")
let [frontendImage,setFrontendImage]=useState(null)
let [backendImage,setBackendImage]=useState(null)
let image=useRef()
let {messages}=useSelector(state=>state.message)
const handleImage=(e)=>{
  let file=e.target.files[0]
  setBackendImage(file)
  setFrontendImage(URL.createObjectURL(file))
    }
const handleSendMessage=async (e)=>{
  e.preventDefault()
  if(input.length==0 && backendImage==null){
    return 
  }
  try {
    let formData=new FormData()
    formData.append("message",input)
    if(backendImage){
      formData.append("image",backendImage)
    }
    let result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials:true})
    dispatch(setMessages([...messages,result.data]))
    setInput("")
    setFrontendImage(null)
    setBackendImage(null)
  } catch (error) {
    console.log(error)
  }
}
  const onEmojiClick =(emojiData)=>{
 setInput(prevInput=>prevInput+emojiData.emoji)
 setShowPicker(false)
  }
useEffect(()=>{
socket?.on("newMessage",(mess)=>{
  dispatch(setMessages([...messages,mess]))
})
return ()=>socket?.off("newMessage")
},[messages,setMessages])
 
  return (
    <div className={`lg:w-[70%] relative ${selectedUser?"flex":"hidden"} lg:flex w-full h-full bg-black border-l border-gray-700 overflow-hidden flex-col`}>
      
{selectedUser && 
<div className='w-full h-[100vh] flex flex-col overflow-hidden items-center'>
<div className='w-full h-[80px] bg-gradient-to-r from-gray-950 to-black shadow-lg gap-[15px] flex items-center px-[20px] border-b border-gray-700'>
           <div className='cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition' onClick={()=>dispatch(setSelectedUser(null))}>
                  <IoIosArrowRoundBack className='w-[28px] h-[28px] text-gray-300 hover:text-white'/>
           </div>
         <div className='w-[45px] h-[45px] rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500 cursor-pointer shadow-lg'>
        <img src={selectedUser?.image || dp} alt="" className='h-[100%]'/>
        </div>
        <div className='flex-1'>
        <h1 className='text-cyan-400 font-semibold text-[16px] drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'>{selectedUser?.name || "user"}</h1>
        <p className={`text-[12px] ${onlineUsers?.includes(selectedUser?._id) ? 'text-lime-400' : 'text-gray-600'}`}>{onlineUsers?.includes(selectedUser?._id) ? 'online' : 'offline'}</p>
        </div>
    </div>

    <div className='w-full h-[calc(100vh-140px)] flex flex-col py-[20px] px-[20px] overflow-auto gap-[15px] bg-black chat-pattern-bg'>

{showPicker && <div className='absolute bottom-[120px] left-[20px]'><EmojiPicker width={250} height={350} className='shadow-lg z-[100]' onEmojiClick={onEmojiClick}/></div> }

{messages && messages.map((mess)=>(
    mess.sender==userData._id
        ? <SenderMessage
            key={mess._id}
            image={mess.image}
            message={mess.message}
          />
        : <ReceiverMessage
            key={mess._id}
            image={mess.image}
            message={mess.message}
          />
))}
 

    </div>
    </div> 
    }
{selectedUser && <div className='w-full lg:w-[70%] h-[80px] fixed bottom-[0px] flex items-center justify-center bg-gradient-to-t from-black to-transparent'>
      <img src={frontendImage} alt="" className='w-[70px] absolute bottom-[85px] right-[20px] rounded-lg shadow-lg'/>
     <form className='w-[95%] lg:w-[70%] h-[60px] bg-gray-900 shadow-lg rounded-3xl flex items-center gap-[15px] px-[20px] relative border border-gray-700 hover:bg-gray-800 transition' onSubmit={handleSendMessage}>
      
       <div onClick={()=>setShowPicker(prev=>!prev)} className='hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition'>
       <RiEmojiStickerLine  className='w-[22px] h-[22px] text-gray-400 hover:text-gray-300'/>
       </div>
       <input type="file" accept="image/*" ref={image} hidden onChange={handleImage}/>
       <input type="text" className='w-full h-full px-[10px] outline-none border-0 text-[16px] text-cyan-400 bg-transparent placeholder-lime-400' placeholder='Message' onChange={(e)=>setInput(e.target.value)} value={input}/>
<div onClick={()=>image.current.click()} className='hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition'>
<FaImages className='w-[22px] h-[22px] cursor-pointer text-gray-400 hover:text-gray-300'/>
</div>
{(input.length>0  ||  backendImage!=null) && (<button className='hover:bg-gray-700 p-2 rounded-lg transition'>
<RiSendPlane2Fill className='w-[22px] cursor-pointer h-[22px] text-blue-500 hover:text-blue-400'/>
</button>)}

     </form>
     </div>}
    {!selectedUser && 
    <div className='w-full h-full flex flex-col justify-center items-center bg-black chat-pattern-bg'>
    <h1 className='text-cyan-400 font-bold text-[48px] drop-shadow-[0_0_20px_rgba(34,211,238,0.7)]'>Welcome to Chatly</h1>
    <span className='text-lime-400 font-semibold text-[24px]'>Select a chat to start messaging</span>
      </div>}
    


    </div>
  )
}

export default MessageArea
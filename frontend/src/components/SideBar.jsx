import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function SideBar() {
    let {userData,otherUsers,selectedUser,onlineUsers,searchData,unreadCount} = useSelector(state=>state.user)
    let [search,setSearch]=useState(false)
    let [input,setInput]=useState("")
let dispatch=useDispatch()
let navigate=useNavigate()
    const handleLogOut=async ()=>{
        try {
            let result =await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
dispatch(setUserData(null))
dispatch(setOtherUsers(null))
navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handlesearch=async ()=>{
        try {
            let result =await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true})
            dispatch(setSearchData(result.data))
           
        }
        catch(error){
console.log(error)
        }
    }

    useEffect(()=>{
        if(input){
            handlesearch()
        }

    },[input])
  return (
    <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-black relative ${!selectedUser?"block":"hidden"} border-r border-gray-700`}>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-lg fixed bottom-[20px] left-[15px] z-40 transition' onClick={handleLogOut}>
   <BiLogOutCircle className='w-[24px] h-[24px]'/>
</div>
{input.length>0 && <div className='flex absolute top-[200px] bg-black w-full h-[500px] overflow-y-auto items-center pt-[20px] flex-col gap-[10px] z-[150] shadow-2xl border-b border-gray-700'>
{searchData?.map((user)=>(
     <div key={user._id} className='w-[95%] h-[70px] flex items-center gap-[15px] px-[15px] hover:bg-gray-900 border-b border-gray-700 cursor-pointer rounded-lg transition' onClick={()=>{
        dispatch(setSelectedUser(user))
        setInput("")
        setSearch(false)
     }
        }>
     <div className='relative rounded-full flex justify-center items-center '>
     <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500'>
     <img src={user.image || dp} alt="" className='h-[100%]'/>
     </div>
     {onlineUsers?.includes(user._id) &&
     <span className='w-[12px] h-[12px] rounded-full absolute bottom-[0px] right-[0px] bg-green-500 shadow-lg shadow-green-500/50'></span>}
     {unreadCount[user._id] > 0 && (
     <span className='w-[24px] h-[24px] rounded-full absolute bottom-[-5px] right-[-5px] bg-yellow-400 shadow-lg shadow-yellow-400/50 border-2 border-black flex items-center justify-center'>
       <p className='text-black font-bold text-[12px]'>{unreadCount[user._id]}</p>
     </span>)}
     </div>
     <div className='flex-1'>
     <h1 className='text-cyan-400 font-semibold text-[20px] drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'>{user.name || user.userName}</h1>
     </div>
     </div>
))}
        </div> }

      <div className='w-full bg-gradient-to-b from-gray-950 to-black shadow-lg flex flex-col justify-between px-[20px] py-[20px] border-b border-gray-700'>
    <div className='w-full flex justify-between items-center mb-[20px]'>
    <div>
    <h1 className='text-cyan-400 font-bold text-[28px] drop-shadow-[0_0_15px_rgba(34,211,238,0.7)]'>chatly</h1>
    <p className='text-lime-400 text-[12px]'>Hi, {userData?.name || "user"}</p>
    </div>
    <div className='w-[48px] h-[48px] rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-500 cursor-pointer shadow-lg hover:shadow-xl transition' onClick={()=>navigate("/profile")}>
<img src={userData?.image || dp} alt="" className='h-[100%]'/>
</div>
   </div>
   <div className='w-full flex items-center gap-[10px]'>
    {!search && <div className='w-[48px] h-[48px] rounded-full flex justify-center items-center bg-gray-700 shadow-lg cursor-pointer hover:bg-gray-600 transition' onClick={()=>setSearch(true)}>
   <IoIosSearch className='w-[22px] h-[22px] text-gray-300'/>
</div>}

{search && 
    <form className='flex-1 h-[48px] bg-gray-700 shadow-lg flex items-center gap-[10px] rounded-full overflow-hidden px-[15px] relative hover:bg-gray-600 transition'>
    <IoIosSearch className='w-[20px] h-[20px] text-gray-400'/>
    <input type="text" placeholder='Search users...' className='flex-1 h-full p-[10px] text-[15px] outline-none border-0 bg-transparent text-gray-100 placeholder-gray-500' onChange={(e)=>setInput(e.target.value)} value={input}/>
    <RxCross2 className='w-[20px] h-[20px] cursor-pointer text-gray-400 hover:text-gray-200' onClick={()=>setSearch(false)}/>
     
    </form>
    }
   </div>
      </div>

      <div className='w-full h-[calc(100vh-300px)] overflow-y-auto flex flex-col gap-[8px] items-center mt-[15px] pb-[80px]'>
{otherUsers?.map((user)=>(
    <div  key={user._id} className={`w-[95%] h-[70px] flex items-center gap-[15px] px-[15px] rounded-xl cursor-pointer transition ${
    onlineUsers?.includes(user._id) ? 'bg-gray-950 hover:bg-gray-900' : 'bg-black opacity-60 hover:opacity-80'
    }`} onClick={()=>dispatch(setSelectedUser(user))}>
    <div className='relative rounded-full flex justify-center items-center'>
    <div className={`w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center ${
    onlineUsers?.includes(user._id) ? 'bg-gradient-to-br from-green-500 to-blue-500' : 'bg-gradient-to-br from-gray-600 to-gray-500'
    }`}>
    <img src={user.image || dp} alt="" className='h-[100%]'/>
    </div>
    {onlineUsers?.includes(user._id) &&
    <span className='w-[14px] h-[14px] rounded-full absolute bottom-[0px] right-[0px] bg-green-500 shadow-lg shadow-green-500/50 border-2 border-black'></span>}
    {unreadCount[user._id] > 0 && (
    <span className='w-[24px] h-[24px] rounded-full absolute bottom-[-5px] right-[-5px] bg-yellow-400 shadow-lg shadow-yellow-400/50 border-2 border-black flex items-center justify-center'>
      <p className='text-black font-bold text-[12px]'>{unreadCount[user._id]}</p>
    </span>)}
    </div>
    <div className='flex-1'>
    <h1 className='text-cyan-400 font-semibold text-[20px] drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'>{user.name || user.userName}</h1>
    <p className={`text-[13px] ${onlineUsers?.includes(user._id) ? 'text-lime-400' : 'text-gray-600'}`}>{onlineUsers?.includes(user._id) ? 'online' : 'offline'}</p>
    </div>
    </div>
))}
      </div>
    </div>
  )
}

export default SideBar
import React, { useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';
function Profile() {
    let {userData}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    let navigate=useNavigate()
let [name,setName]=useState(userData.name || "")
let [frontendImage,setFrontendImage]=useState(userData.image || dp)
let [backendImage,setBackendImage]=useState(null)
let image=useRef()
let [saving,setSaving]=useState(false)
const handleImage=(e)=>{
    let file=e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
}

const handleProfile=async (e)=>{
   
e.preventDefault()
setSaving(true)
try {

    let formData=new FormData()
    formData.append("name",name)
    if(backendImage){
        formData.append("image",backendImage) 
    }
    let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
    setSaving(false)
    dispatch(setUserData(result.data))
    navigate("/")
} catch (error) {
    console.log(error)
    setSaving(false)
}
}
  return (
    <div className='w-full h-[100vh] bg-gray-900 flex flex-col justify-center items-center gap-[30px]'>
        <div className='fixed top-[20px] left-[20px] cursor-pointer hover:bg-gray-800 p-2 rounded-lg transition' onClick={()=>navigate("/")}>
        <IoIosArrowRoundBack className='w-[28px] h-[28px] text-gray-400 hover:text-white'/>
        </div>
     <div className='bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-4 border-gray-700 shadow-lg relative cursor-pointer hover:shadow-xl transition' onClick={()=>image.current.click()}>
<div className='w-[180px] h-[180px] rounded-full overflow-hidden flex justify-center items-center'>
<img src={frontendImage} alt="" className='h-[100%] object-cover'/>
</div>
<div className='absolute bottom-0 right-0 w-[45px] h-[45px] rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex justify-center items-center shadow-lg border-4 border-gray-900'>
<IoCameraOutline className='text-white w-[24px] h-[24px]'/>
</div>
     </div>
     <form className='w-[95%]  max-w-[500px] flex flex-col gap-[20px] items-center justify-center bg-gray-800 rounded-3xl p-[40px] shadow-xl border border-gray-700' onSubmit={handleProfile}>
        <h1 className='text-white font-bold text-[28px]'>Profile Settings</h1>
        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative hover:bg-gray-600 transition'>
        <input type="text" placeholder="Enter your name" className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-100 text-[15px] placeholder-gray-500' onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative cursor-not-allowed'>
        <input type="text"  readOnly className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-500 text-[15px]' value={userData?.userName}/>
        </div>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative cursor-not-allowed'>
        <input type="email" readOnly className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-500 text-[15px]' value={userData?.email}/>
        </div>
        <button className='w-full h-[50px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white text-[16px] font-semibold mt-[10px] hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed' disabled={saving}>{saving?"Saving...":"Save Profile"}</button>
     </form>
    </div>
  )
}

export default Profile

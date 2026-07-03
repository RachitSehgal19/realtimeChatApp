import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
    let navigate=useNavigate()
    let [show,setShow]=useState(false)
let [userName,setUserName]=useState("")
let [email,setEmail]=useState("")
let [password,setPassword]=useState("")
let [loading,setLoading]=useState(false)
let [err,setErr]=useState("")
let dispatch=useDispatch()

    const handleSignUp=async (e)=>{
        e.preventDefault()
        setErr("")
        
        // Client-side validation
        if(!userName.trim()){
            setErr("Username is required")
            return
        }
        if(!email.trim()){
            setErr("Email is required")
            return
        }
        if(password.length < 6){
            setErr("Password must be at least 6 characters")
            return
        }
        
        setLoading(true)
        try {
            let result =await axios.post(`${serverUrl}/api/auth/signup`,{
userName,email,password
            },{withCredentials:true})
           dispatch(setUserData(result.data))
           navigate("/profile")
            setEmail("")
            setPassword("")
            setLoading(false)
            setErr("")
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error?.response?.data?.message)
        }
    }
    
    const handlePasswordChange=(e)=>{
        setPassword(e.target.value)
        setErr("")
    }
    
    const handleEmailChange=(e)=>{
        setEmail(e.target.value)
        setErr("")
    }
    
    const handleUserNameChange=(e)=>{
        setUserName(e.target.value)
        setErr("")
    }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center'>
     <div className='w-full max-w-[500px] h-auto bg-gray-800 rounded-3xl shadow-2xl flex flex-col gap-[30px] p-[40px] border border-gray-700'>
        <div className='flex flex-col gap-[10px]'>
           <h1 className='text-white font-bold text-[35px]'>Sign up</h1>
           <p className='text-gray-400 text-[14px]'>Create your account and start chatting with friends instantly on Chatly.</p>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSignUp}>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative hover:bg-gray-600 transition'>
        <input type="text" placeholder='Enter your username' className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-200 text-[15px] placeholder-gray-500' onChange={handleUserNameChange} value={userName}/>
        </div>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative hover:bg-gray-600 transition'>
        <input type="email" placeholder='Enter your email address' className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-200 text-[15px] placeholder-gray-500'  onChange={handleEmailChange} value={email}/>
        </div>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative hover:bg-gray-600 transition'>
        <input type={`${show?"text":"password"}`} placeholder='Enter your password (min 6 characters)' className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-200 text-[15px] placeholder-gray-500'  onChange={handlePasswordChange} value={password}/>
        <span className='absolute top-[15px] right-[20px] text-[14px] text-blue-400 font-semibold cursor-pointer hover:text-blue-300' onClick={()=>setShow(prev=>!prev)}>{`${show?"hidden":"show"}`}</span>
        </div>
        {password && password.length < 6 && <p className='text-yellow-400 text-[12px]'>Password must be at least 6 characters ({password.length}/6)</p>}
        {err && <p className='text-red-400 text-[14px]'>{"* " + err}</p>}
        <button className='w-full h-[50px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white text-[16px] font-semibold mt-[10px] hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed' disabled={loading}>{loading?"Loading...":"Sign up"}</button>
        <p className='text-gray-400 text-[14px] text-center'>Already have an account? <span className='text-blue-400 font-semibold cursor-pointer hover:text-blue-300' onClick={()=>navigate("/login")}>Log in</span></p>
     </form>
     </div>
     
    </div>
  )
}

export default SignUp

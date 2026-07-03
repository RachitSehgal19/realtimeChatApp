import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'

function Login() {
    let navigate=useNavigate()
    let [show,setShow]=useState(false)
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")
    let [loading,setLoading]=useState(false)
    let [err,setErr]=useState("")
    let dispatch=useDispatch()
    
        const handleLogin=async (e)=>{
            e.preventDefault()
            setErr("")
            
            // Client-side validation
            if(!email.trim()){
                setErr("Email is required")
                return
            }
            if(!password){
                setErr("Password is required")
                return
            }
            
            setLoading(true)
            try {
                let result =await axios.post(`${serverUrl}/api/auth/login`,{
    email,password
                },{withCredentials:true})
               dispatch(setUserData(result.data))
               dispatch(setSelectedUser(null))
               navigate("/")
                setEmail("")
                setPassword("")
                setLoading(false)
                setErr("")
            } catch (error) {
                console.log(error)
                setLoading(false)
                setErr(error.response.data.message)
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
    
  return (
    <div className='w-full h-[100vh] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center'>
     <div className='w-full max-w-[500px] h-auto bg-gray-800 rounded-3xl shadow-2xl flex flex-col gap-[30px] p-[40px] border border-gray-700'>
        <div className='flex flex-col gap-[10px]'>
           <h1 className='text-white font-bold text-[35px]'>Log in</h1>
           <p className='text-gray-400 text-[14px]'>Log in to your account and seamlessly continue managing your projects, ideas, and progress just where you left off.</p>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative hover:bg-gray-600 transition'>
        <input type="email" placeholder='Enter your email address' className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-200 text-[15px] placeholder-gray-500' onChange={handleEmailChange} value={email}/>
        </div>
        <div className='w-full h-[50px] border border-gray-600 overflow-hidden rounded-xl bg-gray-700 relative hover:bg-gray-600 transition'>
        <input type={`${show?"text":"password"}`} placeholder='Enter your password' className='w-full h-full outline-none px-[20px] py-[10px] bg-transparent text-gray-200 text-[15px] placeholder-gray-500' onChange={handlePasswordChange} value={password}/>
        <span className='absolute top-[15px] right-[20px] text-[14px] text-blue-400 font-semibold cursor-pointer hover:text-blue-300' onClick={()=>setShow(prev=>!prev)}>{`${show?"hidden":"show"}`}</span>
        </div>
{err && <p className='text-red-400 text-[14px]'>{err.includes("*") ? err : "* " + err}</p>}
        <button className='w-full h-[50px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl text-white text-[16px] font-semibold mt-[10px] hover:from-blue-700 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed' disabled={loading}>{loading?"Loading...":"Log in"}</button>
        <p className='text-gray-400 text-[14px] text-center'>Don't have an account? <span className='text-blue-400 font-semibold cursor-pointer hover:text-blue-300' onClick={()=>navigate("/signup")}>Sign up</span></p>
     </form>
     </div>
     
    </div>
  )
}

export default Login

import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import Notification from '../components/Notification'
import { useSelector } from 'react-redux'
import getMessage from '../customHooks/getMessages'


function Home() {
  let {selectedUser}=useSelector(state=>state.user)
 getMessage()
  return (
    <div className='w-full h-[100vh] flex bg-black'>
     <Notification/>
     <SideBar/>
     <MessageArea/>
    </div>
  )
}

export default Home

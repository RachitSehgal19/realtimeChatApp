import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
   name:"user",
   initialState:{
    userData:null,
    otherUsers:null,
    selectedUser:null,
    socket:null,
    onlineUsers:null,
    searchData:null,
    unreadCount:{}
   },  
   reducers:{
    setUserData:(state,action)=>{
   state.userData=action.payload
    },
    setOtherUsers:(state,action)=>{
      state.otherUsers=action.payload
       },
       setSelectedUser:(state,action)=>{
         state.selectedUser=action.payload
         // Clear unread count when user opens a chat
         if(action.payload){
          state.unreadCount[action.payload._id]=0
         }
          }
          ,
          setSocket:(state,action)=>{
            state.socket=action.payload
             },
             setOnlineUsers:(state,action)=>{
              state.onlineUsers=action.payload
               },
               setSearchData:(state,action)=>{
                state.searchData=action.payload
                 },
                 incrementUnread:(state,action)=>{
                  const userId=action.payload
                  state.unreadCount[userId]=(state.unreadCount[userId]||0)+1
                 },
                 clearUnread:(state,action)=>{
                  const userId=action.payload
                  state.unreadCount[userId]=0
                 }
   }
})

export const {setUserData, setOtherUsers,setSelectedUser,setSocket,setOnlineUsers,setSearchData,incrementUnread,clearUnread}=userSlice.actions
export default userSlice.reducer
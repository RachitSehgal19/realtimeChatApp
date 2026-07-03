import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementUnread } from '../redux/userSlice'

function Notification() {
  let {socket, selectedUser} = useSelector(state => state.user)
  let dispatch = useDispatch()

  useEffect(() => {
    if (!socket) return

    socket.on("messageNotification", (data) => {
      // Only increment unread if the message is not from the currently selected user
      if(selectedUser?._id !== data.senderId) {
        dispatch(incrementUnread(data.senderId))
      }
    })

    return () => socket.off("messageNotification")
  }, [socket, selectedUser, dispatch])

  return null
}

export default Notification

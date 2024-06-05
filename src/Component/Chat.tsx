import React from 'react'
import SendMessageForm from './SendMessageForm'

const Chat = () => {
  return (
    <div className="w-full max-w-[550px] px-4 py-3 rounded-lg bg-slate-900 opacity-80 ">
        <ChatMessagesBox />
        <SendMessageForm />
    </div>
  )
}

const ChatMessagesBox = () => {
    return <div className="h-[70vh] overflow-auto">ChatMessageBox</div>
}

export default Chat
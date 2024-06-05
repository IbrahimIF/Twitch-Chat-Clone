import React from 'react'

const SendMessageForm = () => {
  return (
    <form>
        <input
        type="text"
        className="w-full p-2 rounded bg-slate-700 focus:outline-none focus:ring-purple-500
        focus:ring-2"
        placeholder="Send a chat message"
        />
        <button className="bg-purple-600 p-2 float-right mt-2 rounded-md" type="submit">
        Chat
        </button>
    </form>
  )
}

export default SendMessageForm
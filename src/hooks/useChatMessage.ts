import { useEffect, useState, useCallback } from "react"; 
import { MessageModel } from '../utils/models'; // Defining the structure of a chat message.
import useChatConnection from './useChatConnect' // custom hook used for managing websocket connections


const MESSAGE_WINDOW = 30 // defines the number of messages to keep in the chat window

// first message to display in the chat
const welcomeMessage: MessageModel = {
    id: 'welcome-message',
    author: {
        rgbColor: 'darkorchid',
        badges: ['moderator'],
        username: 'Welcome to Twitch Chat Clone!',
    }
}


export default function useChatMessages() {
    // intialises the welcome message and the following messages entered
    const [messages, setMessages] = useState<MessageModel[]>( [welcomeMessage])
    const socket = useChatConnection()
    
    // adds new messages to the messages state
    const appendNewMessage = useCallback(
        (newMessage: MessageModel) => {
            const nextMessages: MessageModel[] = [
                ...messages.slice(-MESSAGE_WINDOW), // slices the messages into 30
                newMessage,

            ]
            setMessages(nextMessages)
        },
        [messages]
    )

    // sends a message via the websocket connection.
    const send = useCallback(
        (message: string) => {
          console.log('Sending message: ${message}')
          socket?.emit('message', message)
        },
        [socket]
    )
    
    // listens for new messages from the websocket connection and calls appendNewMessage when a new message arrives
    useEffect(() => {
        socket?.on('new-message', (msg: MessageModel) => {
            appendNewMessage(msg)
        })

        return () => { // cleans up the event listener when the componment unmounts or when appendNewMessage or socket changes
            socket?.off('new-message')
        }
    }, [appendNewMessage, socket])


    return {
        messages,
        send,
    }
}


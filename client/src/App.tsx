import { useState } from "react";
import Chat from "./Component/Chat";
import UsernameInput from "./Component/UsernameInput";



function App() {
  const [username, setUsername] = useState<string | null>(null);
  const handleUsernameSubmit = (submittedUsername: string) => {
    setUsername(submittedUsername);
  };


  return (
    <main className="grid min-h-screen place-items-center">
      {username ? (
      <Chat username={username}/>
    ) : (
      <UsernameInput onUsernameSubmit={handleUsernameSubmit} />
    )}
    </main>
  )
}

export default App

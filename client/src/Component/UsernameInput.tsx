import React, { useState } from 'react';

// Define the props for the UsernameInput component.
// It expects an 'onUsernameSubmit' function that will be called
// when the user submits their username.
type UsernameInputProps = {
  onUsernameSubmit: (username: string) => void;
};

const UsernameInput: React.FC<UsernameInputProps> = ({ onUsernameSubmit }) => {
  // State to hold the current value of the username input field.
  const [username, setUsername] = useState('');

  // Handler for the form submission.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload).
    const trimmedUsername = username.trim(); // Trim whitespace from the username.
    if (trimmedUsername) {
      // If the trimmed username is not empty, call the 'onUsernameSubmit' callback
      // with the entered username.
      onUsernameSubmit(trimmedUsername);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-90 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-lg shadow-xl flex flex-col items-center max-w-sm w-full"
      >
        <h2 className="text-white text-2xl font-bold mb-6">Enter Your Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-md bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-6"
          placeholder="e.g., ChattyUser123"
          required // Make the input field required.
          minLength={3} // Minimum length for the username.
          maxLength={20} // Maximum length for the username.
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
        >
          Start Chatting
        </button>
      </form>
    </div>
  );
};

export default UsernameInput;

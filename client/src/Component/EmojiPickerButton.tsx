import Picker from 'emoji-picker-react';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import useEmojiPicker from '../hooks/useEmojiPicker';

const EmojiPickerButton =({
    onEmojiPick: handleEmojiPick,
}: {
    onEmojiPick: (emoji: string) => void
}) => {
    const { pickerRef, toggleEmojiPicker, isOpen, } = useEmojiPicker(handleEmojiPick)

    return (
        <div className="relative">
            <button 
                type="button"
                onClick={toggleEmojiPicker}
                className="p-1 rounded hover:bg-gray-400/50"
            >
                <HiOutlineEmojiHappy className=" w-5 h-5 my-auto" />
            </button>
            {isOpen && ( // if the emoji picker is open
                <div ref={pickerRef} className="absolute bottom-8 right-0 ">
                    <Picker 
                        onEmojiClick={handleEmojiPick}
                        skinTonesDisabled={true}
                    />

                </div>
            )}
        </div>
    )

}

export default EmojiPickerButton
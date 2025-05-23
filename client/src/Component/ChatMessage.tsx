
import { MessageModel } from "../utils/models"

type MessageProps = {
    message: MessageModel
} & React.ComponentPropsWithRef<'div'>

const ChatMessage = ({
    message: { author, content }, 
    className, 
}: MessageProps) => {
    const Badges = author.badges.map((bg, i) => (
        <img
            key={i}
            src={`/badges/${bg}.png`}
            onError={(e) => {
                console.error("Failed to load badge:", bg);
                e.currentTarget.style.display = 'none';
              }}
            className="w-4 h-4 self-center mr-2"
            alt={bg}
        />
    ))

    const Author = (
        <span className="font-semibold" style={{ color: author.rgbColor }}>
            {author.username +":"}
        </span>
    )


    return (
        <div className={`text-[15px] py-1 px-2 rounded hover:bg-gray-500/30 leading-6 ${className}`}>
        <div className="inline-flex items-baseline">
            {Badges}
            {Author}
        </div>
        <span className="ml-3 break-words">{content}</span>
    </div>
    )
}

export default ChatMessage
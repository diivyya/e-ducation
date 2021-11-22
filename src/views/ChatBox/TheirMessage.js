import { React } from "react";

export default function TheirMessage ({ lastMessage, message }) {
    const isFirstMessageByUser = !lastMessage || lastMessage.sender.username !== message.sender.username

    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div
                    className = "message-avtar"
                    style = {{ backgroundImage: `url(${message.sender.avtar})`}}
                />
            )}
            { message.attachments && message.attachments.length > 0
                    ? (
                        <img src = {message.attachments[0].file}
                            alt = "message-attachment"
                            className = "message-image"
                            style = {{ marginLeft: isFirstMessageByUser ? "4px" : "48px" }}
                        />
                    )
                    :
                    (
                        <div className="message"
                            style={{ float: "left", color: 'white',
                                marginLeft: isFirstMessageByUser ? "4px" : "48px",
                                backgroundColor: "#CABCDC" }}>
                            {message.text}
                        </div>
                    )
            }
        </div>
    )
}
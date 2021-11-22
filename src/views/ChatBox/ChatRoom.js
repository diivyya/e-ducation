import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './ChatFeed.js';
import './Chat.css';
//renderChatFeed = {(chatAppProps) => <ChatFeed { ...chatAppProps } />}
export default function ChatRoom (props) {
    return (
        <div style={{width: "1250px"}}>
        <ChatEngine
            height = "100vh"
            projectID = "c65386d6-3dfc-46a0-9cc7-ff5f45ee157d"
            userName = {props.profile.facultyId ? props.profile.facultyId : props.profile.scholarNo}
            userSecret = {props.profile.password}
            
            onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
        />
        </div>
    );
}
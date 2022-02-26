import React,{useState, useEffect} from 'react';
import {Avatar, IconButton} from '@mui/material';
import {AttachFile, MoreVert, SearchOutlined} from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useParams } from 'react-router-dom';
import "./Chat.css";
import db from "./firebase";
import firebase from 'firebase';
import {useStateValue} from "./StateProvider";

function Chat() {
    const[input,setInput]=useState("");
    const [seed,setSeed]=useState("");
    const { roomId }= useParams();
    const [roomName,setRoomName]= useState("");
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).
            onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ));
            db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            });

        }
    },[roomId])



    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
    },[roomId]);

    const sendMessage=(e)=>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");

    };
    return (
        <div className='chat'>
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                <h3 className='chat-room-name'>{roomName}</h3>
                    <p className='chat-room-last-seen'>
        
                    </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>


            </div>
            <div className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${ message.name == user.displayName && 'chat__receiver'}`}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestemp">26-02-2022</span>
                    </p>
                ))}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e=>
                    setInput(e.target.value)} placeholder="Type a messgae" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat

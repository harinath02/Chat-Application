import React,{useEffect, useState} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket,username,room}) {

  const [currentMessage,setCurrentMessage]=useState("");
  const [messageList,setMessageList]=useState([]);
  var hours = new Date(Date.now()).getHours();
  var minutes = new Date(Date.now()).getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;


  const sendMessage=async () =>{
    if(currentMessage !== "") {
        const messageData = {
            room:room,
            author:username,
            message:currentMessage,
            time:hours +":"+ minutes+" "+ampm,
        };
       await socket.emit("send_message",messageData);
       setMessageList((list) => [...list,messageData]);
       setCurrentMessage("");
    }
  };

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
        setMessageList((list)=>[...list,data]);
    });
  },[socket]);


  


  return (
    <div className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className="message-container">
            {messageList.map((messageContent,index)=>{
                return <div key={index} className='message' id={username === messageContent.author ? "you" : "other"}>
                    <div>
                        <div className="message-content">
                            <p>{messageContent.message}</p>
                        </div>
                        <div className="message-meta">
                            <p id='time'>{messageContent.time}</p>
                            <p id='author' className='author'>{messageContent.author}</p>
                        </div>
                    </div>
                </div>
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input
            type="text" 
            value={currentMessage}
            placeholder='Hey...' 
            onChange={(event)=>{
                setCurrentMessage(event.target.value);}}
            onKeyPress={(event)=> { 
                event.key === "Enter" && sendMessage();
            }}
            />
            <button onClick={sendMessage}>&#9658;</button>
            
        </div>
    </div>
  );
}

export default Chat;
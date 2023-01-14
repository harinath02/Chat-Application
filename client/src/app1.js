import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function ChatFooter({ currentMessage, setCurrentMessage, sendMessage }) {
  return (
    <div className="chat-footer">
      <Editor
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="toolbar-class"
        onEditorStateChange={(editorState) => {
          setCurrentMessage(editorState);
        }}

        value={currentMessage} 
        onChange={(event)=>{
            setCurrentMessage(event.target.value);}}
        onKeyPress={(event)=> { 
            event.key === "Enter" && sendMessage();
        }}
      />
      <button onClick={sendMessage}>&#9658;</button>
    </div>
  );
}

export default ChatFooter;

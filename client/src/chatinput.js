import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

function ChatInput() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const handleBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  return (
    <div>
      <button onClick={handleBoldClick}>Bold</button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
};
export default ChatInput;
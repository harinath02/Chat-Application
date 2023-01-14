import React, { Component } from 'react';
import { EditorState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
export class TextEditor extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  render() {
    const { editorState } = this.state;
    //console.log(convertToRaw(editorState.getCurrentContent()));
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}
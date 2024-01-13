import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Editor, EditorState, RichUtils,  convertToRaw } from "draft-js";
import draftToHtml from 'draftjs-to-html';
import "draft-js/dist/Draft.css";
import "./index.css";

const RichTextEditor = ({ setEditorValue }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  const [utilState, setUtilState] = useState({
    bold: false,
    italic: false,
  });

  const handleBoldClick = (e) => {
    e.preventDefault();
    setUtilState({ ...utilState, bold: !utilState.bold });
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const handleItalicClick = (e) => {
    e.preventDefault();
    setUtilState({ ...utilState, italic: !utilState.italic });
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const jsonValue = JSON.stringify(html)
    setEditorValue(jsonValue);
  }

  useEffect(() => {
    if(editorRef.current){
      editorRef.current.focus();
    }
  }, [])

  return (
    <div
      className="grow rounded-lg"
      style={{
        border: "1px solid rgba(0,0,0,0.15)",
      }}
    >
      <div className="px-4">
        <div
          className="flex text-base text-gray-400 py-2"
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.15)",
          }}
        >
          <div
            className={`cursor-pointer ${
              utilState.bold && "active"
            }`}
            onMouseDown={handleBoldClick}
          >
            Bold
          </div>
          <div
            className={`cursor-pointer ml-4 ${
              utilState.italic && "active"
            }`}
            onMouseDown={handleItalicClick}
          >
            Italic
          </div>
        </div>
      </div>
      <Editor
        style={{maxWidth: "200px"}}
        ref={editorRef}
        editorState={editorState}
        placeholder="What's on your mind"
        onChange={(editorState) => handleEditorChange(editorState)}
      />
    </div>
  );
};

RichTextEditor.propTypes = {
  setEditorValue: PropTypes.func,
};


export default RichTextEditor;

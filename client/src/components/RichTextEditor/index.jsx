import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import { RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import "./index.css";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [activeUtil, setActiveUtil] = useState("");

  const toggleUtils = (util) => {
    if(activeUtil == util){
      setActiveUtil("")
    } else {
      setActiveUtil(util)
    }
  }
  const handleBoldClick = (e) => {
    e.preventDefault();
    toggleUtils("BOLD")
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const handleItalicClick = (e) => {
    e.preventDefault();
    toggleUtils("ITALIC")
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  return (
    <div className="grow">
      <div className="px-2 flex text-base text-gray-500">
        <div
          className={`
            cursor-pointer px-4 py-[2px] hover:bg-gray-100 mt-5
            ${activeUtil == "BOLD" && "active"}`
          }
          onMouseDown={handleBoldClick}
        >
          Bold
        </div>
        <div
          className={`
            cursor-pointer px-4 py-[2px] hover:bg-gray-100 mt-5
            ${activeUtil == "ITALIC" && "active"}`
          }
          onMouseDown={handleItalicClick}
        >
          Italic
        </div>
      </div>
      <Editor
        editorState={editorState}
        placeholder="What's on your mind"
        onChange={(editorState) => setEditorState(editorState)}
      />
    </div>
  );
};

export default RichTextEditor;

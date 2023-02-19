import { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
} from "react-icons/ai";
function FileExplorer({
  explorer,
  handleInsertNode,
  handleDeleteNode,
  handleRenameNode,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [inputValue, setInutValue] = useState("");
  const [showInput, setShowInput] = useState({
    visibility: false,
    isFolder: null,
  });
  const [isRenaming, setIsRenaming] = useState(false);

  const handleClick = (e, isFolder, renaming) => {
    // console.log(e, isFolder, renaming);
    e.stopPropagation();
    setIsRenaming(renaming);
    setIsOpen(true);
    setShowInput({
      visibility: true,
      isFolder,
    });
    if (renaming) setInutValue(explorer.name);
  };

  const handleSubmit = (e) => {
    if (isRenaming) {
      //   setInutValue(explorer.name);
      if (e.key === "Enter") {
        handleRenameNode(explorer.id, inputValue);
        setShowInput({
          ...showInput,
          visibility: false,
        });
      }
    } else {
      if (e.key === "Enter") {
        handleInsertNode(explorer.id, inputValue, showInput.isFolder);
        setShowInput({
          ...showInput,
          visibility: false,
        });
      }
    }
  };

  if (explorer?.isFolder) {
    return (
      <>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: "flex", cursor: "pointer" }}
        >
          <span>📁 {explorer.name}</span>
          <div>
            <button
              style={{
                background: "none",
                outline: "none",
                border: "1px solid #eee",
                margin: "0 .4rem",
                cursor: "pointer",
              }}
              onClick={(e) => handleClick(e, true, false)}
            >
              <AiOutlineFolderAdd style={{ fontSize: "1rem" }} />
            </button>
            <button
              style={{
                background: "none",
                outline: "none",
                border: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={(e) => handleClick(e, false, false)}
            >
              <AiOutlineFileAdd style={{ fontSize: "1rem" }} />
            </button>
            <button
              style={{
                background: "none",
                outline: "none",
                border: "1px solid #eee",
                cursor: "pointer",
                marginLeft: "5px",
              }}
              onClick={(e) => handleClick(e, true, true)}
            >
              <AiOutlineEdit />
            </button>
            <button
              style={{
                background: "none",
                outline: "none",
                border: "1px solid #eee",
                cursor: "pointer",
                marginLeft: "5px",
              }}
              onClick={() => handleDeleteNode(explorer.id)}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
        <div
          style={{ paddingLeft: "1.5rem", display: isOpen ? "block" : "none" }}
        >
          {showInput.visibility && (
            <div>
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                autoFocus
                onChange={(e) => setInutValue(e.target.value)}
                value={inputValue}
                onBlur={() => setShowInput({ ...showInput, visibility: false })}
                onKeyDown={handleSubmit}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <div key={exp.id}>
                {" "}
                <FileExplorer
                  explorer={exp}
                  handleInsertNode={handleInsertNode}
                  handleDeleteNode={handleDeleteNode}
                  handleRenameNode={handleRenameNode}
                />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ display: "block", margin: "5px 0px" }}>
          📄 {explorer?.name}
        </span>
        <div>
          <button
            style={{
              background: "none",
              outline: "none",
              border: "1px solid #eee",
              cursor: "pointer",
              marginLeft: "5px",
            }}
            onClick={(e) => handleClick(e, false, true)}
          >
            <AiOutlineEdit />
          </button>
          <button
            style={{
              background: "none",
              outline: "none",
              border: "1px solid #eee",
              cursor: "pointer",
              marginLeft: "5px",
            }}
            onClick={() => handleDeleteNode(explorer.id)}
          >
            <AiOutlineDelete />
          </button>
        </div>
      </div>
    );
  }
}

export default FileExplorer;

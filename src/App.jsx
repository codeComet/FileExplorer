import { useState } from "react";
import folderData from "./data/folderData";
import FileExplorer from "./components/FileExplorer";
import useTreeTraverse from "./hooks/useTreeTraverse";

export default function App() {
  const { insertNode, deleteNode, renameNode } = useTreeTraverse();
  const [explorer, setExplorer] = useState(folderData);
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorer, folderId, item, isFolder);
    setExplorer(finalTree);
  };

  const handleDeleteNode = (folderId) => {
    const finalTree = deleteNode(explorer, folderId);
    setExplorer(finalTree);
  };

  const handleRenameNode = (folderId, newName) => {
    const finalTree = renameNode(explorer, folderId, newName);
    setExplorer(finalTree);
  };

  return (
    <div className="App">
      <FileExplorer
        explorer={explorer}
        setExplorer={setExplorer}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleRenameNode={handleRenameNode}
      />
    </div>
  );
}

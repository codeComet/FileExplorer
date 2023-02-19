function useTreeTraverse() {
  function insertNode(tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    if (tree.items) {
      latestNode = tree.items.map((obj) => {
        return insertNode(obj, folderId, item, isFolder);
      });
    }
    return { ...tree, items: latestNode };
  }

  function deleteNode(tree, folderId) {
    if (tree.id === folderId) {
      return null;
    }
    let latestNode = [];
    if (tree.items) {
      latestNode = tree.items
        .filter((ob) => {
          return ob.id !== folderId;
        })
        .map((item) => {
          return deleteNode(item, folderId);
        });
    }

    return { ...tree, items: latestNode };
  }

  function renameNode(tree, folderId, newName) {
    if (tree.id === folderId) {
      return { ...tree, name: newName };
    }
    let latestNode = [];
    if (tree.items) {
      latestNode = tree.items.map((ob) => {
        return renameNode(ob, folderId, newName);
      });
    }

    return { ...tree, items: latestNode };
  }

  return { insertNode, deleteNode, renameNode };
}

export default useTreeTraverse;

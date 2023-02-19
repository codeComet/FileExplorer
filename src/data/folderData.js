const data = {
  id: "1",
  name: "root",
  isFolder: true,
  items: [
    {
      id: "2",
      name: "public",
      isFolder: true,
      items: [{ id: "3", name: "index.html", isFolder: false }],
    },
    {
      id: "4",
      name: "src",
      isFolder: true,
      items: [
        {
          id: "5",
          name: "App.js",
          isFolder: false,
        },
        {
          id: "6",
          name: "App.css",
          isFolder: false,
        },
        {
          id: "7",
          name: "index.js",
          isFolder: false,
        },
      ],
    },
    {
      id: "8",
      name: "package.json",
      isFolder: false,
    },
  ],
};

export default data;

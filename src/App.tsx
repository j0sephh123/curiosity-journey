import Tree from "./components/Tree";

function App() {
  const treeData = {
    id: "root",
    label: "Root Node",
    children: [
      {
        id: "level1-1",
        label: "Level 1 - Node 1",
        children: [
          {
            id: "level2-1",
            label: "Level 2 - Node 1",
            children: [
              {
                id: "level3-1",
                label: "Level 3 - Node 1",
                children: [
                  {
                    id: "level4-1",
                    label: "Level 4 - Node 1",
                  },
                  {
                    id: "level4-2",
                    label: "Level 4 - Node 2",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "level1-2",
        label: "Level 1 - Node 2",
        children: [
          {
            id: "level2-2",
            label: "Level 2 - Node 2",
            children: [
              {
                id: "level3-2",
                label: "Level 3 - Node 2",
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Tree Component Example
      </h1>
      <Tree data={treeData} />
    </div>
  );
}

export default App;

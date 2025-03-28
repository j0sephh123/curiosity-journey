import { useState } from "react";
import { Note } from "../types";

interface GraphProps {
  notes: Note[];
  onNodeClick: (noteId: string) => void;
}

interface TreeNode {
  note: Note;
  children: TreeNode[];
}

const Graph: React.FC<GraphProps> = ({ notes, onNodeClick }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(notes.map((note) => note.id))
  );

  // Build tree structure
  const buildTree = (note: Note): TreeNode => {
    return {
      note,
      children: note.connections
        .map((id: string) => notes.find((n: Note) => n.id === id))
        .filter((n): n is Note => n !== undefined)
        .map(buildTree),
    };
  };

  const tree = notes.length > 0 ? buildTree(notes[0]) : null;

  const toggleNode = (noteId: string) => {
    const newExpandedNodes = new Set(expandedNodes);
    if (expandedNodes.has(noteId)) {
      newExpandedNodes.delete(noteId);
    } else {
      newExpandedNodes.add(noteId);
    }
    setExpandedNodes(newExpandedNodes);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedNodes.has(node.note.id);

    return (
      <div key={node.note.id} className="flex flex-col items-center">
        <div
          className="relative group cursor-pointer"
          style={{ marginLeft: `${level * 100}px` }}
        >
          <div
            className="w-32 p-2 rounded-lg bg-blue-500 text-white text-center hover:bg-blue-600 transition-colors"
            onClick={() => onNodeClick(node.note.id)}
          >
            {node.note.title || "Untitled"}
          </div>
          {hasChildren && (
            <button
              className="absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-blue-500 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.note.id);
              }}
            >
              {isExpanded ? "−" : "+"}
            </button>
          )}
        </div>
        {hasChildren && isExpanded && (
          <div className="flex flex-col items-center">
            {node.children.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  if (!tree) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to Note Graph!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Create your first note to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-auto">
      <div className="flex flex-col items-center">{renderNode(tree)}</div>
    </div>
  );
};

export default Graph;

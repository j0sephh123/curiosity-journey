import { useState } from "react";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
}

interface TreeProps {
  data: TreeNode;
}

const Tree = ({ data }: TreeProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(nodeId)) {
        next.delete(nodeId);
      } else {
        next.add(nodeId);
      }
      return next;
    });
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id} className="my-1">
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded px-2 py-1"
          style={{ marginLeft: `${level * 1.5}rem` }}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {hasChildren && (
            <span className="text-gray-500 dark:text-gray-400">
              {isExpanded ? "▼" : "▶"}
            </span>
          )}
          <span className="text-gray-700 dark:text-gray-300">{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="ml-4">
            {node.children?.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
      {renderNode(data)}
    </div>
  );
};

export default Tree;

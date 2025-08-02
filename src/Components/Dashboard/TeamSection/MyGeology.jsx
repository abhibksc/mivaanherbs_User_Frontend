import React, { useEffect, useState } from "react";
import api from "../../../../utils/api";
// Circle User Component
const CircleUser = ({ name, userId, color = "bg-blue-600", onClick }) => (
  <div className="flex flex-col items-center space-y-1 cursor-pointer" onClick={onClick}>
    <div className={`w-20 h-20 rounded-full ${color} text-white flex items-center justify-center shadow-lg`}>
      <div className="text-xs font-semibold text-center leading-tight px-1">{name}</div>
    </div>
    <span className="text-sm text-gray-700 font-medium">{userId}</span>
  </div>
);

// Recursive Tree Node
const TreeNode = ({ node }) => {
  const [expanded, setExpanded] = useState(false);

  if (!node) return null;

  const toggle = () => setExpanded(!expanded);

  return (
    <div className="flex flex-col items-center space-y-4 relative">
      <CircleUser name={node.full_name} userId={node.username} color={node.color || 'bg-blue-600'} onClick={toggle} />
      {node.left || node.right ? (
        <>
          <div className="w-px h-8 bg-gray-400"></div>
          {expanded && (
            <div className="flex justify-center space-x-10 relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gray-400 z-0"></div>
              <div className="flex flex-col items-center z-10"><TreeNode node={node.left} /></div>
              <div className="flex flex-col items-center z-10"><TreeNode node={node.right} /></div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
};

const MyGeology = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/user/mygeology")
      .then((res) => setTreeData(res.data.tree))
      .catch((err) => console.error("Failed to fetch genealogy:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-8">My Genealogy Tree</h2>
      {loading ? <div className="text-center">Loading...</div> : (
        <div className="flex justify-center">
          <TreeNode node={treeData} />
        </div>
      )}
    </div>
  );
};

export default MyGeology;

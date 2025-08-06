import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TreeStyles.css"; // Custom styles for tree

const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleNode = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <div className="tree-node cursor-pointer" onClick={toggleNode}>
        <p className="font-semibold">{node.full_name}</p>
        <p className="text-xs text-gray-600">{node.username}</p>
        {node.children && node.children.length > 0 && (
          <span className="text-xs text-blue-600 mt-1 inline-block">
            {isExpanded ? "[-] Collapse" : "[+] Expand"}
          </span>
        )}
      </div>

      {isExpanded && node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNode key={child._id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const MyGeology = () => {
  const [treeData, setTreeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/mygeology`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTreeData(response.data.data);
      } catch (err) {
        console.error("Error fetching tree:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTreeData();
  }, [token]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!treeData) return <p className="text-center mt-10 text-red-500">No data found.</p>;

  return (
    <div className="p-6 overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My MLM Tree</h2>
      <div className="tree-container">
        <ul className="tree">
          <TreeNode node={treeData} />
        </ul>
      </div>
    </div>
  );
};

export default MyGeology;

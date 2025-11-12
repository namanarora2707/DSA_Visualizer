import React, { useState } from "react";
import "./btreecontrol.css";

export default function BinaryTreeControlPanel({ onOperate }) {
  const [data, setData] = useState("");

  const handleInsert = () => {
    if (data === "") return;
    onOperate({
      type: "INSERT",
      payload: { data: parseInt(data) || 0 }
    });
    setData("");
  };

  const handleDelete = () => {
    if (data === "") return;
    onOperate({
      type: "DELETE",
      payload: { data: parseInt(data) || 0 }
    });
    setData("");
  };

  const handleSearch = () => {
    if (data === "") return;
    onOperate({
      type: "SEARCH",
      payload: { data: parseInt(data) || 0 }
    });
    setData("");
  };

  const handleTraverseInorder = () => {
    onOperate({ type: "TRAVERSE_INORDER" });
  };

  const handleTraversePreorder = () => {
    onOperate({ type: "TRAVERSE_PREORDER" });
  };

  const handleTraversePostorder = () => {
    onOperate({ type: "TRAVERSE_POSTORDER" });
  };

  const handleMoveToRoot = () => {
    onOperate({ type: "MOVE_TO_ROOT" });
  };

  const handleMoveToLeft = () => {
    onOperate({ type: "MOVE_TO_LEFT" });
  };

  const handleMoveToRight = () => {
    onOperate({ type: "MOVE_TO_RIGHT" });
  };

  const handleReset = () => {
    onOperate({ type: "RESET" });
  };

  return (
    <div className="btree-control-panel">
      <h3>Binary Tree Controls</h3>
      
      <div className="control-group">
        <label htmlFor="data">Node Value:</label>
        <input
          id="data"
          type="number"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="data-input"
          placeholder="Enter node value"
        />
      </div>

      <div className="button-group">
        <button onClick={handleInsert} className="btn btn-primary">
          Insert Node
        </button>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Node
        </button>
        <button onClick={handleSearch} className="btn btn-secondary">
          Search Node
        </button>
        <button onClick={handleTraverseInorder} className="btn btn-info">
          Inorder Traversal
        </button>
        <button onClick={handleTraversePreorder} className="btn btn-info">
          Preorder Traversal
        </button>
        <button onClick={handleTraversePostorder} className="btn btn-info">
          Postorder Traversal
        </button>
        <button onClick={handleMoveToRoot} className="btn btn-warning">
          Move to Root
        </button>
        <button onClick={handleMoveToLeft} className="btn btn-warning">
          Move to Left
        </button>
        <button onClick={handleMoveToRight} className="btn btn-warning">
          Move to Right
        </button>
        <button onClick={handleReset} className="btn btn-warning">
          Reset
        </button>
      </div>

      <div className="explanation">
        <h4>Binary Tree Properties:</h4>
        <ul>
          <li><strong>Structure:</strong> Each node has at most two children, referred to as left and right</li>
          <li><strong>Binary Search Tree:</strong> Left child {'<'} parent {'<'} right child</li>
          <li><strong>Root:</strong> Topmost node with no parent</li>
          <li><strong>Leaf:</strong> Node with no children</li>
          <li><strong>Traversal:</strong> Inorder, Preorder, Postorder methods to visit nodes</li>
        </ul>
      </div>
    </div>
  );
}
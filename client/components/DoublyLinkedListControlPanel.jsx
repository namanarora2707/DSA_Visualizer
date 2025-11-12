import React, { useState } from "react";
import "./dllcontrol.css";

export default function DoublyLinkedListControlPanel({ onOperate }) {
  const [data, setData] = useState("");
  const [index, setIndex] = useState(0);

  const handleInsertAtHead = () => {
    if (data === "") return;
    onOperate({
      type: "INSERT_AT_HEAD",
      payload: { data }
    });
    setData("");
  };

  const handleInsertAtTail = () => {
    if (data === "") return;
    onOperate({
      type: "INSERT_AT_TAIL",
      payload: { data }
    });
    setData("");
  };

  const handleInsertAtIndex = () => {
    if (data === "") return;
    onOperate({
      type: "INSERT_AT_INDEX",
      payload: { data, index: parseInt(index) || 0 }
    });
    setData("");
  };

  const handleDeleteAtHead = () => {
    onOperate({ type: "DELETE_AT_HEAD" });
  };

  const handleDeleteAtTail = () => {
    onOperate({ type: "DELETE_AT_TAIL" });
  };

  const handleDeleteAtIndex = () => {
    onOperate({
      type: "DELETE_AT_INDEX",
      payload: { index: parseInt(index) || 0 }
    });
  };

  const handleTraverseForward = () => {
    onOperate({ type: "TRAVERSE_FORWARD" });
  };

  const handleTraverseBackward = () => {
    onOperate({ type: "TRAVERSE_BACKWARD" });
  };

  const handleMoveNext = () => {
    onOperate({ type: "MOVE_NEXT" });
  };

  const handleMovePrev = () => {
    onOperate({ type: "MOVE_PREV" });
  };

  const handleReset = () => {
    onOperate({ type: "RESET" });
  };

  return (
    <div className="dll-control-panel">
      <h3>Doubly Linked List Controls</h3>
      
      <div className="control-group">
        <label htmlFor="data">Node Data:</label>
        <input
          id="data"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="data-input"
          placeholder="Enter node data"
        />
      </div>

      <div className="control-group">
        <label htmlFor="index">Index:</label>
        <input
          id="index"
          type="number"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          className="index-input"
          placeholder="Enter index"
        />
      </div>

      <div className="button-group">
        <button onClick={handleInsertAtHead} className="btn btn-primary">
          Insert at Head
        </button>
        <button onClick={handleInsertAtTail} className="btn btn-primary">
          Insert at Tail
        </button>
        <button onClick={handleInsertAtIndex} className="btn btn-secondary">
          Insert at Index
        </button>
        <button onClick={handleDeleteAtHead} className="btn btn-danger">
          Delete at Head
        </button>
        <button onClick={handleDeleteAtTail} className="btn btn-danger">
          Delete at Tail
        </button>
        <button onClick={handleDeleteAtIndex} className="btn btn-danger">
          Delete at Index
        </button>
        <button onClick={handleTraverseForward} className="btn btn-info">
          Traverse Forward
        </button>
        <button onClick={handleTraverseBackward} className="btn btn-info">
          Traverse Backward
        </button>
        <button onClick={handleMoveNext} className="btn btn-info">
          Move Next
        </button>
        <button onClick={handleMovePrev} className="btn btn-info">
          Move Previous
        </button>
        <button onClick={handleReset} className="btn btn-warning">
          Reset
        </button>
      </div>

      <div className="explanation">
        <h4>Doubly Linked List Properties:</h4>
        <ul>
          <li><strong>Nodes:</strong> Each node contains data and pointers to both next and previous nodes</li>
          <li><strong>Head:</strong> Points to the first node in the list</li>
          <li><strong>Tail:</strong> Points to the last node in the list</li>
          <li><strong>Bidirectional:</strong> Can traverse in both forward and backward directions</li>
          <li><strong>Dynamic Size:</strong> Can grow and shrink during runtime</li>
        </ul>
      </div>
    </div>
  );
}
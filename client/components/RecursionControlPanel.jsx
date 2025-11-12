import React, { useState } from "react";
import "./recursioncontrol.css";

export default function RecursionControlPanel({ onOperate }) {
  const [functionType, setFunctionType] = useState("factorial");
  const [parameter, setParameter] = useState(5);

  const handleStart = () => {
    onOperate({
      type: "START_RECURSION",
      payload: {
        functionType,
        parameters: getParametersForFunction(functionType, parameter)
      }
    });
  };

  const handleStepForward = () => {
    onOperate({ type: "STEP_FORWARD" });
  };

  const handleStepBackward = () => {
    onOperate({ type: "STEP_BACKWARD" });
  };

  const handleReset = () => {
    onOperate({ type: "RESET" });
  };

  const getParametersForFunction = (type, value) => {
    switch (type) {
      case "factorial":
      case "fibonacci":
        return { n: parseInt(value) || 0 };
      case "binaryTree":
      case "doublyLinkedList":
        return { start: parseInt(value) || 0 };
      default:
        return { n: parseInt(value) || 0 };
    }
  };

  return (
    <div className="recursion-control-panel">
      <h3>Recursion Controls</h3>
      
      <div className="control-group">
        <label htmlFor="functionType">Function Type:</label>
        <select
          id="functionType"
          value={functionType}
          onChange={(e) => setFunctionType(e.target.value)}
          className="function-select"
        >
          <option value="factorial">Factorial</option>
          <option value="fibonacci">Fibonacci</option>
          <option value="binaryTree">Binary Tree Traversal</option>
          <option value="doublyLinkedList">Doubly Linked List</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="parameter">Parameter:</label>
        <input
          id="parameter"
          type="number"
          min="0"
          max="10"
          value={parameter}
          onChange={(e) => setParameter(e.target.value)}
          className="parameter-input"
        />
        <small className="hint">
          {functionType === "factorial" || functionType === "fibonacci" 
            ? "Enter a number (0-10 recommended)" 
            : "Enter starting value"}
        </small>
      </div>

      <div className="button-group">
        <button onClick={handleStart} className="btn btn-primary">
          Start Visualization
        </button>
        <button onClick={handleStepForward} className="btn btn-secondary">
          Step Forward
        </button>
        <button onClick={handleStepBackward} className="btn btn-secondary">
          Step Backward
        </button>
        <button onClick={handleReset} className="btn btn-danger">
          Reset
        </button>
      </div>

      <div className="explanation">
        <h4>How Recursion Works:</h4>
        <ul>
          <li><strong>Call Stack:</strong> Each recursive call is added to the stack</li>
          <li><strong>Base Case:</strong> Stops the recursion when a condition is met</li>
          <li><strong>Return:</strong> Values are returned as functions complete</li>
          <li><strong>Stack Unwinding:</strong> The stack shrinks as functions return</li>
        </ul>
      </div>
    </div>
  );
}
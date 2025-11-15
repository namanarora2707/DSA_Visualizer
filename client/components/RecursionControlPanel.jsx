import React, { useState } from "react";
import { getCallSequenceFromCode } from "../utils/openrouter.js";
import "./recursioncontrol.css";

export default function RecursionControlPanel({ onOperate }) {
  const [functionType, setFunctionType] = useState("factorial");
  const [parameter, setParameter] = useState(5);
  const [pattern, setPattern] = useState("decrement");
  const [functionCode, setFunctionCode] = useState("");

  const handleStart = () => {
    // If the user provided a custom function and wants AI assistance, try to load call sequence first
    if (functionType === 'custom' && pattern === 'none' && functionCode) {
      // start and then request calls
      onOperate({ type: "START_RECURSION", payload: { functionType, parameters: getParametersForFunction(functionType, parameter), pattern } });
      getCallSequenceFromCode(functionCode, 12).then((seq) => {
        if (seq && seq.length > 0) {
          onOperate({ type: "LOAD_CALLS", payload: { calls: seq } });
        }
      });
    } else {
      onOperate({
        type: "START_RECURSION",
        payload: {
          functionType,
          parameters: getParametersForFunction(functionType, parameter),
          pattern
        }
      });
    }
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
          <option value="custom">Custom (use the pattern option)</option>
        </select>
      </div>
      {functionType === 'custom' && (
        <div className="control-group">
          <label htmlFor="pattern">Custom Pattern</label>
          <select id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} className="function-select">
            <option value="decrement">Decrement (n → n-1)</option>
            <option value="split">Split (example: fib style, n → n - 1 and n - 2)</option>
            <option value="none">None (single-step call)</option>
          </select>
          <small className="hint">Use a custom pattern when visualizing functions other than built-ins</small>
        </div>
      )}

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

      {functionType === 'custom' && (
        <div className="control-group">
          <label htmlFor="functionCode">Custom Function Code (optional)</label>
          <textarea id="functionCode" value={functionCode} onChange={(e) => setFunctionCode(e.target.value)} placeholder={"function f(n) { if(n<=1) return n; return f(n-1) + f(n-2) }"} className="code-input" />
          <small className="hint">Enter function code to let OpenRouter try to generate a call sequence (requires API key).</small>
        </div>
      )}

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
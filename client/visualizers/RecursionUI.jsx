import React from "react";
import "./recursion.css";

export default function RecursionUI({ state }) {
  const { callStack, currentFunction, functionType, parameters, isRunning } = state;

  if (!isRunning) {
    return (
      <div className="recursion-ui empty">
        <h3>Recursion Visualizer</h3>
        <p>Select a recursive function to visualize</p>
      </div>
    );
  }

  return (
    <div className="recursion-ui">
      <h3>Recursion Visualization: {functionType}</h3>
      
      {/* Call Stack Visualization */}
      <div className="call-stack-container">
        <h4>Call Stack</h4>
        <div className="call-stack">
          {callStack.length === 0 ? (
            <div className="empty-stack">Call stack is empty</div>
          ) : (
            callStack.map((call, index) => (
              <div 
                key={call.id} 
                className={`stack-frame ${call.id === currentFunction?.id ? 'current' : ''}`}
                style={{ marginLeft: `${call.depth * 20}px` }}
              >
                <div className="frame-header">
                  <span className="frame-id">#{call.id}</span>
                  <span className="frame-function">{call.functionType}</span>
                </div>
                <div className="frame-params">
                  {Object.entries(call.parameters).map(([key, value]) => (
                    <span key={key} className="param">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Current Function Details */}
      {currentFunction && (
        <div className="current-function">
          <h4>Current Function</h4>
          <div className="function-details">
            <div className="detail-row">
              <span className="label">Function:</span>
              <span className="value">{currentFunction.functionType}</span>
            </div>
            <div className="detail-row">
              <span className="label">Parameters:</span>
              <span className="value">
                {Object.entries(currentFunction.parameters).map(([key, value]) => (
                  <span key={key} className="param">{key}={value} </span>
                ))}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Stack Depth:</span>
              <span className="value">{currentFunction.depth}</span>
            </div>
          </div>
        </div>
      )}

      {/* Function Type Specific Visualization */}
      <div className="visualization-area">
        <h4>Structure Visualization</h4>
        {functionType === "binaryTree" && <BinaryTreeVisualization callStack={callStack} />}
        {functionType === "doublyLinkedList" && <DoublyLinkedListVisualization callStack={callStack} />}
        {functionType === "factorial" && <FactorialVisualization callStack={callStack} parameters={parameters} />}
        {functionType === "fibonacci" && <FibonacciVisualization callStack={callStack} parameters={parameters} />}
      </div>
    </div>
  );
}

// Binary Tree Visualization Component
function BinaryTreeVisualization({ callStack }) {
  // Create a simple binary tree representation
  const nodes = callStack.map(call => ({
    id: call.id,
    value: call.parameters.value || call.id,
    depth: call.depth
  }));

  return (
    <div className="tree-visualization">
      <p>Binary Tree Traversal Visualization</p>
      <div className="tree-nodes">
        {nodes.map(node => (
          <div key={node.id} className="tree-node" style={{ marginLeft: `${node.depth * 30}px` }}>
            <div className="node-content">
              <span className="node-value">{node.value}</span>
              <span className="node-id">(ID: {node.id})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Doubly Linked List Visualization Component
function DoublyLinkedListVisualization({ callStack }) {
  const nodes = callStack.map(call => ({
    id: call.id,
    value: call.parameters.value || call.id
  }));

  return (
    <div className="dll-visualization">
      <p>Doubly Linked List Traversal Visualization</p>
      <div className="dll-container">
        {nodes.map((node, index) => (
          <div key={node.id} className="dll-node">
            <div className="node-content">
              <span className="node-value">{node.value}</span>
            </div>
            {index < nodes.length - 1 && <div className="arrow">→</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// Factorial Visualization Component
function FactorialVisualization({ callStack, parameters }) {
  return (
    <div className="factorial-visualization">
      <p>Factorial Function Visualization</p>
      <div className="factorial-expression">
        {parameters?.n}! = 
        {callStack.map((call, index) => (
          <span key={call.id}>
            {call.parameters.n} {index < callStack.length - 1 ? ' × ' : ''}
          </span>
        ))}
        {callStack.length > 0 && callStack[callStack.length - 1].parameters.n === 0 && '1'}
      </div>
      <div className="stack-representation">
        <p>Call Stack Representation:</p>
        {callStack.map(call => (
          <div key={call.id} className="stack-item">
            factorial({call.parameters.n})
          </div>
        ))}
      </div>
    </div>
  );
}

// Fibonacci Visualization Component
function FibonacciVisualization({ callStack, parameters }) {
  return (
    <div className="fibonacci-visualization">
      <p>Fibonacci Function Visualization</p>
      <div className="fibonacci-expression">
        fib({parameters?.n}) = 
        {callStack.map((call, index) => (
          <span key={call.id}>
            fib({call.parameters.n}) {index < callStack.length - 1 ? ' + ' : ''}
          </span>
        ))}
      </div>
      <div className="branching-diagram">
        <p>Branching Diagram:</p>
        {callStack.map(call => (
          <div key={call.id} className="branch-item" style={{ marginLeft: `${call.depth * 20}px` }}>
            fib({call.parameters.n})
          </div>
        ))}
      </div>
    </div>
  );
}
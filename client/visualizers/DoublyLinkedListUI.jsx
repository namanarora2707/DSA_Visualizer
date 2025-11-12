import React from "react";
import "./dll.css";

export default function DoublyLinkedListUI({ nodes, size, current }) {
  if (nodes.length === 0) {
    return (
      <div className="dll-ui empty">
        <h3>Doubly Linked List Visualizer</h3>
        <p>The list is currently empty</p>
      </div>
    );
  }

  return (
    <div className="dll-ui">
      <h3>Doubly Linked List</h3>
      
      <div className="list-info">
        <div className="info-item">
          <span className="label">Size:</span>
          <span className="value">{size}</span>
        </div>
        {current && (
          <div className="info-item">
            <span className="label">Current Node:</span>
            <span className="value">{current.data}</span>
          </div>
        )}
      </div>
      
      <div className="dll-visualization">
        <div className="dll-container">
          {nodes.map((node, index) => (
            <div key={index} className="dll-node-wrapper">
              <div className={`dll-node ${node.isCurrent ? 'current' : ''}`}>
                <div className="node-data">{node.data}</div>
                <div className="node-pointers">
                  <div className={`pointer prev ${node.hasPrev ? 'active' : ''}`}></div>
                  <div className={`pointer next ${node.hasNext ? 'active' : ''}`}></div>
                </div>
              </div>
              {index < nodes.length - 1 && (
                <div className="connection">
                  <div className="arrow forward">→</div>
                  <div className="arrow backward">←</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color current-node"></div>
          <span>Current Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color pointer-active"></div>
          <span>Active Pointer</span>
        </div>
        <div className="legend-item">
          <div className="legend-color pointer-inactive"></div>
          <span>Inactive Pointer</span>
        </div>
      </div>
    </div>
  );
}
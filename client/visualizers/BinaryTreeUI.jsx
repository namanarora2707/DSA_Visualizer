import React from "react";
import "./btree.css";

export default function BinaryTreeUI({ nodes, root, current, traversalPath }) {
  if (!root) {
    return (
      <div className="btree-ui empty">
        <h3>Binary Tree Visualizer</h3>
        <p>The tree is currently empty</p>
      </div>
    );
  }

  // Convert nodes to a hierarchical structure for visualization
  const treeLevels = buildTreeLevels(nodes);

  return (
    <div className="btree-ui">
      <h3>Binary Tree Visualization</h3>
      
      <div className="tree-info">
        <div className="info-item">
          <span className="label">Root Value:</span>
          <span className="value">{root.data}</span>
        </div>
        {current && (
          <div className="info-item">
            <span className="label">Current Node:</span>
            <span className="value">{current.data}</span>
          </div>
        )}
        <div className="info-item">
          <span className="label">Node Count:</span>
          <span className="value">{nodes.length}</span>
        </div>
      </div>
      
      <div className="tree-visualization">
        <div className="tree-container">
          {treeLevels.map((level, levelIndex) => (
            <div key={levelIndex} className="tree-level">
              <div className="level-nodes">
                {level.map((node, nodeIndex) => (
                  <div 
                    key={`${levelIndex}-${nodeIndex}`} 
                    className={`tree-node ${node.isCurrent ? 'current' : ''}`}
                    style={{ 
                      marginLeft: `${node.marginLeft}px`,
                      marginRight: `${node.marginRight}px`
                    }}
                  >
                    <div className="node-content">
                      <div className="node-value">{node.data}</div>
                      <div className="node-connections">
                        <div className={`connection left ${node.hasLeft ? 'active' : ''}`}></div>
                        <div className={`connection right ${node.hasRight ? 'active' : ''}`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {traversalPath && traversalPath.length > 0 && (
        <div className="traversal-info">
          <h4>Traversal Path</h4>
          <div className="traversal-path">
            {traversalPath.map((value, index) => (
              <span key={index} className="traversal-node">
                {value}
                {index < traversalPath.length - 1 && <span className="separator">→</span>}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color current-node"></div>
          <span>Current Node</span>
        </div>
        <div className="legend-item">
          <div className="legend-color connection-active"></div>
          <span>Active Connection</span>
        </div>
        <div className="legend-item">
          <div className="legend-color connection-inactive"></div>
          <span>Inactive Connection</span>
        </div>
      </div>
    </div>
  );
}

// Helper function to build tree levels for visualization
function buildTreeLevels(nodes) {
  if (!nodes || nodes.length === 0) return [];
  
  // Group nodes by level
  const levels = {};
  nodes.forEach(node => {
    if (!levels[node.level]) {
      levels[node.level] = [];
    }
    levels[node.level].push(node);
  });
  
  // Convert to array of levels
  const levelArray = [];
  Object.keys(levels).sort((a, b) => a - b).forEach(level => {
    // Calculate spacing for visualization
    const levelNodes = levels[level];
    levelNodes.forEach((node, index) => {
      // Simple spacing calculation
      node.marginLeft = index * 30;
      node.marginRight = (levelNodes.length - index - 1) * 30;
    });
    levelArray.push(levelNodes);
  });
  
  return levelArray;
}
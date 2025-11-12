import React from "react";
import "./callstack.css";

export default function CallStackUI({ stack, currentFunction, isRunning }) {
  if (!isRunning) {
    return (
      <div className="call-stack-ui empty">
        <h3>Call Stack Visualizer</h3>
        <p>Initialize a function to start visualizing the call stack</p>
      </div>
    );
  }

  return (
    <div className="call-stack-ui">
      <h3>Function Call Stack</h3>
      
      <div className="stack-container">
        {stack.length === 0 ? (
          <div className="empty-stack">
            <p>Call stack is empty</p>
          </div>
        ) : (
          <div className="stack-visual">
            {stack.slice().reverse().map((call, index) => (
              <div 
                key={call.id} 
                className={`stack-frame ${call.id === currentFunction?.id ? 'current' : ''}`}
              >
                <div className="frame-header">
                  <span className="frame-id">#{call.id}</span>
                  <span className="frame-function">{call.functionName}</span>
                </div>
                <div className="frame-params">
                  {Object.entries(call.parameters).map(([key, value]) => (
                    <span key={key} className="param">
                      {key}: {value}
                    </span>
                  ))}
                </div>
                <div className="frame-time">
                  {new Date(call.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {currentFunction && (
        <div className="current-function-details">
          <h4>Current Function</h4>
          <div className="function-info">
            <div className="info-row">
              <span className="label">Function:</span>
              <span className="value">{currentFunction.functionName}</span>
            </div>
            <div className="info-row">
              <span className="label">Parameters:</span>
              <span className="value">
                {Object.entries(currentFunction.parameters).map(([key, value]) => (
                  <span key={key} className="param-detail">{key}={value} </span>
                ))}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Stack Position:</span>
              <span className="value">#{currentFunction.id}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="stack-info">
        <div className="info-item">
          <span className="label">Stack Size:</span>
          <span className="value">{stack.length}</span>
        </div>
        <div className="info-item">
          <span className="label">Last Operation:</span>
          <span className="value">{currentFunction ? 'Push' : 'Pop'}</span>
        </div>
      </div>
    </div>
  );
}
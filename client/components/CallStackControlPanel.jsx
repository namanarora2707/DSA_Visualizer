import React, { useState } from "react";
import "./callstackcontrol.css";

export default function CallStackControlPanel({ onOperate }) {
  const [functionName, setFunctionName] = useState("factorial");
  const [parameterName, setParameterName] = useState("n");
  const [parameterValue, setParameterValue] = useState(5);

  const handleInitialize = () => {
    onOperate({
      type: "INITIALIZE_FUNCTION",
      payload: {
        functionName,
        parameters: { [parameterName]: parseInt(parameterValue) || 0 }
      }
    });
  };

  const handlePushCall = () => {
    onOperate({
      type: "PUSH_CALL",
      payload: {
        functionName: `${functionName}(${parameterName}=${parseInt(parameterValue) || 0})`,
        parameters: { [parameterName]: parseInt(parameterValue) || 0 }
      }
    });
  };

  const handlePopCall = () => {
    onOperate({
      type: "POP_CALL",
      payload: {
        result: "result"
      }
    });
  };

  const handleUpdateParameters = () => {
    onOperate({
      type: "UPDATE_PARAMETERS",
      payload: {
        parameters: { [parameterName]: parseInt(parameterValue) || 0 }
      }
    });
  };

  const handleReset = () => {
    onOperate({ type: "RESET" });
  };

  return (
    <div className="call-stack-control-panel">
      <h3>Call Stack Controls</h3>
      
      <div className="control-group">
        <label htmlFor="functionName">Function Name:</label>
        <input
          id="functionName"
          type="text"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
          className="function-input"
          placeholder="Enter function name"
        />
      </div>

      <div className="control-group">
        <label htmlFor="parameterName">Parameter Name:</label>
        <input
          id="parameterName"
          type="text"
          value={parameterName}
          onChange={(e) => setParameterName(e.target.value)}
          className="parameter-input"
          placeholder="Enter parameter name"
        />
      </div>

      <div className="control-group">
        <label htmlFor="parameterValue">Parameter Value:</label>
        <input
          id="parameterValue"
          type="number"
          value={parameterValue}
          onChange={(e) => setParameterValue(e.target.value)}
          className="value-input"
          placeholder="Enter parameter value"
        />
      </div>

      <div className="button-group">
        <button onClick={handleInitialize} className="btn btn-primary">
          Initialize Function
        </button>
        <button onClick={handlePushCall} className="btn btn-secondary">
          Push Call
        </button>
        <button onClick={handlePopCall} className="btn btn-secondary">
          Pop Call
        </button>
        <button onClick={handleUpdateParameters} className="btn btn-secondary">
          Update Parameters
        </button>
        <button onClick={handleReset} className="btn btn-danger">
          Reset
        </button>
      </div>

      <div className="explanation">
        <h4>How Call Stacks Work:</h4>
        <ul>
          <li><strong>Push:</strong> When a function is called, it's added to the top of the stack</li>
          <li><strong>Pop:</strong> When a function returns, it's removed from the stack</li>
          <li><strong>LIFO:</strong> Last In, First Out - the last function called is the first to return</li>
          <li><strong>Stack Overflow:</strong> Too many function calls can exceed memory limits</li>
        </ul>
      </div>
    </div>
  );
}
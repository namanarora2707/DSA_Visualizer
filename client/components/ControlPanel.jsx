import { useMemo, useState } from "react";
import "./controlpanel.css";

export default function ControlPanel({ type, onOperate }){
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const controls = useMemo(() => {
    switch (type) {
      case "linked-list":
        return (
          <div className="stack">
            <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Value" className="input" />
            <div className="grid2">
              <button className="btn" onClick={()=>onOperate({ op:"insertHead", args:value })}>Insert Head</button>
              <button className="btn" onClick={()=>onOperate({ op:"insertTail", args:value })}>Insert Tail</button>
              <button className="btnabcd" onClick={()=>onOperate({ op:"delete", args:value })}>Delete</button>
              <br />
              <button className="btnabcd" onClick={()=>onOperate({ op:"update", args:value })}>Update (Val--New Val)</button>
            </div>
          </div>
        );
      case "stack":
        return (
          <div className="stack">
            <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Value" className="input" />
            <div className="grid3">
              <button className="btn" onClick={()=>onOperate({ op:"push", args:value })}>Push</button>
              <button className="btn" onClick={()=>onOperate({ op:"pop", args:null })}>Pop</button>
              <button className="btn" onClick={()=>onOperate({ op:"peek", args:null })}>Peek</button>
            </div>
          </div>
        );
      case "queue":
        return (
          <div className="stack">
            <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Value" className="input" />
            <div className="grid2">
              <button className="btn" onClick={()=>onOperate({ op:"enqueue", args:value })}>Enqueue</button>
              <button className="btn" onClick={()=>onOperate({ op:"dequeue", args:null })}>Dequeue</button>
            </div>
          </div>
        );
      case "tree":
        return (
          <div className="stack">
            <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Number" className="input" />
            <div className="grid2">
              <button className="btn" onClick={()=>onOperate({ op:"insert", args:Number(value) })}>Insert</button>
              <button className="btn" onClick={()=>onOperate({ op:"delete", args:Number(value) })}>Delete</button>
            </div>
          </div>
        );
      case "graph":
        return (
          <div className="stack">
            <label className="label">Node</label>
            <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Node id" className="input" />
            <div className="grid2">
              <button className="btn" onClick={()=>onOperate({ op:"addNode", args:value })}>Add Node</button>
              <button className="btn" onClick={()=>onOperate({ op:"removeNode", args:value })}>Remove Node</button>
            </div>
            <label className="label">Edge</label>
            <div className="gridEdge">
              <input type="number" value={value2} onChange={(e)=>setValue2(e.target.value)} placeholder="Other node id" className="input" />
              <span>
                <button className="btn" style={{ marginRight: "15px" }} onClick={()=>onOperate({ op:"addEdge", args:{ from:value, to:value2 } })}>Add Edge</button>
                <button className="btn" onClick={()=>onOperate({ op:"removeEdge", args:{ from:value, to:value2 } })}>Remove Edge</button>
              </span>
              
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [type, value, value2, onOperate]);

  return <div>{controls}</div>;
}

import { useState } from "react";
import "./btreecontrol.css";

export default function BinaryTreeControlPanel({ onOperate }){
  const [value, setValue] = useState("");

  return (
    <div className="stack">
      <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Number" className="input" />
      <div className="grid2">
        <button className="btn" onClick={()=>onOperate({ op:"insert", args:Number(value) })}>Insert</button>
        <button className="btn" onClick={()=>onOperate({ op:"delete", args:Number(value) })}>Delete</button>
      </div>
    </div>
  );
}
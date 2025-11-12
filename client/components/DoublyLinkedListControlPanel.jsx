import { useState } from "react";
import "./dllcontrol.css";

export default function DoublyLinkedListControlPanel({ onOperate }){
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <div className="stack">
      <input value={value} onChange={(e)=>setValue(e.target.value)} placeholder="Value" className="input" />
      <div className="grid2">
        <button className="btn" onClick={()=>onOperate({ op:"insertHead", args:value })}>Insert Head</button>
        <button className="btn" onClick={()=>onOperate({ op:"insertTail", args:value })}>Insert Tail</button>
        <button className="btnabcd" onClick={()=>onOperate({ op:"delete", args:value })}>Delete</button>
        <br />
        <button className="btnabcd" onClick={()=>onOperate({ op:"insertAt", args:value })}>Insert At (index--value)</button>
        <button className="btnabcd" onClick={()=>onOperate({ op:"deleteAt", args:value })}>Delete At (index)</button>
        <button className="btnabcd" onClick={()=>onOperate({ op:"update", args:value })}>Update (index--newvalue)</button>
      </div>
    </div>
  );
}
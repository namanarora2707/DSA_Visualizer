import { useMemo, useReducer, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ControlPanel from "../components/ControlPanel.jsx";
import RecursionControlPanel from "../components/RecursionControlPanel.jsx";
import ComplexityBar from "../components/ComplexityBar.jsx";
import LinkedListUI from "../visualizers/LinkedListUI.jsx";
import StackUI from "../visualizers/StackUI.jsx";
import QueueUI from "../visualizers/QueueUI.jsx";
import TreeUI from "../visualizers/TreeUI.jsx";
import GraphUI from "../visualizers/GraphUI.jsx";
import RecursionUI from "../visualizers/RecursionUI.jsx";
import * as LL from "../ds-core-logic/linkedList.js";
import * as ST from "../ds-core-logic/stack.js";
import * as Q from "../ds-core-logic/queue.js";
import * as T from "../ds-core-logic/tree.js";
import * as G from "../ds-core-logic/graph.js";
import * as R from "../ds-core-logic/recursion.js";
import "./visualizer.css";

function reducer(state, action){
  switch(action.type){
    case "set":
      return { ...state, structure: action.payload, lastOp: action.op || null, logs: action.op ? [formatLog(action.op), ...state.logs].slice(0,25) : state.logs };
    case "reset":
      return { structure: action.payload, logs: [], lastOp: null };
    default:
      return state;
  }
}
function formatLog(op){ return `${op.name}${op.detail ? ` – ${op.detail}`: ""} (${op.complexity})`; }
function initByType(type){
  switch(type){
    case "linked-list": return LL.init();
    case "stack": return ST.init();
    case "queue": return Q.init();
    case "tree": return T.init();
    case "graph": return G.init();
    case "recursion": return R.init();
    default: return null;
  }
}

export default function Visualizer(){
  const { type = "" } = useParams();
  const navigate = useNavigate();
  const [key, setKey] = useState(0);
  const [state, dispatch] = useReducer(reducer, { structure: initByType(type), logs: [], lastOp: null });

  const name = useMemo(()=>({"linked-list":"Linked List",stack:"Stack",queue:"Queue",tree:"Binary Search Tree",graph:"Graph",recursion:"Recursion Visualization"})[type]||"Unknown",[type]);

  const operate = (action)=>{
    if(!type) return;
    try{
      let next = state.structure; let meta = null;
      switch(type){
        case "linked-list": ({ next, meta } = LL.apply(next, action)); break;
        case "stack": ({ next, meta } = ST.apply(next, action)); break;
        case "queue": ({ next, meta } = Q.apply(next, action)); break;
        case "tree": ({ next, meta } = T.apply(next, action)); break;
        case "graph": ({ next, meta } = G.apply(next, action)); break;
        case "recursion": ({ next, meta } = R.apply(next, action)); break;
      }
      dispatch({ type:"set", payload: next, op: meta||undefined });
    }catch(e){
      window.alert(e?.message || String(e));
    }
  };
  const reset=()=>{ dispatch({ type:"reset", payload: initByType(type) }); setKey(k=>k+1); };

  return (
    <div className="viz-page">
      <div className="topbar">
        <div className="container row between">
          <nav className="breadcrumbs"><Link to="/dashboard">Home</Link><span>/</span><span className="muted">{name}</span></nav>
          <button className="link" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>

      <div className="container grid">
        <aside className="panel">
          <div className="panel__header"><h2>Controls</h2><button className="link small" onClick={reset}>Reset</button></div>
          {type === "recursion" ? (
            <RecursionControlPanel onOperate={operate} />
          ) : (
            <ControlPanel type={type} onOperate={operate} />
          )}
        </aside>

        <section key={key} className="canvas">
          {type === "linked-list" && <LinkedListUI values={LL.asArray(state.structure)} />}
          {type === "stack" && <StackUI values={ST.asArray(state.structure)} />}
          {type === "queue" && <QueueUI values={Q.asArray(state.structure)} />}
          {type === "tree" && <TreeUI root={state.structure} />}
          {type === "graph" && <GraphUI graph={state.structure} />}
          {type === "recursion" && <RecursionUI state={state.structure} />}
        </section>

        <aside className="panel">
          <div className="panel__block"><h2>Complexity</h2><ComplexityBar lastOp={state.lastOp} /></div>
          <div className="panel__block"><h2>Activity</h2>
            <ul className="activity">
              {state.logs.length===0 && <li className="muted">No operations yet</li>}
              {state.logs.map((l,i)=>(<li key={i}>{l}</li>))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

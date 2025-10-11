import "./complexitybar.css";
export default function ComplexityBar({ lastOp }){
  if(!lastOp) return <div className="cb-muted">Run an operation to see its complexity.</div>;
  return (
    <div className="cb">
      <div className="cb__text">
        <div className="cb__title">{lastOp.name}</div>
        {lastOp.detail && <div className="cb__detail">{lastOp.detail}</div>}
      </div>
      <div className="cb__badge">{lastOp.complexity}</div>
    </div>
  );
}

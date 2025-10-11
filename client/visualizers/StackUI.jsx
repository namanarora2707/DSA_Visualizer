import "./stack.css";
export default function StackUI({ values }){
  if(values.length===0) return <div className="empty">Empty stack</div>;
  return (
    <div className="stackvis">
      {values.map((v,i)=>(<div key={i} className="node">{v}</div>))}
    </div>
  );
}

import "./linkedlist.css";
export default function LinkedListUI({ values }){
  if(values.length===0) return <div className="empty">Empty list</div>;
  return (
    <div className="ll">
      {values.map((v,i)=> (
        <div key={i} className="ll__item">
          <div className="node">{v}</div>
          {i<values.length-1 && <span className="arrow">→</span>}
        </div>
      ))}
    </div>
  );
}

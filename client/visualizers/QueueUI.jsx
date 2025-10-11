import "./queue.css";
export default function QueueUI({ values }){
  if(values.length===0) return <div className="empty">Empty queue</div>;
  return (
    <div className="queuevis">
      {values.map((v,i)=>(<div key={i} className="node">{v}</div>))}
    </div>
  );
}

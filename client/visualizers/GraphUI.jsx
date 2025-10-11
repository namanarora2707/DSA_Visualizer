import "./graph.css";
export default function GraphUI({ graph }){
  const nodes = Object.keys(graph.adj);
  if(nodes.length===0) return <div className="empty">Empty graph</div>;
  const R=180, cx=220, cy=200; const positions={};
  nodes.forEach((id,i)=>{ const angle=(i/nodes.length)*Math.PI*2; positions[id]={ x: cx+R*Math.cos(angle), y: cy+R*Math.sin(angle)}; });
  return (
    <svg viewBox="0 0 440 400" style={{width:"100%",maxWidth:440}}>
      {nodes.flatMap(a=>Array.from(graph.adj[a]).map(b=>({a,b}))).map(({a,b},i)=> (a<b? <line key={i} x1={positions[a].x} y1={positions[a].y} x2={positions[b].x} y2={positions[b].y} stroke="#d1d5db" strokeWidth={2}/> : null))}
      {nodes.map(id=> (
        <g key={id}>
          <circle cx={positions[id].x} cy={positions[id].y} r={20} fill="white" stroke="#e5e7eb" />
          <text x={positions[id].x} y={positions[id].y+4} textAnchor="middle" fontSize="12" fontWeight={700} fill="#111827">{id}</text>
        </g>
      ))}
    </svg>
  );
}

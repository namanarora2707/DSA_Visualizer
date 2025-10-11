import { getLevels } from "./treeutil.js";
export default function TreeUI({ root }){
  const levels = getLevels(root);
  if(!root) return <div className="empty">Empty tree</div>;
  return (
    <div style={{width:"100%"}}>
      <svg viewBox={`0 0 800 ${levels.length*120}`} style={{width:"100%"}}>
        {levels.map((level,li)=>{
          const y = 60 + li*120; const nodesInLevel = level.length;
          return level.map((v,i)=>{
            if(v==null) return null;
            const x = (i+1)*(800/(nodesInLevel+1));
            const leftIndex=i*2, rightIndex=i*2+1; const nextLevel=levels[li+1];
            const leftHas = nextLevel && nextLevel[leftIndex] != null;
            const rightHas = nextLevel && nextLevel[rightIndex] != null;
            const edges=[];
            if(leftHas){ const childX=(leftIndex+1)*(800/(nextLevel.length+1)); const childY=y+120; edges.push(<line key={`l-${li}-${i}`} x1={x} y1={y} x2={childX} y2={childY} stroke="#d1d5db" strokeWidth={2} />); }
            if(rightHas){ const childX=(rightIndex+1)*(800/(nextLevel.length+1)); const childY=y+120; edges.push(<line key={`r-${li}-${i}`} x1={x} y1={y} x2={childX} y2={childY} stroke="#d1d5db" strokeWidth={2} />); }
            return (
              <g key={`${li}-${i}`}>
                {edges}
                <circle cx={x} cy={y} r={22} fill="white" stroke="#e5e7eb" />
                <text x={x} y={y+5} textAnchor="middle" fontSize="12" fontWeight={700} fill="#111827">{v}</text>
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
